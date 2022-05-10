import React from 'react';
import './Convertation.scss';
import {useBem, useComponents, useSelector} from '@steroidsjs/core/hooks';
import {DropDownField, Form, InputField} from '@steroidsjs/core/ui/form';
import AutoSaveHelper from '@steroidsjs/core/ui/form/Form/AutoSaveHelper';
import {getRatesArray} from '../../../../reducers/rates';
import {baseCurrency, selectedCurrency} from '../../../../api/api';

interface IFieldState {
    value?:string,
    currency?:string
}
const mock = [
    {id: 'USD', label: 'American Dollar', rate: 1},
    {id: 'EUR', label: 'Europian Euro', rate: 0.94731},
    {id: 'RUB', label: 'Russian Ruble', rate: 69.874996},
    {id: 'CNY', label: 'Chinese Yuan', rate: 6.730798},
    {id: 'PHP', label: 'Philippine Peso', rate: 53.0749},
    {id: 'LVL', label: 'Latvian Lats', rate: 0.60489},
    {id: 'AMD', label: 'Armenian Dram', rate: 463.90470},
    {id: 'BOB', label: 'Bolivian Boliviano', rate: 6.87},
    {id: 'TRY', label: 'Turkish Lira', rate: 15.10004},
    {id: 'UAH', label: 'Ukrainian Hryvnia', rate: 30.27},
    {id: 'ZAR', label: 'South African Rand', rate: 16.2},
    {id: 'NIO', label: 'Nicaraguan Córdoba', rate: 35.7},
    {id: 'MUR', label: 'Mauritian Rupee', rate: 42.7493},
    {id: 'MAD', label: 'Moroccan Dirham', rate: 10.0260},
];

const isStringTestFalse = (string) => {
    if (!string) {
        return false;
    }
    if (string.match(/[^\d,.,,]/)) {
        return true;
    }
    return false;
};

export default function Convertation() {
    const [value, setValue] = React.useState({value: null, currency: null});
    const bem = useBem('Convertation');
    const {clientStorage} = useComponents();
    const defaultFirstValue = AutoSaveHelper.restore(clientStorage, 'convertation-first', 'RUB');
    // debugger;
    // const allCurrency = useSelector(getRatesArray([...baseCurrency, ...selectedCurrency]));
    const allCurrency = mock;
    return (
        <div className={bem.block()}>
            <Form
                // model={}
                className={bem.element('form')}
                layout="inline"
                // initialValues={[{currency: 'USD'}]}
                formId="convertation-first"
                isBordered
                autoSave
                clientStorage={clientStorage}
                useRedux
                onSubmit={(data) => {
                    const {currency} = data;
                    console.log(data);
                    AutoSaveHelper.save(clientStorage, 'convertation-first', {currency});
                }}
                onChange={(formValues) => {
                    if (isStringTestFalse(formValues.value)) {
                        formValues.value = formValues.value.slice(0, formValues.value.length - 1);
                        setValue({...formValues});
                        return;
                    }
                    //если больше одной запятой
                    //составить для нескольких инпутов
                    // при изменении инпута 1 в инпуте 2 происходит пересчет
                    const indexOfDot = formValues.value?.indexOf('.');
                    if (formValues.value && indexOfDot !== -1) {
                        formValues.value = formValues.value.replace('.', ',');
                    }
                    setValue(formValues);
                }}
                fields={[{
                    attribute: 'value',
                    component: InputField,
                    value: value.value,
                    onChange: (newValue) => {
                        setValue(newValue);
                    },
                    // type: 'number',
                },
                {
                    attribute: 'currency',
                    items: allCurrency,
                    component: DropDownField,
                    value: value.currency,
                }]}
            />
            {/*<NumberField />*/}

        </div>
    );
}
