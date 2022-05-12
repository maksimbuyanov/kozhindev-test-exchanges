import {IDefaultCurrency} from '../api/api';
import {RootState} from './index';
import {IRatesAction, RatesActionEnum} from '../actions/rates';

export interface ICurrencyRate {
  id: string,
  rate: number
}
export interface IFormState {
    input: string,
    select: string|null
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

const rates = (state: IRatesState = initialState, action:IRatesAction): IRatesState => {
    switch (action.type) {
        case RatesActionEnum.SET_RATES: {
            const ratesArray = [] as ICurrencyRate[];
            const data = action.payload;
            Object.keys(data)
                .forEach(currency => {
                    ratesArray.push({
                        id: currency,
                        rate: data[currency],
                    });
                });
            return {
                ...state,
                rates: ratesArray,
            };
        }
        case RatesActionEnum.SET_FORM_1:
            return {
                ...state,
                form1: action.payload,
            };
        case RatesActionEnum.SET_FORM_2:
            return {
                ...state,
                form2: action.payload,
            };

        default:
            return state;
    }
};

/** к валютам в массиве добавляет их курсы **/
// eslint-disable-next-line max-len
export const getRatesArray = (defaultArray: IDefaultCurrency[]) => (state:RootState):(ICurrencyRate & IDefaultCurrency)[] => defaultArray.map(currency => {
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

export default rates;
