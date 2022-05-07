import * as React from 'react';

import './IndexPage.scss';
import {useBem} from '@steroidsjs/core/hooks';
import CurrencyTable from './views/CurrencyTable';
import Convertation from './views/Convertation';

export default function IndexPage() {
    const bem = useBem('IndexPage');

    return (
        <div className={bem.block()}>
            <CurrencyTable />
            <Convertation />
        </div>
    );
}
