import {ActionTypes} from "./storeType";
import {ThunkAction} from "redux-thunk";
import {profileAPI} from "../api/api";
import {StoreType} from "./reduxStore";

const ADD_POST = 'ADD-POST'
const ADD_ERROR = 'ADD_ERROR'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS_PROFILE = 'profile/SET_STATUS_PROFILE'
const SET_PHOTO_PROFILE = 'SET_PHOTO_PROFILE'
export type MessageType = {
    id: number
    message: string
}
export type PostsData = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePageType = {
    postsData: PostsData[]
    status: string
    profile: object | null
    error: string
}

let initialState: ProfilePageType = {
    error: '',
    postsData: [
        {id: 1, message: 'How are you?', likesCount: 11},
        {id: 2, message: 'This my first post!', likesCount: 20},
    ],
    status: '',
    profile: null
}
const profileReducer = (state: ProfilePageType = initialState, action: ActionTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostsData = {
                id: new Date().getTime(),
                message: action.text,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [newPost, ...state.postsData]
            }
        }
        case ADD_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case SET_PHOTO_PROFILE: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photo}
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS_PROFILE: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state
    }
}
export const addPostActionCreator = (text: string) => {
    return {
        type: ADD_POST,
        text
    } as const
}
export const addError = (error: string) => {
    return {
        type: ADD_ERROR,
        error
    } as const
}
export const setUserProfile = (profile: object) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
export const setUserStatus = (status: string) => {
    return {
        type: SET_STATUS_PROFILE,
        status
    } as const
}
export const setPhotoSuccsesful = (photo: object) => {
    return {
        type: SET_PHOTO_PROFILE,
        photo
    } as const
}
export const profileThunk = (id: string | undefined | null, ownId: string | null): ThunkAction<Promise<void>, StoreType, any, ActionTypes> => {
    return async (dispatch) => {
        const userIdToUse = id ? id : ownId
        let response = await profileAPI.contentProfile(userIdToUse)
        dispatch(setUserProfile(response.data))

    }
}
export const getStatus = (id: string | undefined, ownId: string | null): ThunkAction<Promise<void>, ProfilePageType, any, ActionTypes> => {
    return async (dispatch) => {
        const userIdToUse = id ? id : ownId
        let response = await profileAPI.getStatus(userIdToUse)
        dispatch(setUserStatus(response.data))
    }
}
export const updateStatus = (status: string): ThunkAction<Promise<void>, ProfilePageType, any, ActionTypes> => {
    return async (dispatch) => {
        let response = await profileAPI.UpdateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    }
}
export const uploadPhoto = (file: object): ThunkAction<Promise<void>, ProfilePageType, any, ActionTypes> => {
    return async (dispatch) => {
        let response = await profileAPI.UploadPhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(setPhotoSuccsesful(response.data.data.photos))
        }
    }
}
export const UploadInformation = (file: object): ThunkAction<Promise<any>, StoreType, any, ActionTypes> => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id
        const response = await profileAPI.uploadInformation(file)
        if (response.data.resultCode === 0) {
            await dispatch(profileThunk(userId, ''))
            return true
        }
        dispatch(addError(response.data.messages[0]))
    }
}
export default profileReducer