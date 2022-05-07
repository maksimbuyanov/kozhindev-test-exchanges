import {getNewRate} from '../api/api';
import {setLastSync} from './topBar';
import {setRates} from '../reducers/rates';
import {IInitializeAction, SET_ERROR, SET_LOADING, START_APP} from '../reducers/initialize';

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

export const updateRates = () => async dispatch => {
    dispatch(setError(false));
    dispatch(setLoading(true));
    const data = await getNewRate();
    console.log(`updateRates ${data.timestamp}`);
    if (data?.success) {
        dispatch(setLastSync(new Date(data.timestamp * 1000)));
        dispatch(setRates(data.rates));//установить в редюсер rates масств
    } else {
        dispatch(setError(true)); // выводить сообщение об ошибке и "попробуйте снова"
    }
    dispatch(setLoading(true));
};

export const startApp = () => async (dispatch) => {
    await dispatch(updateRates());
    dispatch(startApp());
};
