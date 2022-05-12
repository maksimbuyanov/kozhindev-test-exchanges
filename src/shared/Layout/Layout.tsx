import * as React from 'react';
import { useBem, useComponents } from '@steroidsjs/core/hooks';
import { Notifications } from '@steroidsjs/core/ui/layout';
import './Layout.scss';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import AutoSaveHelper from '@steroidsjs/core/ui/form/Form/AutoSaveHelper';
import { startApp } from '../../actions/initialize';
import {setForm1, setForm2} from '../../actions/rates';

export default function Layout(props: React.PropsWithChildren<any>) {
    const bem = useBem('Layout');
    const { clientStorage } = useComponents();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch([
            setForm1(AutoSaveHelper.restore(clientStorage, 'form1', {input: '0'})),
            setForm2(AutoSaveHelper.restore(clientStorage, 'form2', {input: '0'})),
            startApp(),
        ]);
    }, [clientStorage, dispatch]);
    return (

        <div className={bem.block()}>
            <div className={bem.element('content')}>
                <Notifications />
                {props.children}
            </div>
        </div>

    );
}
