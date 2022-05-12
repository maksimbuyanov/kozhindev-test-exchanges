import {RootState} from './index';
import {IInitializeAction, InitializeActionEnum} from '../actions/initialize';

export interface IInitializeState {
  isInitialized: boolean,
  isLoading: boolean,
  errorStatus: boolean,
  lastSync: null | Date,
}

export interface Irate {
  AMD?: number;
  BOB?: number;
  CNY?: number;
  EUR?: number;
  LVL?: number;
  MAD?: number;
  MUR?: number;
  NIO?: number;
  PHP?: number;
  RUB?: number;
  TRY?: number;
  UAH?: number;
  USD?: number;
  ZAR?: number;
}

export const initialState: IInitializeState = {
    isInitialized: false,
    isLoading: true,
    errorStatus: false,
    lastSync: null,
};

export const initialize = (state = initialState, action: IInitializeAction): IInitializeState => {
    switch (action.type) {
        case InitializeActionEnum.SET_LAST_SYNC:
            return {
                ...state,
                lastSync: action.payload,
            };
        case InitializeActionEnum.START_APP:
            return {
                ...state,
                isInitialized: true,
            };
        case InitializeActionEnum.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case InitializeActionEnum.SET_ERROR:
            return {
                ...state,
                errorStatus: action.payload,
            };
        default:
            return state;
    }
};

export default initialize;

export const getInitialized = (state:RootState) => state.initialize.isInitialized;
export const getLoading = (state:RootState) => state.initialize.isLoading;
export const getLastSync = (state:RootState) => state.initialize.lastSync?.toLocaleString();
export const getErrorStatus = (state:RootState) => state.initialize.errorStatus;
