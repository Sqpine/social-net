import {ActionTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS_PROFILE = 'profile/SET_STATUS_PROFILE'
export type MessageType = {
    id: number
    message: string
}
export type PostsData = {
    id: number
    message: string
    likesCount: number
}
type TypeProfile = object | null

export type ProfilePageType = {
    postsData: PostsData[]
    status: string
    profile: TypeProfile
}

let initialState: ProfilePageType = {
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
                postsData: [...state.postsData, newPost]
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
export const addPostActionCreator = (text:string) => {
    return {
        type: ADD_POST,
        text
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
export const profileThunk = (id: string | undefined, ownId: string | null): ThunkAction<Promise<void>, ProfilePageType, any, ActionTypes> => {
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
export default profileReducer