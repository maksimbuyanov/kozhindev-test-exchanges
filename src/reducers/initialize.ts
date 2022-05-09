export const START_APP = 'START_APP';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_LAST_SYNC = 'SET_LAST_SYNC';

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

export interface IInitializeAction {
  type: string,
  payload?: any,
}

export const initialState: IInitializeState = {
    isInitialized: false,
    isLoading: true,
    errorStatus: false,
    lastSync: null,
};

export const initialize = (state = initialState, action: IInitializeAction): IInitializeState => {
    switch (action.type) {
        case SET_LAST_SYNC:
            return {
                ...state,
                lastSync: action.payload,
            };

        case START_APP:
            return {
                ...state,
                isInitialized: true,
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

export default initialize;

export const getInitialized = state => state.initialize.isInitialized;
export const getLoading = state => state.initialize.isLoading;
export const getLastSync = state => state.initialize.lastSync?.toLocaleString();
