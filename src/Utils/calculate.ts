import {IFormState} from '../reducers/rates';

const calculate = ({input, select = 'USD'}:IFormState, slaveSelect = 'USD' as string, currencyWithRate):string => {
    const initiatorCurrency = currencyWithRate.find(currency => currency.id === select).rate;
    const slaveCurrency = currencyWithRate.find(currency => currency.id === slaveSelect).rate;
    return ((+input * slaveCurrency) / initiatorCurrency).toFixed(2);
};

export default calculate;
