import {getNewRate} from '../api/api';
import {setRates} from '../reducers/rates';
import {IInitializeAction, SET_ERROR, SET_LAST_SYNC, SET_LOADING, START_APP} from '../reducers/initialize';

export const setAppInitialized = (): IInitializeAction => ({
    type: START_APP,
});
export const setLoading = (payload: boolean): IInitializeAction => ({
    type: SET_LOADING,
    payload,
});
export const setError = (payload: boolean): IInitializeAction => ({
    type: SET_ERROR,
    payload,
});
export const setLastSync = (payload) => ({
    type: SET_LAST_SYNC,
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
