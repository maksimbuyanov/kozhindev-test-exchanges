import {Irate} from './initialize';

interface IDefaultCurrency {
  code: string,
  name: string
}

export const SET_RATES = 'SET_RATES';
export const SET_ROW_COUNT = 'SET_ROW_COUNT';

interface ICurrencyRate {
  code: string,
  rate: number
}

interface IRatesState {
  rates: ICurrencyRate[] | null;
  tableRowCount: number;
}

export const initialState: IRatesState = {
    rates: null,
    tableRowCount: 10,
};

const rates = (state: IRatesState = initialState, action): IRatesState => {
    switch (action.type) {
        case SET_RATES: {
            const rates = [] as ICurrencyRate[];
            const data = action.payload as Irate;
            Object.keys(data)
                .forEach(currency => {
                    rates.push({
                        code: currency,
                        rate: data[currency],
                    });
                });
            return {
                ...state,
                rates,
            };
        }
        case SET_ROW_COUNT:
            return {
                ...state,
                tableRowCount: action.payload,
            };
        default:
            return state;
    }
};

export const setRates = (payload) => ({
    type: SET_RATES,
    payload,
});
export const setRowCount = (payload) => ({
    type: SET_ROW_COUNT,
    payload,
});
/** возвращает цену валюты относительно базовой
 * const EUR = useSelector(getCurrencyRate('EUR')) **/
const getCurrencyRate = (code: string) => (state: IRatesState) => //возможно вынести все коды в enum
    state.rates.find(currency => currency.code === code).rate
;
/** к валютам в массиве добавляет их курсы **/
export const getRatesArray = (defaultArray: IDefaultCurrency[]) => (state: IRatesState) => defaultArray.map(currency => {
    const findCurrencyIndex = state.rates.findIndex(item => item.code === currency.code);
    if (findCurrencyIndex === -1) {
        return ({
            ...currency,
            rate: 0,
        });
    }

    return ({
        ...currency,
        rate: state.rates[findCurrencyIndex].rate,
    });
});

const presentArray: (ICurrencyRate & IDefaultCurrency)[] = [
    {
        code: 'RUB',
        name: 'Russian Ruble',
        rate: 65.55,
    },
];

interface Ilist {
  code: string,
  name: string,
  toUSD: number,
  toEUR: number,
  toRUB: number,
  toCNY: number,
}

const createList = (array, eur, rub, usd, cny): Ilist => array.map((item) => {
    const {
        rate,
        ...rest
    } = item;
    return {
        ...rest,
        toUSD: rate / usd,
        toEUR: rate / eur,
        toRUB: rate / rub,
        toCNY: rate / cny,
    };
});

const sortByCode = (array) => [...array].sort((a, b) => a.code.localeCompare(b.code));
const sortByName = (array) => [...array].sort((a, b) => a.name.localeCompare(b.name));
const sortByUSD = (array) => [...array].sort((a, b) => a.toUSD - b.toUSD);
const sortByEUR = (array) => [...array].sort((a, b) => a.toEUR - b.toEUR);
const sortByRUB = (array) => [...array].sort((a, b) => a.toRUB - b.toRUB);
const sortByCNY = (array) => [...array].sort((a, b) => a.toCNY - b.toCNY);

export default rates;
