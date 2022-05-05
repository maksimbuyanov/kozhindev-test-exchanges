import * as React from 'react';
import {useBem, useComponents} from '@steroidsjs/core/hooks';
import useLayout, {STATUS_OK, STATUS_LOADING} from '@steroidsjs/core/hooks/useLayout';
import {Notifications} from '@steroidsjs/core/ui/layout';
import './Layout.scss';
import useFetch from '@steroidsjs/core/hooks/useFetch';
import {useMemo} from 'react';
import TopBar from '../TopBar';
import rootReducer from '../../reducers/index';

export default function Layout(props: React.PropsWithChildren<any>) {
    const bem = useBem('Layout');
    const components = useComponents();
    React.useEffect(() => {
        components.store.addReducers(rootReducer);
    }, [components.store]);

    return (
        <div className={bem.block()}>
            <TopBar />
            <div className={bem.element('content')}>
                <Notifications />
                {props.children}
            </div>
        </div>
    );
}
