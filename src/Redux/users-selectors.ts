import {StoreType} from "./reduxStore";
import {createSelector} from "reselect";

export const users = (state:StoreType) =>state.usersPage.users
export const usersReselect = createSelector(users,(users)=>{
    return users.filter(u=>true)
})
export const pageSize = (state:StoreType) =>state.usersPage.pageSize
export const totalUsersCount = (state:StoreType) =>state.usersPage.totalUsersCount
export const currentPage = (state:StoreType) =>state.usersPage.currentPage
export const isFetching = (state:StoreType) =>state.usersPage.isFetching
export const followingInProgress = (state:StoreType) =>state.usersPage.isFollowing