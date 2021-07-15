import * as BookParkingManager from '../../src/utils/bookParkingManager';

describe('bookParkingManager test', () => {
    describe('isEligibleVehicule function', () => {
        it(`should return false for bus`, () => {
            const uneligibleVehicleTypes = ['truck', 'bus'];
            const uneligibleVehicles = uneligibleVehicleTypes.map((type) => ({
                type,
                length: 250,
                height: 150
            })) as BookParkingManager.vehicule[]
            uneligibleVehicles.forEach(vehicle => {
                const isElligable = BookParkingManager.isEligibleVehicule(vehicle)
                expect(isElligable).toStrictEqual(false)
            })
        });
        it(`should return true for good vehicle types ('car', 'motorcycle')`, () => {
            const eligibleVehicleTypes = ['car', 'motorcycle'];
            const eligibleVehicles = eligibleVehicleTypes.map((type) => ({
                type,
                length: 250,
                height: 150
            })) as BookParkingManager.vehicule[]
            eligibleVehicles.forEach(vehicle => {
                const isElligable = BookParkingManager.isEligibleVehicule(vehicle)
                expect(isElligable).toStrictEqual(true)
            })
        });
        it('should return false for wrong vehicle heights', () => {
            const uneligibleVehicleHeights = [276, 2076];
            const uneligibleVehicles = uneligibleVehicleHeights.map((height) => ({
                height,
                length: 250,
                type: 'car' as BookParkingManager.vehicule['type']
            }))
            uneligibleVehicles.forEach(vehicle => {
                const isElligable = BookParkingManager.isEligibleVehicule(vehicle)
                expect(isElligable).toStrictEqual(false)
            })
        });
        it('should return true for good vehicle heights', () => {
            const eligibleVehicleHeights = [274, 275];
            const eligibleVehicles = eligibleVehicleHeights.map((height) => ({
                height,
                length: 250,
                type: 'car' as BookParkingManager.vehicule['type']
            }))
            eligibleVehicles.forEach(vehicle => {
                const isElligable = BookParkingManager.isEligibleVehicule(vehicle)
                expect(isElligable).toStrictEqual(true)
            })
        });
        it('should return false for wrong vehicle lengths', () => {
            const uneligibleVehicleLengths = [401, 2076];
            const uneligibleVehicles = uneligibleVehicleLengths.map((length) => ({
                length,
                height: 250,
                type: 'car' as BookParkingManager.vehicule['type']
            }))
            uneligibleVehicles.forEach(vehicle => {
                const isElligable = BookParkingManager.isEligibleVehicule(vehicle)
                expect(isElligable).toStrictEqual(false)
            })
        });
        it('should return true for good vehicle lengths', () => {
            const eligibleVehicleLengths = [399, 400];
            const eligibleVehicles = eligibleVehicleLengths.map((length) => ({
                length,
                height: 250,
                type: 'car' as BookParkingManager.vehicule['type']
            }))
            eligibleVehicles.forEach(vehicle => {
                const isElligable = BookParkingManager.isEligibleVehicule(vehicle)
                expect(isElligable).toStrictEqual(true)
            })
        });
    })
    describe('areDatesCorrect function', () => {
        it('should return false if dates are incorrect', () => {
            const wrongDirection = BookParkingManager.areDatesCorrect('2020-10-10 18:00', '2020-10-01 10:00')
            const checkoutNotADate = BookParkingManager.areDatesCorrect('2020-10-10 18:00', 'toto')
            const checkinNotADate = BookParkingManager.areDatesCorrect('toto', '2020-10-10 18:00')
            expect(wrongDirection).toStrictEqual(false)
            expect(checkoutNotADate).toStrictEqual(false)
            expect(checkinNotADate).toStrictEqual(false)
        });
        it('should return true if dates are correct', () => {
            expect(BookParkingManager.areDatesCorrect('2020-10-01 10:00', '2020-10-10 18:00')).toStrictEqual(true)
        });
    })
    describe('calculatePrice function', () => {
        const checkin = new Date('2020-10-01 10:00');
        const checkout = new Date('2020-10-10 10:00');
        it('should return good price', () => {
            const price = BookParkingManager.calculatePrice(checkin, checkout)
            expect(price).toBeDefined()
            expect(price).toStrictEqual(215.14)
        });
        it('should return price with normal tva if not specified', () => {
            const priceWithoutSpecifiedTva = BookParkingManager.calculatePrice(checkin, checkout)
            const priceWithNormalTva = BookParkingManager.calculatePrice(checkin, checkout, 'normal')
            expect(priceWithoutSpecifiedTva).toStrictEqual(priceWithNormalTva)
        });
        it('should return lower price with "intermediate" tva than with "normal"', () => {
            const priceWithIntermediateTva = BookParkingManager.calculatePrice(checkin, checkout, 'intermediate')
            const priceWithNormalTva = BookParkingManager.calculatePrice(checkin, checkout, 'normal')
            expect(priceWithIntermediateTva).toBeLessThanOrEqual(priceWithNormalTva)
        });
        it('should return lower price with "reduced" tva than with "intermediate"', () => {
            const priceWithIntermediateTva = BookParkingManager.calculatePrice(checkin, checkout, 'intermediate')
            const priceWithReducedTva = BookParkingManager.calculatePrice(checkin, checkout, 'reduced')
            expect(priceWithReducedTva).toBeLessThanOrEqual(priceWithIntermediateTva)
        });
    })
})

