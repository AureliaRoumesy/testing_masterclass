import { isEligibleVehicule, areDatesCorrect, calculatePrice, vehicule, TVA } from './utils/bookParkingManager';

export const bookParkingSpace = (vehicule: vehicule, checkin: string, checkout: string, tvaType?: TVA) => {
    if (!isEligibleVehicule(vehicule)) {
        throw new Error('This vehicule is not eligible for our parking')
    }
    if (!areDatesCorrect(checkin, checkout)) {
        throw new Error('Incorrect dates')
    }
    return calculatePrice(new Date(checkin), new Date(checkout), tvaType)
}
