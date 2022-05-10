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
        id: 'USD',
        label: 'American Dollar',
    },
    {
        id: 'EUR',
        label: 'Europian Euro',
    },
    {
        id: 'RUB',
        label: 'Russian Ruble',
    },
    {
        id: 'CNY',
        label: 'Chinese Yuan',
    },
];

export const selectedCurrency = [
    {
        id: 'PHP',
        label: 'Philippine Peso',
    },
    {
        id: 'LVL',
        label: 'Latvian Lats',
    },
    {
        id: 'AMD',
        label: 'Armenian Dram',
    },
    {
        id: 'BOB',
        label: 'Bolivian Boliviano',
    },
    {
        id: 'TRY',
        label: 'Turkish Lira',
    },
    {
        id: 'UAH',
        label: 'Ukrainian Hryvnia',
    },
    {
        id: 'ZAR',
        label: 'South African Rand',
    },
    {
        id: 'NIO',
        label: 'Nicaraguan Córdoba',
    },
    {
        id: 'MUR',
        label: 'Mauritian Rupee',
    },
    {
        id: 'MAD',
        label: 'Moroccan Dirham',
    },
];

const instance = axios.create({
    headers: {
        apikey: '9J1xVQm1w35Nb3B75s0gjB9VVdv15dRa',
    },
    baseURL: 'https://api.apilayer.com/exchangerates_data/',
});

export const getNewRate = async () => {
    try {
        const queryString = encodeURIComponent([...baseCurrency, ...selectedCurrency]
            .map(item => item.id)
            .join(','));
        const result = await instance('latest', {
            params: {
                symbols: queryString,
                base: 'USD',
            },
        });
        return result.data;
    } catch (e) {
        throw new Error('ошибка в API');
    }
};
