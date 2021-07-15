export const roundNumberWithDecimals = (numberToRound: number, nbDigits: number) =>
    Math.round((numberToRound + Number.EPSILON) * Math.pow(10, nbDigits)) / Math.pow(10, nbDigits);

export const calculateTaxes = (amountHt: number, taxRate?: number) => {
    if (!taxRate) {
        return 0;
    }
    const taxes = amountHt * taxRate;
    return roundNumberWithDecimals(taxes, 2);
};