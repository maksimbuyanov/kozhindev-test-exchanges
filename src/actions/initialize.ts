import {getNewRate} from '../api/api';
import {setRates} from './rates';

export enum InitializeActionEnum {
    START_APP = 'START_APP',
    SET_LOADING = 'SET_LOADING',
    SET_ERROR = 'SET_ERROR',
    SET_LAST_SYNC = 'SET_LAST_SYNC',
}

export const setAppInitialized = (): IInitializeAction => ({
    type: InitializeActionEnum.START_APP,
});
export const setLoading = (payload: boolean): IInitializeAction => ({
    type: InitializeActionEnum.SET_LOADING,
    payload,
});
export const setError = (payload: boolean): IInitializeAction => ({
    type: InitializeActionEnum.SET_ERROR,
    payload,
});
export const setLastSync = (payload) => ({
    type: InitializeActionEnum.SET_LAST_SYNC,
    payload,
});

export const updateRates = () => async dispatch => {
    dispatch(setError(false));
    dispatch(setLoading(true));
    try {
        const data = await getNewRate();
        if (data?.success) {
            dispatch(setLastSync(new Date(data.timestamp * 1000)));
            dispatch(setRates(data.rates));//установить в редюсер rates масств
        } else {
            dispatch(setError(true)); // выводить сообщение об ошибке и "попробуйте снова"
        }
    } catch {
        dispatch(setLastSync(new Date()));
        dispatch(setError(true));
    }

    dispatch(setLoading(false));
};

export const startApp = () => async (dispatch) => {
    await dispatch(updateRates());
    dispatch(setAppInitialized());
};

interface IsetAppInitialized {
    type:InitializeActionEnum.START_APP,
}
interface IsetLoading {
    type:InitializeActionEnum.SET_LOADING,
    payload:boolean
}
interface IsetError {
    type:InitializeActionEnum.SET_ERROR,
    payload:boolean
}
interface IsetLastSync {
    type:InitializeActionEnum.SET_LAST_SYNC,
    payload:Date
}
export type IInitializeAction = IsetAppInitialized | IsetError | IsetLoading | IsetLastSync
