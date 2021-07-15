import { isBefore, differenceInHours, parseISO, isValid } from 'date-fns';

import { calculateTaxes } from './calculationMethods';

export type vehicule = {
    height: number;
    length: number;
    type?: 'car' | 'motorcycle' | 'truck' | 'bus';
}
export type TVA = 'normal' | 'intermediate' | 'reduced'

export const isEligibleVehicule = (vehicule: vehicule) => {
    if (vehicule.height > 275 || vehicule.length > 400 || !['car', 'motorcycle'].includes(vehicule.type)) {
        return false
    }
    return true
}

export const areDatesCorrect = (checkin: string, checkout: string) => {
    if (!isValid(parseISO(checkin))|| !isValid(parseISO(checkout))) {
        return false
    }
    return isBefore(new Date(checkin), new Date(checkout))
}

export const calculatePrice = (checkin: Date, checkout: Date, tvaType?: TVA) => {
    const hoursNumber = differenceInHours(checkout, checkin)
    const pricePerHour = 0.83;
    const amountHt = hoursNumber * pricePerHour;
    let taxRate;
    switch (tvaType) {
        case 'normal':
            taxRate = 0.2
            break;
        case 'intermediate':
            taxRate = 0.1
            break;
        case 'reduced':
            taxRate = 0.05
            break;
        default:
            taxRate = 0.2
            break;
    }
    const taxes = calculateTaxes(amountHt, taxRate)
    return amountHt + taxes;
}

