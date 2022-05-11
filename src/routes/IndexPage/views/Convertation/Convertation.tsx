import React from 'react';
import './Convertation.scss';
import { useBem, useComponents, useSelector } from '@steroidsjs/core/hooks';
import { DropDownField, Form, InputField } from '@steroidsjs/core/ui/form';
import AutoSaveHelper from '@steroidsjs/core/ui/form/Form/AutoSaveHelper';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import { getInput1, getInput2, getRatesArray, getSelect1, getSelect2, setForm1, setForm2, setInput2, setSelect1, setSelect2 } from '../../../../reducers/rates';
import { baseCurrency, selectedCurrency } from '../../../../api/api';

const mock = [
    { id: 'USD', label: 'American Dollar', rate: 1 },
    { id: 'EUR', label: 'Europian Euro', rate: 0.94731 },
    { id: 'RUB', label: 'Russian Ruble', rate: 69.874996 },
    { id: 'CNY', label: 'Chinese Yuan', rate: 6.730798 },
    { id: 'PHP', label: 'Philippine Peso', rate: 53.0749 },
    { id: 'LVL', label: 'Latvian Lats', rate: 0.60489 },
    { id: 'AMD', label: 'Armenian Dram', rate: 463.90470 },
    { id: 'BOB', label: 'Bolivian Boliviano', rate: 6.87 },
    { id: 'TRY', label: 'Turkish Lira', rate: 15.10004 },
    { id: 'UAH', label: 'Ukrainian Hryvnia', rate: 30.27 },
    { id: 'ZAR', label: 'South African Rand', rate: 16.2 },
    { id: 'NIO', label: 'Nicaraguan Córdoba', rate: 35.7 },
    { id: 'MUR', label: 'Mauritian Rupee', rate: 42.7493 },
    { id: 'MAD', label: 'Moroccan Dirham', rate: 10.0260 },
];

const isStringTestFalse = (string: string): boolean => {
    if (!string) {
        return false;
    }
    if (string.match(/[^\d,.,,]/)) {
        return true;
    }
    const comma = string.indexOf(',');
    if (comma !== -1) {
        const lastComma = string.lastIndexOf(',');
        if (comma !== lastComma) {
            return true;
        }
        const indexOfDot = string.indexOf('.');
        if (indexOfDot !== -1) {
            return true;
        }
    }
    return false;
};
interface IFormState {
    input: null | string,
    select: null | string,
}

const calculate = ({input, select = 'USD'}, slaveSelect = 'USD'):string => {
    const initiatorCurrency = mock.find(currency => currency.id === select).rate;
    const slaveCurrency = mock.find(currency => currency.id === slaveSelect).rate;
    return ((input * initiatorCurrency) / slaveCurrency).toFixed(2);
};
export default function Convertation() {
    const initiatorRef = React.useRef(0);
    const form1 = useSelector(s => s.rates.form1);
    const form2 = useSelector(s => s.rates.form2);
    const dispatch = useDispatch();
    const bem = useBem('Convertation');
    const { clientStorage } = useComponents();
    // debugger;
    // const allCurrency = useSelector(getRatesArray([...baseCurrency, ...selectedCurrency]));
    const allCurrency = mock;
    const changeForm1 = React.useCallback((newValue: IFormState): void => {
        if (initiatorRef.current !== 1) return;
        AutoSaveHelper.save(clientStorage, 'form1', newValue);
        if (isStringTestFalse(newValue.input)) {
            newValue.input = newValue.input.slice(0, newValue.input.length - 1);
            dispatch(setForm1(newValue));
            return;
        }
        if (newValue.input && newValue.input.indexOf('.') !== -1) {
            newValue.input = newValue.input.replace('.', ',');
        }
        const newSlaveValue = calculate(newValue, form2.select);
        debugger;
        dispatch([
            setForm1(newValue),
            setForm2({ ...form2, input: newSlaveValue.replace('.', ',') }),
        ]);
    }, [clientStorage, dispatch, form2]);
    const changeForm2 = (newValue: IFormState): void => {
        if (initiatorRef.current !== 2) return;
        AutoSaveHelper.save(clientStorage, 'form2', newValue);
        debugger;
        if (isStringTestFalse(newValue.input)) {
            newValue.input = newValue.input.slice(0, newValue.input.length - 1);
            dispatch(setForm1(newValue));
            return;
        }
        if (newValue.input && newValue.input.indexOf('.') !== -1) {
            newValue.input = newValue.input.replace('.', ',');
        }
        const newSlaveValue = calculate(newValue, form1.select);
        dispatch([
            setForm2(newValue),
            setForm1({ ...form1, input: newSlaveValue.replace('.', ',') }),
        ]);
    };
    const onClickInput1 = () => {
        initiatorRef.current = 1;
    };
    const onClickInput2 = () => {
        initiatorRef.current = 2;
    };
    return (
        <div className={bem.block()}>
            <Form
                className={bem.element('form')}
                layout="inline"
                formId="convertation-first"
                isBordered
                useRedux
                initialValues={...form1}
                onChange={changeForm1}
                fields={[{
                    attribute: 'input',
                    component: InputField,
                    inputProps: {
                        value: form1.input,
                        onClick: onClickInput1 },
                },
                {
                    attribute: 'select',
                    items: allCurrency,
                    component: DropDownField,
                    selectFirst: true,
                },
                ]}
            />
            <Form
                className={bem.element('form')}
                layout="inline"
                formId="convertation-second"
                isBordered
                initialValues={...form2}
                useRedux
                onChange={changeForm2}
                fields={[
                    {
                        attribute: 'input',
                        component: InputField,
                        inputProps: {
                            value: form2.input,
                            onClick: onClickInput2,
                        },
                    },
                    {
                        attribute: 'select',
                        items: allCurrency,
                        component: DropDownField,
                        selectFirst: true,
                        inputProps: {
                            onFocus: () => console.log('focus'),
                            onClick: () => console.log('first'),
                            onChange: () => console.log('change'),

                        },
                        onItemSelect: (id) => {
                            debugger;
                            console.log('change');
                        },
                    }]}
            />
            <DropDownField
                onItemSelect={(id) => {
                    debugger;
                    console.log('change');
                }}
                items={allCurrency}
                inputProps={{
                    itemProps: {
                        onFocus: () => console.log('focus'),
                        onClick: () => console.log('first'),
                        onChange: () => console.log('change'),

                    },
                }}

            />
        </div>
    );
}
