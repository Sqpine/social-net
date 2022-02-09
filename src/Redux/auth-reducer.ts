import {ActionTypes} from "./storeType";
import {headerAPI, loginAPI, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {StoreType} from "./reduxStore";

const SET_LOGIN_ERROR = 'auth/SET_LOGIN_ERROR'
const SET_USER_DATA = 'auth/SET_USER_DATA'

export type initialStateType = {
    captcha: string
    id: null | string
    email: null | string
    login: null | string
    isAuth: boolean
    error: string | undefined
}
let initialState: initialStateType = {
    captcha: '',
    id: null,
    email: null,
    login: null,
    isAuth: false,
    error: undefined
}
const AuthReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {

        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        }
        case SET_LOGIN_ERROR: {
            return {
                ...state,
                error: action.error,
                captcha: action.captcha
            }
        }
        default:
            return state

    }
}
export const loginError = (error: string | undefined, captcha: string = '') => {
    return {
        type: SET_LOGIN_ERROR,
        error: error,
        captcha: captcha,
    } as const
}
export const setUserDataAC = (id: string | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        data: {
            id, email, login, isAuth
        }
    } as const
}
export const loginUserThunk = (): ThunkAction<Promise<void>, StoreType, any, ActionTypes> => {
    return async (dispatch) => {
        let response = await headerAPI.loginUser()
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data
            dispatch(setUserDataAC(id, email, login, true))
        }
    }
}
export const getCaptcha = (error: string | undefined): ThunkAction<Promise<void>, StoreType, any, ActionTypes> => {
    return async (dispatch) => {
        let response = await securityAPI.getCaptcha()
        if (response.status === 200) {
            dispatch(loginError(error, response.data.url))
        }
    }
}
///
export const loginUser = (login: string, password: string, rememberMe: boolean, captcha: string = ''): ThunkAction<Promise<void>, StoreType, any, ActionTypes> => {
    return async (dispatch, getState) => {
        const error = getState().auth.error
        const captchaStore = getState().auth.captcha
        const response = await loginAPI.loginUserIn(login, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            await dispatch(loginUserThunk())
            if (!error || captchaStore) {
                dispatch(loginError(undefined))
            }
        } else {
            let [error] = response.data.messages
            if (response.data.resultCode === 10) {
                await dispatch(getCaptcha(error))
            } else dispatch(loginError(error))
        }
    }
}
export const loginUserOut = (): ThunkAction<Promise<void>, initialStateType, any, ActionTypes> => {
    return async (dispatch) => {
        let response = await loginAPI.loginUserOut()
        if (response.data.resultCode === 0) {
            dispatch(setUserDataAC(null, null, null, false))
        }
    }
}
export default AuthReducer