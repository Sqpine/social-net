import {InferActionsTypes} from "./storeType";
import {ResultCodeCaptcha, ResultCodeEnum} from "../api/api";
import {ThunkBaseType} from "./reduxStore";
import {loginAPI} from "../api/login-api";
import {securityAPI} from "../api/security-api";
import {headerAPI} from "../api/header-api";

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
const AuthReducer = (state: initialStateType = initialState, action: AuthActionsTypes): initialStateType => {
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
export type AuthActionsTypes = InferActionsTypes<typeof AuthAcions>
type ThunkType = ThunkBaseType<AuthActionsTypes>

export const AuthAcions = {
    loginError: (error: string | undefined, captcha: string = '') => {
        return {
            type: SET_LOGIN_ERROR,
            error: error,
            captcha: captcha,
        } as const
    },
    setUserDataAC: (id: string | null, email: string | null, login: string | null, isAuth: boolean) => {
        return {
            type: SET_USER_DATA,
            data: {
                id, email, login, isAuth
            }
        } as const
    }
}
export const loginUserThunk = (): ThunkType => {
    return async (dispatch) => {
        let response = await headerAPI.loginUser()
        if (response.data.resultCode === ResultCodeEnum.Success) {
            let {id, login, email} = response.data.data
            dispatch(AuthAcions.setUserDataAC(id, email, login, true))
        }
    }
}
export const getCaptcha = (error: string | undefined): ThunkType => {
    return async (dispatch) => {
        let response = await securityAPI.getCaptcha()
        debugger
        if (response.status === 200) {
            dispatch(AuthAcions.loginError(error, response.data.url))
        }
    }
}
///
export const loginUser = (login: string, password: string, rememberMe: boolean, captcha: string = ''): ThunkType => {
    return async (dispatch, getState) => {
        const error = getState().auth.error
        const captchaStore = getState().auth.captcha
        const response = await loginAPI.loginUserIn(login, password, rememberMe, captcha)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            await dispatch(loginUserThunk())
            if (!error || captchaStore) {
                dispatch(AuthAcions.loginError(undefined))
            }
        } else {
            let [error] = response.data.messages
            if (response.data.resultCode === ResultCodeCaptcha.CaptchaRequired) {
                await dispatch(getCaptcha(error))
            } else dispatch(AuthAcions.loginError(error))
        }
    }
}
export const loginUserOut = (): ThunkType => {
    return async (dispatch) => {

        let response = await loginAPI.loginUserOut()

        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(AuthAcions.setUserDataAC(null, null, null, false))
        }
    }
}
export default AuthReducer