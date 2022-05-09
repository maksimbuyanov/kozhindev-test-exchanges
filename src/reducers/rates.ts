import {Irate} from './initialize';

interface IDefaultCurrency {
  id: string,
  label: string
}

export const SET_RATES = 'SET_RATES';
export const SET_ROW_COUNT = 'SET_ROW_COUNT';

interface ICurrencyRate {
  id: string,
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
                        id: currency,
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
const getCurrencyRate = (code: string) => state => state.rates.rates?.find(currency => currency.code === code).rate;

/** к валютам в массиве добавляет их курсы **/
export const getRatesArray = (defaultArray: IDefaultCurrency[]) => (state) => defaultArray.map(currency => {
    const findCurrencyIndex = state.rates.rates.findIndex(item => item.id === currency.id);
    if (findCurrencyIndex === -1) {
        return ({
            ...currency,
            rate: 0,
        });
    }
    return ({
        ...currency,
        rate: state.rates.rates[findCurrencyIndex].rate,
    });
});

const presentArray: (ICurrencyRate & IDefaultCurrency)[] = [
    {
        id: 'RUB',
        label: 'Russian Ruble',
        rate: 65.55,
    },
];

export interface Ilist {
  code: string,
  name: string,
  toUSD: number,
  toEUR: number,
  toRUB: number,
  toCNY: number,
}

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

export default rates;
