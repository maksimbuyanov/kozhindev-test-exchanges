import React from 'react';
import './Convertation.scss';
import { useBem, useComponents, useSelector } from '@steroidsjs/core/hooks';
import { DropDownField, Form, InputField } from '@steroidsjs/core/ui/form';
import AutoSaveHelper from '@steroidsjs/core/ui/form/Form/AutoSaveHelper';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import {IFormState} from '../../../../reducers/rates';
import { baseCurrency, selectedCurrency } from '../../../../api/api';
import {setForm1, setForm2, updateForm1, updateForm2} from '../../../../actions/rates';
import isStringTestFalse from '../../../../Utils/validateString';

export default function Convertation() {
    const initiatorRef = React.useRef(0);
    const form1 = useSelector(s => s.rates.form1);
    const form2 = useSelector(s => s.rates.form2);
    const dispatch = useDispatch();
    const bem = useBem('Convertation');
    const { clientStorage } = useComponents();
    const allCurrency = [...baseCurrency, ...selectedCurrency];
    const changeForm1 = React.useCallback((newValue: IFormState): void => {
        if (initiatorRef.current !== 1) return;

        if (isStringTestFalse(newValue.input)) {
            newValue.input = newValue.input.slice(0, newValue.input.length - 1);
            dispatch(setForm1(newValue));
            return;
        }
        if (newValue.input && newValue.input.indexOf('.') !== -1) {
            newValue.input = newValue.input.replace('.', ',');
        }

        dispatch(updateForm1(newValue.input));
    }, [dispatch]);

    const changeForm2 = React.useCallback((newValue: IFormState): void => {
        if (initiatorRef.current !== 2) return;

        if (isStringTestFalse(newValue.input)) {
            newValue.input = newValue.input.slice(0, newValue.input.length - 1);
            dispatch(setForm2(newValue));
            return;
        }
        if (newValue.input && newValue.input.indexOf('.') !== -1) {
            newValue.input = newValue.input.replace('.', ',');
        }
        dispatch(updateForm2(newValue.input));
    }, [dispatch]);
    const onClickInput1 = () => {
        initiatorRef.current = 1;
    };
    const onClickInput2 = () => {
        initiatorRef.current = 2;
    };
    const onChangeSelect1 = value => {
        AutoSaveHelper.save(clientStorage, 'form1', {select: value});
        dispatch([
            setForm2({...form2, input: '0'}),
            setForm1({...form1, select: value, input: '0'}),
        ]);
        return null;
    };
    const onChangeSelect2 = value => {
        AutoSaveHelper.save(clientStorage, 'form2', {select: value});
        dispatch([
            setForm2({...form2, select: value, input: '0'}),
            setForm1({...form1, input: '0'}),
        ]);
        return null;
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
                    onChange: onChangeSelect1,
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
                        onChange: onChangeSelect2,
                    },
                ]}
            />
        </div>
    );
}

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
