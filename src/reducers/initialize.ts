export const START_APP = 'START_APP';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export interface IInitializeState {
  isInitialized: boolean,
  isLoading: boolean,
  errorStatus: boolean,
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
  payload?: boolean,
}

export const initialState: IInitializeState = {
    isInitialized: false,
    isLoading: false,
    errorStatus: false,
};

export const initialize = (state = initialState, action: IInitializeAction): IInitializeState => {
    switch (action.type) {
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
