export default function correctPriceForm(price){ if (Number.isInteger(price)) {
    return Number(price + '.0');
} else {
    return Number(price);
}}