import React, {useMemo} from 'react';
import './CurrencyTable.scss';
import Grid from '@steroidsjs/core/ui/list/Grid';
import {useBem, useSelector} from '@steroidsjs/core/hooks';
import {Button, InputField} from '@steroidsjs/core/ui/form';
import {IGridColumn} from '@steroidsjs/core/ui/list/Grid/Grid';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import {createList, getRatesArray} from '../../../../reducers/rates';
import {baseCurrency, selectedCurrency} from '../../../../api/api';

const searchForm = {
    layout: 'table',

    fields: [
        {
            attribute: 'id',
            placeholder: 'Фильтр по коду',
            size: 'Small',
        },
        {
            attribute: 'label',
            placeholder: 'Фильтр по названию',
            size: 'Small',
        },
    ],
};

const columns:IGridColumn[] = [
    {
        label: 'Код валюты',
        attribute: 'id',
        sortable: true,
        headerClassName: 'CurrencyTable__header-cell',
        className: 'CurrencyTable__cell',
    },
    {
        label: 'Название',
        attribute: 'label',
        sortable: true,
        headerClassName: 'CurrencyTable__header-cell',
        className: 'CurrencyTable__cell',
    },
    {
        label: 'Курс к доллару',
        attribute: 'toUSD',
        sortable: true,
        headerClassName: 'CurrencyTable__header-cell',
        className: 'CurrencyTable__cell',
    },
    {
        label: 'Курс к евро',
        attribute: 'toEUR',
        sortable: true,
        headerClassName: 'CurrencyTable__header-cell',
        className: 'CurrencyTable__cell',
    },
    {
        label: 'Курс к рублю',
        attribute: 'toRUB',
        sortable: true,
        headerClassName: 'CurrencyTable__header-cell',
        className: 'CurrencyTable__cell',
    },
    {
        label: 'Курс к юаню',
        attribute: 'toCNY',
        sortable: true,
        headerClassName: 'CurrencyTable__header-cell',
        className: 'CurrencyTable__cell',
    },
];

export default function CurrencyTable() {
    const [usd, euro, rub, cny] = useSelector(getRatesArray(baseCurrency));
    const currencyList = useSelector(getRatesArray(selectedCurrency));
    // eslint-disable-next-line arrow-body-style
    const currencyGrid = useMemo(() => {
        return createList(currencyList, usd, euro, rub, cny); // формирует массив с валют с их курсами
    }, [cny, currencyList, euro, rub, usd]);
    const [tableData, setTableData] = React.useState(currencyGrid.filter((item, index) => index < 5));
    const bem = useBem('CurrencyTable');
    // const dispatch = useDispatch();
    const toggleTableLength = React.useCallback(() => {
        if (tableData.length === 5) {
            setTableData(currencyGrid);
        } else {
            setTableData(currencyGrid.filter((item, index) => index < 5));
        }
        // dispatch();
    }, [currencyGrid, tableData.length]);

    const itemWithIndex = React.useMemo(() => tableData.map((item, index) => ({...item, index})), [tableData]);

    return (
        <div className={bem.block()} key={tableData.length}>
            <Grid
                className={bem.element('table')}
                itemsIndexing
                listId={'currencyTable' + tableData.length}
                items={itemWithIndex}
                columns={columns}
                searchForm={searchForm}
            />
            <Button
                className={bem.element('toggle-button')}
                onClick={toggleTableLength}
                label={tableData.length === 5 ? 'Показать больше' : 'Свернуть'}
                color='info'
                outline
            />
        </div>
    );
}

const items = [
    {code: 'qwe', name: 'zc', toUSD: 11, id: 1},
    {code: 'rty', name: 'sd', toUSD: 44, id: 1},
    {code: 'tyu', name: 'df', toUSD: 555, id: 1},
    {code: 'yui', name: 'rt', toUSD: 222, id: 1},
    {code: 'qwe', name: 'zc', toUSD: 11, id: 1},
    {code: 'rty', name: 'sd', toUSD: 44, id: 1},
    {code: 'tyu', name: 'df', toUSD: 555, id: 1},
    {code: 'yui', name: 'rt', toUSD: 222, id: 1},
    {code: 'rty', name: 'sd', toUSD: 44, id: 1},
    {code: 'tyu', name: 'df', toUSD: 555, id: 1},
    {code: 'yui', name: 'rt', toUSD: 222, id: 1},

];
