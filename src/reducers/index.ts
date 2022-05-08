import { combineReducers } from 'redux';
import {
    form, auth, fields, list, notifications, modal, router, screen,
} from '@steroidsjs/core/reducers';
import initialize from './initialize';
import rates from './rates';

export default asyncReducers => combineReducers({
    form,
    auth,
    fields,
    list,
    notifications,
    modal,
    screen,
    initialize,
    rates,
    ...asyncReducers,
    router: (state, action) => router(asyncReducers.router ? asyncReducers.router(state, action) : {}, action),
});
