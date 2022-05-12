import * as React from 'react';

import './IndexPage.scss';
import {useBem, useSelector} from '@steroidsjs/core/hooks';
import {Loader} from '@steroidsjs/core/ui/layout';
import CurrencyTable from './views/CurrencyTable';
import Convertation from './views/Convertation';
import TopBar from './views/TopBar';
import LoaderRing from '../../shared/Loader';
import {getErrorStatus, getInitialized, getLoading} from '../../reducers/initialize';

export default function IndexPage() {
    const bem = useBem('IndexPage');
    const initialized = useSelector(getInitialized);
    const loading = useSelector(getLoading);
    const errorStatus = useSelector(getErrorStatus);

    return (
        <div className={bem.block()}>
            {loading && <Loader view={LoaderRing} />}
            {errorStatus && (
                <div className={bem.element('error-message')}>
                    Ошибка работы с сервером. Возможно закончилась лицензия
                </div>
            )}
            {initialized && (
                <>
                    <TopBar />
                    <Convertation />
                    <CurrencyTable />

                </>
            )}
        </div>
    );
}
