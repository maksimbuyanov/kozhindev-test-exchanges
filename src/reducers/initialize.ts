import {setRates} from './rates';

export const START_APP='START_APP'
export const SET_LOADING='SET_LOADING'
export const SET_ERROR='SET_ERROR'

export interface IInitializeState  {
  isInitialized:boolean,
  isLoading: boolean,
  errorStatus: boolean,
}
export interface IInitializeAction {
  type: string,
  payload? : boolean,
}

export const initialState:IInitializeState = {
  isInitialized: false,
  isLoading: false,
  errorStatus:false
}

export const initialize = (state=initialState, action:IInitializeAction):IInitializeState => {
  switch (action.type) {
    case START_APP:
      return {
        ...state,
        isInitialized : true
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading:action.payload
      }

  }
}

export const setAppInitialized = ():IInitializeAction=>({
  type:START_APP
})
export const setLoading = (payload:boolean):IInitializeAction=>({
  type:SET_LOADING,
  payload
})
export const setError = (payload:boolean):IInitializeAction=>({
  type:SET_ERROR,
  payload
})

export const startApp = ()=>(dispatch)=>{
  dispatch(setLoading(true))
  dispatch(updateRates())
}
export const updateRates = ()=> async dispatch=>{
  dispatch(setError(false))
  const data:Iapi = getNewRate()
  if (data?.success) {
    dispatch(setLastUpdate(new Date(data.timestamp * 1000))) // устанавливает в topBar время синхронизации
    dispatch(setRates(data.rates))//установить в редюсер rates масств
  } else {
    dispatch(setError(true)) // выводить сообщение об ошибке и "попробуйте снова"
  }
}

export interface Irate {
  AMD?: number
  BOB?: number
  CNY?: number
  EUR?: number
  LVL?: number
  MAD?: number
  MUR?: number
  NIO?: number
  PHP?: number
  RUB?: number
  TRY?: number
  UAH?: number
  USD?: number
  ZAR?: number
}

export interface Iapi {
  base: string
date: string
rates: Irate
success: boolean
timestamp: number // в секундах, перед new Date умножить на 1000
}
