import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {Loader, Notifications} from '@steroidsjs/core/ui/layout';
import './Layout.scss';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import TopBar from '../../routes/IndexPage/views/TopBar';
import LoaderRing from '../Loader';
import {setAppInitialized, setLastSync, startApp, updateRates} from '../../actions/initialize';

export default function Layout(props: React.PropsWithChildren<any>) {
    const bem = useBem('Layout');

    const dispatch = useDispatch();
    // React.useEffect(() => dispatch(updateRates()), [dispatch]);
    // @ts-ignore
    React.useEffect(async () => dispatch(startApp()), [dispatch]);

    return (

        <div className={bem.block()}>
            <div className={bem.element('content')}>
                <Notifications />
                {props.children}
            </div>
        </div>

    );
}
