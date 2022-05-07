import * as React from 'react';
import {useBem, useComponents} from '@steroidsjs/core/hooks';
import {Notifications} from '@steroidsjs/core/ui/layout';
import './Layout.scss';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import TopBar from '../TopBar';
import rootReducer from '../../reducers/index';
import {updateRates} from '../../actions/initialize';
import {setLastSync} from '../../actions/topBar';

export default function Layout(props: React.PropsWithChildren<any>) {
    const bem = useBem('Layout');
    const components = useComponents();

    const dispatch = useDispatch();
    // React.useEffect(() => dispatch(updateRates()), [dispatch]);

    return (
        <div className={bem.block()}>
            <button onClick={() => dispatch(setLastSync(new Date()))}>111</button>
            <TopBar />
            <div className={bem.element('content')}>
                <Notifications />
                {props.children}
            </div>

        </div>
    );
}
