import {Irate} from './initialize';

interface IDefaultCurrency {
  id: string,
  label: string
}

export const SET_RATES = 'SET_RATES';
export const SET_INPUT_1 = 'SET_INPUT_1';
export const SET_INPUT_2 = 'SET_INPUT_2';
export const SET_SELECT_1 = 'SET_SELECT_1';
export const SET_SELECT_2 = 'SET_SELECT_2';
export const SET_FORM_2 = 'SET_FORM_2';
export const SET_FORM_1 = 'SET_FORM_1';

interface ICurrencyRate {
  id: string,
  rate: number
}
export interface IFormState {
    input:string |null,
    select:string|null
}

export interface IRatesState {
  rates: ICurrencyRate[] | null;
  form1:IFormState,
  form2:IFormState,
}

export const initialState: IRatesState = {
    rates: null,
    form1: {input: '', select: ''},
    form2: {input: '', select: ''},
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
        case SET_INPUT_1:
            return {
                ...state,
                form1: {
                    ...state.form1,
                    input: action.payload,
                },

            };
        case SET_INPUT_2:
            return {
                ...state,
                form2: {
                    ...state.form2,
                    input: action.payload,
                },
            };
        case SET_SELECT_1:
            return {
                ...state,
                form1: {
                    ...state.form1,
                    select: action.payload,
                },
            };
        case SET_SELECT_2:
            return {
                ...state,
                form2: {
                    ...state.form2,
                    select: action.payload,
                },
            };
        case SET_FORM_1:
            return {
                ...state,
                form1: action.payload,
            };
        case SET_FORM_2:
            return {
                ...state,
                form2: action.payload,
            };

        default:
            return state;
    }
};

export const setInput1 = (payload) => ({
    type: SET_INPUT_1,
    payload,
});
export const setInput2 = (payload) => ({
    type: SET_INPUT_2,
    payload,
});
export const setSelect1 = (payload) => ({
    type: SET_SELECT_1,
    payload,
});
export const setSelect2 = (payload) => ({
    type: SET_SELECT_2,
    payload,
});
export const setForm1 = (payload) => ({
    type: SET_FORM_1,
    payload,
});
export const setForm2 = (payload) => ({
    type: SET_FORM_2,
    payload,
});

export const setRates = (payload) => ({
    type: SET_RATES,
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
export const getInput1 = state => state.rates.input1;
export const getInput2 = state => state.rates.input2;
export const getSelect1 = state => state.rates.select1;
export const getSelect2 = state => state.rates.select2;

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
