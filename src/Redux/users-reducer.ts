import {ActionTypes} from "./storeType";
import {usersAPI} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {mapingUsers} from "../utils/object-helpers";

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SETUSERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_PAGES = 'users/SET_PAGES'
const TOGGLE_IS_FETCHING = 'users/IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'users/FOLLOWING_IN_PROGRESS'
export type LocationType = {
    city: string
    country: string
}
type photosType = {
    small: string
    large: string
}
export type UserType = {
    photos: photosType
    id: number
    status: string
    photoUrl: string
    followed: boolean
    name: string
    location: LocationType
}
export type UsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    isFollowing: number[]
}
let initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false,
    isFollowing: []
}
const usersReducer = (state: UsersType = initialState, action: ActionTypes): UsersType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: mapingUsers(state.users, action.userId, {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: mapingUsers(state.users, action.userId, {followed: false})
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_PAGES: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                isFollowing: action.isFetching
                    ? [...state.isFollowing, action.id]
                    : state.isFollowing.filter(id => id !== action.id)
            }
        }
        default:
            return state
    }
}
export const followAccept = (userId: number) => {
    return {
        type: FOLLOW,
        userId
    } as const
}
export const unFollowAccept = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId
    } as const
}
export const setUsers = (users: UserType[]) => {
    return {
        type: SET_USERS,
        users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
}
export const setPages = (totalUsersCount: number) => {
    return {
        type: SET_PAGES,
        totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const
}
export const toggleIsFollowing = (isFetching: boolean, id: number) => {
    return {
        type: FOLLOWING_IN_PROGRESS,
        isFetching,
        id,
    } as const
}
type dataResult = {
    resultCode: number
}
export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkAction<Promise<void>, UsersType, any, ActionTypes> => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setPages(data.totalCount))
    }
}
const followUnFollow = (dispatch: ThunkDispatch<UsersType, any, ActionTypes>, userId: number, data: dataResult, action: typeof followAccept | typeof unFollowAccept) => {
    dispatch(toggleIsFollowing(true, userId))
    if (data.resultCode === 0) {
        dispatch(action(userId))
        dispatch(toggleIsFollowing(false, userId))
    }

}
export const unFollow = (userId: number): ThunkAction<Promise<void>, UsersType, any, ActionTypes> => {
    return async (dispatch) => {
        let data = await usersAPI.unFollowUsers(userId)
        followUnFollow(dispatch, userId, data, unFollowAccept)
    }
}
export const follow = (userId: number): ThunkAction<Promise<void>, UsersType, any, ActionTypes> => {
    return async (dispatch) => {
        let data = await usersAPI.followUsers(userId)
        followUnFollow(dispatch, userId, data, followAccept)
    }
}
export default usersReducer