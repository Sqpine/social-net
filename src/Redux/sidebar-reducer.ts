import {sidebarApi} from "../api/sidebar-api";
import {InferActionsTypes} from "./storeType";
import {ThunkBaseType} from "./reduxStore";
import {itemsType} from "../api/users-api";

const SET_FETCHING = 'SET_FETCHING'
const SET_FOLLOW_USERS = 'SET_FOLLOW_USERS'

export type SideData = {
    id: number
    avatar: string
    name: string
}
export type SideDataType = {
    items: itemsType[]
    isFetching: boolean
}
let initialState: SideDataType = {
    items: [],
    isFetching: true
}

const sidebarReducer = (state: SideDataType = initialState, action: SideBarActionsTypes): SideDataType => {
    switch (action.type) {
        case SET_FOLLOW_USERS: {
            return {
                ...state,
                items: [...action.sideData]
            }
        }
        case SET_FETCHING: {
            return {
                ...state,
                isFetching: action.isFethcing
            }
        }
    }
    return state
}
const sideBarAcions = {
    setFetching: (f: boolean) => {
        return {
            type: SET_FETCHING,
            isFetching: f
        }
    },
    setFollowUsers: (data: any) => {
        return {
            type: SET_FOLLOW_USERS,
            sideData: data
        }
    }
}

export type SideBarActionsTypes = InferActionsTypes<typeof sideBarAcions>
type ThunkType = ThunkBaseType<SideBarActionsTypes>

export const SideBarThunk = (): ThunkType => async (dispatch) => {
    dispatch(sideBarAcions.setFetching(true))
    const res = await sidebarApi.getFollowUser()
    if (res.error == null) {
        dispatch(sideBarAcions.setFollowUsers(res.items))
        dispatch(sideBarAcions.setFetching(false))
    }
}
export default sidebarReducer