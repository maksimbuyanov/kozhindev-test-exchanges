export interface Ilist {
    id: string,
    label: string,
    toUSD: number,
    toEUR: number,
    toRUB: number,
    toCNY: number,
}

/**  формирует массив с валют с их курсами */
export const createList = (array, usd, eur, rub, cny): Ilist[] => array.map((item) => {
    const {
        rate,
        ...rest
    } = item;
    return {
        ...rest,
        toUSD: (usd.rate / rate).toFixed(5),
        toEUR: (eur.rate / rate).toFixed(5),
        toRUB: (rub.rate / rate).toFixed(5),
        toCNY: (cny.rate / rate).toFixed(5),
    };
});
