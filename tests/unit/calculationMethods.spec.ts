import { roundNumberWithDecimals, calculateTaxes } from '../../src/utils/calculationMethods';

describe(`Calculation methods`, () => {
    describe(`roundNumberWithDecimals`, () => {
        it(`must round a positive number to a given number of decimals`, () => {
            expect(roundNumberWithDecimals(1.005, 0)).toStrictEqual(1);
            expect(roundNumberWithDecimals(1.234, 0)).toStrictEqual(1);
            expect(roundNumberWithDecimals(1.567, 0)).toStrictEqual(2);
            expect(roundNumberWithDecimals(1.005, 1)).toStrictEqual(1.0);
            expect(roundNumberWithDecimals(1.234, 1)).toStrictEqual(1.2);
            expect(roundNumberWithDecimals(1.235, 1)).toStrictEqual(1.2);
            expect(roundNumberWithDecimals(1.256, 1)).toStrictEqual(1.3);
            expect(roundNumberWithDecimals(1.005, 2)).toStrictEqual(1.01);
            expect(roundNumberWithDecimals(1.234, 2)).toStrictEqual(1.23);
            expect(roundNumberWithDecimals(1.235, 2)).toStrictEqual(1.24);
            expect(roundNumberWithDecimals(1.256, 2)).toStrictEqual(1.26);
        });
        it(`must return 0 if given number equals 0`, () => {
            expect(roundNumberWithDecimals(0, 2)).toStrictEqual(0);
        });
        it(`must round a negative number to a given number of decimals`, () => {
            expect(roundNumberWithDecimals(-1.005, 0)).toStrictEqual(-1);
            expect(roundNumberWithDecimals(-1.234, 0)).toStrictEqual(-1);
            expect(roundNumberWithDecimals(-1.567, 0)).toStrictEqual(-2);
            expect(roundNumberWithDecimals(-1.005, 1)).toStrictEqual(-1.0);
            expect(roundNumberWithDecimals(-1.234, 1)).toStrictEqual(-1.2);
            expect(roundNumberWithDecimals(-1.235, 1)).toStrictEqual(-1.2);
            expect(roundNumberWithDecimals(-1.256, 1)).toStrictEqual(-1.3);
            expect(roundNumberWithDecimals(-1.005, 2)).toStrictEqual(-1.0);
            expect(roundNumberWithDecimals(-1.234, 2)).toStrictEqual(-1.23);
            expect(roundNumberWithDecimals(-1.235, 2)).toStrictEqual(-1.23);
            expect(roundNumberWithDecimals(-1.256, 2)).toStrictEqual(-1.26);
        });
    });
    describe(`calculateTaxes`, () => {
        it(`should return 0 if no tax rate has been given`, () => {
            const amountHt = 1234.9;
            const taxes = calculateTaxes(amountHt);
            expect(taxes).toStrictEqual(0);
        });
        it(`should return 0 if tax rate is equal to 0`, () => {
            const amountHt = 1234.9;
            const taxRate = 0;
            const taxes = calculateTaxes(amountHt, taxRate);
            expect(taxes).toStrictEqual(0);
        });
        it(`should return 0 if amount is equal to 0`, () => {
            const amountHt = 0;
            const taxRate = 0.02;
            const taxes = calculateTaxes(amountHt, taxRate);
            expect(taxes).toStrictEqual(0);
        });
        it(`should calculate taxes correctly given an amount and a tax rate and round it to 2 decimals`, () => {
            const amountHt = 1232;
            const taxRate = 0.02;
            const taxes = calculateTaxes(amountHt, taxRate);
            expect(taxes).toStrictEqual(24.64);
        });
    });
})