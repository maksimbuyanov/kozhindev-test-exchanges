import axios from 'axios';

export const baseCurrency = [
    {
        code: 'CNY',
        name: 'Chinice',
    },
    {
        code: 'RUB',
        name: 'Philippine Peso',
    },
    {
        code: 'EUR',
        name: 'Philippine Peso',
    },
    {
        code: 'USD',
        name: 'Philippine Peso',
    },
];

export const selectedCurrency = [
    {
        code: 'PHP',
        name: 'Philippine Peso',
    },
    {
        code: 'LVL',
        name: 'Latvian Lats',
    },
    {
        code: 'AMD',
        name: 'Armenian Dram',
    },
    {
        code: 'BOB',
        name: 'Bolivian Boliviano',
    },
    {
        code: 'TRY',
        name: 'Turkish Lira',
    },
    {
        code: 'UAH',
        name: 'Ukrainian Hryvnia',
    },
    {
        code: 'ZAR',
        name: 'South African Rand',
    },
    {
        code: 'NIO',
        name: 'Nicaraguan Córdoba',
    },
    {
        code: 'MUR',
        name: 'Mauritian Rupee',
    },
    {
        code: 'MAD',
        name: 'Moroccan Dirham',
    },
];

const instance = axios.create({
    headers: {
        apikey: '9J1xVQm1w35Nb3B75s0gjB9VVdv15dRa',
    },
    baseURL: 'https://api.apilayer.com/exchangerates_data/',

});

export const getNewRate = async ():Promise<any> => {
    const queryString = encodeURIComponent([...baseCurrency, ...selectedCurrency]
        .map(item => item.code)
        .join(','));
    const result = await instance('latest', {
        params: { symbols: queryString, base: 'USD' },
    });
    return result
};

// base: "USD"
// date: "2022-05-05"
// rates:
// AMD: 464.490023
// BOB: 6.874941
// CNY: 6.655701
// EUR: 0.95165
// LVL: 0.60489
// MAD: 10.012498
// MUR: 42.996743
// NIO: 35.770111
// PHP: 52.549979
// RUB: 64.325029
// TRY: 14.865239
// UAH: 29.442365
// USD: 1
// ZAR: 16.04801
// [[Prototype]]: Object
// success: true
// timestamp: 1651766404 // в секундах, перед new Date умножить на 1000
