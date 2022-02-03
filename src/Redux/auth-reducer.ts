import {ActionTypes} from "./store";
import {headerAPI, loginAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";

const SET_LOGIN_ERROR = 'auth/SET_LOGIN_ERROR'
const SET_USER_DATA = 'auth/SET_USER_DATA'

type initialState = {
    id: null | string
    email: null | string
    login: null | string
    isAuth: boolean
    error: string | undefined
}
let initialState: initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    error: undefined
}
const AuthReducer = (state: initialState = initialState, action: ActionTypes): initialState => {
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
            }
        }
        default:
            return state

    }
}
export const loginError = (error: string | undefined) => {
    return {
        type: SET_LOGIN_ERROR,
        error: error
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
export const loginUserThunk = (): ThunkAction<Promise<void>, initialState, any, ActionTypes> => {
    return async (dispatch) => {
        let response = await headerAPI.loginUser()
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data
            dispatch(setUserDataAC(id, email, login, true))
        }
    }
}
///
export const loginUser = (login: string, password: string, rememberMe: boolean): ThunkAction<Promise<void>, initialState, any, ActionTypes> => {
    return async (dispatch) => {
        let response = await loginAPI.loginUserIn(login, password, rememberMe)
        if (response.data.resultCode === 0) {
            await dispatch(loginUserThunk())
            alert('Sign in successful!')
            if (initialState.error !== undefined) {
                dispatch(loginError(undefined))
            }
        } else {
            let [error] = response.data.messages
            dispatch(loginError(error))
        }
    }
}
export const loginUserOut = (): ThunkAction<Promise<void>, initialState, any, ActionTypes> => {
    return async (dispatch) => {
        let response = await loginAPI.loginUserOut()
        if (response.data.resultCode === 0) {
            alert('Sign out successful!')
            dispatch(setUserDataAC(null, null, null, false))
        }
    }
}
export default AuthReducer