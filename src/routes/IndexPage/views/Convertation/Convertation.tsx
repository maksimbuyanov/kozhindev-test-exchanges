import React from 'react';
import './Convertation.scss';
import {useBem, useSelector} from '@steroidsjs/core/hooks';
import {DropDown} from '@steroidsjs/core/ui/content';
import {DropDownField, Field} from '@steroidsjs/core/ui/form';
import {getRatesArray} from '../../../../reducers/rates';
import {baseCurrency, selectedCurrency} from '../../../../api/api';

export default function Convertation() {
    const bem = useBem('Convertation');
    const allCurrency = useSelector(getRatesArray([...baseCurrency, ...selectedCurrency]));
    return (
        <div className={bem.block()}>
            <div className={bem.element('currency-values')}>
                <Field
                    className={bem.element('input')}
                />
                <DropDownField
                    className={bem.element('select')}
                    items={allCurrency}
                />
            </div>
            <div className={bem.element('currency-values')}>
                <Field
                    className={bem.element('input')}
                />
                <DropDownField
                    items={allCurrency}
                    className={bem.element('select')}
                />
            </div>

        </div>
    );
}
