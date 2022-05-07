import axios, {AxiosResponse} from 'axios';
import {Irate} from '../reducers/initialize';

export interface Iapi {
  base: string;
  date: string;
  rates: Irate;
  success: boolean;
  timestamp: number; // в секундах, перед new Date умножить на 1000
}

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
    baseURL: 'https://api.apilayer.com/exchangerates_dat/',
});

export const getNewRate = async () => {
    const queryString = encodeURIComponent([...baseCurrency, ...selectedCurrency]
        .map(item => item.code)
        .join(','));
    const result = await instance('latest', {
        params: {
            symbols: queryString,
            base: 'USD',
        },
    });
    return result.data;
};
