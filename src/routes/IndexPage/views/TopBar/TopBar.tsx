import React from 'react';
import './TopBar.scss';
import {useBem, useComponents, useSelector} from '@steroidsjs/core/hooks';
import {Button} from '@steroidsjs/core/ui/form';
import useDispatch from '@steroidsjs/core/hooks/useDispatch';
import {updateRates} from '../../../../actions/initialize';
import {getLastSync} from '../../../../reducers/initialize';

function TopBar(props) {
    console.log('topbar rerender');
    const bem = useBem('TopBar');
    const dispatch = useDispatch();

    const lastSyncDate = useSelector(getLastSync);

    const downloadFreshData = async () => {
        dispatch(updateRates());
    };

    return (
        <div className={bem.block()}>
            <span className={bem.element('last-sync')}>
                {lastSyncDate?.toISOString()}
            </span>
            <Button
                className={bem.element('download-button')}
                onClick={downloadFreshData}
                label='Обновить'
                color='info'
                outline
            />
        </div>
    );
}

export default TopBar;
