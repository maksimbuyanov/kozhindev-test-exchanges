import axios from 'axios';

const instance = axios.create({
    headers: {
        apikey: '9J1xVQm1w35Nb3B75s0gjB9VVdv15dRa',
    },
    baseURL: 'https://api.apilayer.com/exchangerates_data/',

});

const get = async (currencyArray) => {
    const queryString = encodeURIComponent(currencyArray.join(','));
    const result = await instance('latest', {
        params: {symbols: queryString, base: 'USD'},
    });
};

export default get;
