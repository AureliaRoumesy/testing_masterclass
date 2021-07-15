import * as BookParking from '../../src/bookParking';
import * as BookParkingManager from '../../src/utils/bookParkingManager';

let isEligibleVehicule = null;
let areDatesCorrect = null;
let calculatePrice = null;

describe('Book a parking spot', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should allow a booking if all is ok', () => {
        // Arrange
        const car = {
            type: 'car' as BookParkingManager.vehicule['type'],
            height: 175,
            length: 330
        }
        // Act
        const carBooking = BookParking.bookParkingSpace(car, '2020-10-01 10:00', '2020-10-10 18:00');
        // Assert
        expect(carBooking).toBeDefined()
        expect(carBooking).toBeGreaterThanOrEqual(0)
    });
    it('should not allow an uneligible vehicule to book a parking spot', () => {
        isEligibleVehicule = jest.spyOn(BookParkingManager, 'isEligibleVehicule').mockImplementation(() => false);
        areDatesCorrect = jest.spyOn(BookParkingManager, 'areDatesCorrect').mockImplementation(() => true);
        // Arrange
        const truck = {
            type: 'truck' as BookParkingManager.vehicule['type'],
            height: 175,
            length: 330
        }
        // Act & assert
        expect(() => BookParking.bookParkingSpace(truck, '2020-10-01 10:00', '2020-10-10 18:00')).toThrow('This vehicule is not eligible for our parking');
    });
    it('should not allow wrong dates to book a parking spot', () => {
        isEligibleVehicule = jest.spyOn(BookParkingManager, 'isEligibleVehicule').mockImplementation(() => true);
        areDatesCorrect = jest.spyOn(BookParkingManager, 'areDatesCorrect').mockImplementation(() => false);
        // Arrange
        const truck = {
            type: 'truck' as BookParkingManager.vehicule['type'],
            height: 175,
            length: 330
        }
        // Act & assert
        expect(() => BookParking.bookParkingSpace(truck, '2020-10-01 10:00', '2020-10-10 18:00')).toThrow('Incorrect dates');
    });
    it("should call calculatePrice with good params if check functions don't throw", () => {
        isEligibleVehicule = jest.spyOn(BookParkingManager, 'isEligibleVehicule').mockImplementation(() => true);
        areDatesCorrect = jest.spyOn(BookParkingManager, 'areDatesCorrect').mockImplementation(() => true);
        calculatePrice = jest.spyOn(BookParkingManager, 'calculatePrice').mockImplementation(() => 10);
        // Arrange
        const car = {
            type: 'car' as BookParkingManager.vehicule['type'],
            height: 175,
            length: 330
        }
        // Act 
        BookParking.bookParkingSpace(car, '2020-10-10 18:00', '2020-10-01 10:00')
        // Assert
        expect(BookParkingManager.calculatePrice).toHaveBeenCalledTimes(1)
        expect(BookParkingManager.calculatePrice).toHaveBeenCalledWith(
            new Date('2020-10-10 18:00'),
            new Date('2020-10-01 10:00'),
            undefined
        );
    });
    it("should call calculatePrice with good params if check functions don't throw for intermediate TVA type", () => {
        isEligibleVehicule = jest.spyOn(BookParkingManager, 'isEligibleVehicule').mockImplementation(() => true);
        areDatesCorrect = jest.spyOn(BookParkingManager, 'areDatesCorrect').mockImplementation(() => true);
        calculatePrice = jest.spyOn(BookParkingManager, 'calculatePrice').mockImplementation(() => 10);
        // Arrange
        const car = {
            type: 'car' as BookParkingManager.vehicule['type'],
            height: 175,
            length: 330
        }
        // Act 
        BookParking.bookParkingSpace(car, '2020-10-10 18:00', '2020-10-01 10:00', 'intermediate')
        // Assert
        expect(BookParkingManager.calculatePrice).toHaveBeenCalledTimes(1)
        expect(BookParkingManager.calculatePrice).toHaveBeenCalledWith(
            new Date('2020-10-10 18:00'),
            new Date('2020-10-01 10:00'),
            'intermediate'
        );
    });
})

