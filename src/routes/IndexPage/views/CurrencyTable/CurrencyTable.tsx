import React from 'react';
import './CurrencyTable.scss';
import Grid from '@steroidsjs/core/ui/list/Grid';
import {useBem, useSelector} from '@steroidsjs/core/hooks';
import {Button, InputField} from '@steroidsjs/core/ui/form';
import {IGridColumn} from '@steroidsjs/core/ui/list/Grid/Grid';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import {getCurrencyRate, getRatesArray} from '../../../../reducers/rates';
import {baseCurrency} from '../../../../api/api';

const searchForm = {
    layout: 'table',
    fields: [
        {
            attribute: 'code',
            component: () => (
                <InputField
                    placeholder="Фильтр по коду"
                    className="mb-20"
                    size='Small'
                />
            ),
        },
        {
            attribute: 'name',
            component: () => (
                <InputField
                    placeholder="Фильтр по названию"
                    className="mb-20"
                    size='Small'
                />
            ),
        },
    ],
};

const columns:IGridColumn[] = [
    {
        label: 'Код валюты',
        attribute: 'code',
        sortable: true,
        headerClassName: 'CurrencyTable__header-cell',
        className: 'CurrencyTable__cell',
    },
    {
        label: 'Название',
        attribute: 'name',
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

export default function CurrencyTable() {
    const USD = useSelector(getCurrencyRate('USD'));
    // const base = useSelector(getRatesArray(baseCurrency));
    const itemsMemo = React.useMemo(() => items, []);
    console.log('render');
    const [tableData, setTableData] = React.useState(itemsMemo);
    const columnsMemo = React.useMemo(() => columns, []);
    const searchFormMemo = React.useMemo(() => searchForm, []);
    const bem = useBem('CurrencyTable');
    // const dispatch = useDispatch();
    const toggleTableLength = React.useCallback(() => {
        if (tableData.length === 5) {
            setTableData(items);
        } else {
            setTableData(items.filter((item, index) => index <= 4));
        }
        // dispatch();
    }, [tableData.length]);

    const itemWithIndex = React.useMemo(() => tableData.map((item, index) => ({...item, index})), [tableData]);
    return (
        <div className={bem.block()}>
            <Grid
                className={bem.element('table')}
                itemsIndexing
                listId="currencyTable"
                items={itemWithIndex}
                columns={columnsMemo}
                searchForm={searchFormMemo}
                condition={() => ['<', 'index', '5']}
                query={{code: 'qwe'}}

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
