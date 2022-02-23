import {InferActionsTypes} from "./storeType";
import {ThunkBaseType} from "./reduxStore";
import {profileAPI, ProfileType} from "../api/profile-api";
import {UsersPhotoType} from "../api/users-api";

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
    profile: ProfileType | null
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
const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionsTypes): ProfilePageType => {
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
                profile: state.profile ? {...state.profile, photos: action.photo} : null
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
export const ProfileAction = {
    addPostActionCreator: (text: string) => {
        return {
            type: ADD_POST,
            text
        } as const
    },
    addError: (error: string) => {
        return {
            type: ADD_ERROR,
            error
        } as const
    },
    setUserProfile: (profile: ProfileType) => {
        return {
            type: SET_USER_PROFILE,
            profile
        } as const
    },
    setUserStatus: (status: string) => {
        return {
            type: SET_STATUS_PROFILE,
            status
        } as const
    },
    setPhotoSuccsesful: (photo: UsersPhotoType) => {
        return {
            type: SET_PHOTO_PROFILE,
            photo
        } as const
    }
}
export type ProfileActionsTypes = InferActionsTypes<typeof ProfileAction>
type ThunkType = ThunkBaseType<ProfileActionsTypes>

export const profileThunk = (id: string | undefined | null, ownId: string | null): ThunkType => {
    return async (dispatch) => {
        const userIdToUse = id ? id : ownId
        let response = await profileAPI.contentProfile(userIdToUse)
        debugger
        dispatch(ProfileAction.setUserProfile(response))

    }
}
export const getStatus = (id: string | undefined, ownId: string | null): ThunkType => {
    return async (dispatch) => {
        const userIdToUse = id ? id : ownId
        let response = await profileAPI.getStatus(userIdToUse)
        dispatch(ProfileAction.setUserStatus(response))
    }
}
export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.UpdateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(ProfileAction.setUserStatus(status))
        }
    }
}
export const uploadPhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.UploadPhoto(file)
        debugger
        if (response.resultCode === 0) {
            dispatch(ProfileAction.setPhotoSuccsesful(response.data))
        }
    }
}
export const UploadInformation = (file: object): ThunkBaseType<ProfileActionsTypes, Promise<boolean | undefined>> => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id
        const response = await profileAPI.uploadInformation(file)
        if (response.data.resultCode === 0) {
            await dispatch(profileThunk(userId, null))
            return true
        }
        dispatch(ProfileAction.addError(response.data.messages[0]))
    }
}
export default profileReducer