import {InferActionsTypes} from "./storeType";
import {ThunkAction} from "redux-thunk";
import {mapingUsers} from "../utils/object-helpers";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";
import {ThunkBaseType} from "./reduxStore";

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SETUSERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_PAGES = 'users/SET_PAGES'
const TOGGLE_IS_FETCHING = 'users/IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'users/FOLLOWING_IN_PROGRESS'
type photosType = {
    small: string|null
    large: string|null
}
export type UserType = {
    photos: photosType
    id: number
    status: string
    followed: boolean
    name: string
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
type ActionTypes = InferActionsTypes<typeof actionsUsers>
type ThunkType = ThunkBaseType<ActionTypes>
export const actionsUsers = {
    followAccept: (userId: number) => {
        return {
            type: FOLLOW,
            userId
        } as const
    },
    unFollowAccept: (userId: number) => {
        return {
            type: UNFOLLOW,
            userId
        } as const
    },
    setUsers: (users: UserType[]) => {
        return {
            type: SET_USERS,
            users
        } as const
    },
    setCurrentPage: (currentPage: number) => {
        return {
            type: SET_CURRENT_PAGE,
            currentPage
        } as const
    },
    setPages: (totalUsersCount: number) => {
        return {
            type: SET_PAGES,
            totalUsersCount
        } as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return {
            type: TOGGLE_IS_FETCHING,
            isFetching
        } as const
    },
    toggleIsFollowing: (isFetching: boolean, id: number) => {
        return {
            type: FOLLOWING_IN_PROGRESS,
            isFetching,
            id,
        } as const
    },
}

type dataResult = {
    resultCode: number
}
type DispatchType = Dispatch<ActionTypes>

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actionsUsers.toggleIsFetching(true))
        dispatch(actionsUsers.setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actionsUsers.toggleIsFetching(false))
        dispatch(actionsUsers.setUsers(data.items))
        dispatch(actionsUsers.setPages(data.totalCount))
    }
}
const _followUnFollow = async (dispatch: DispatchType, userId: number, data: dataResult,
                               action: (userId: number) => ActionTypes) => {
    dispatch(actionsUsers.toggleIsFollowing(true, userId))
    debugger

    if (data.resultCode === 0) {
        dispatch(action(userId))
        dispatch(actionsUsers.toggleIsFollowing(false, userId))
    }

}
export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        debugger

        let data = await usersAPI.unFollowUsers(userId)
        debugger
        _followUnFollow(dispatch, userId, data, actionsUsers.unFollowAccept)
    }
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await usersAPI.followUsers(userId)
        _followUnFollow(dispatch, userId, data, actionsUsers.followAccept)
    }
}
export default usersReducer