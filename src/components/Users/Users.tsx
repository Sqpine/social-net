import React from "react";
import {UserType} from "../../Redux/users-reducer";
import {Pagination} from "@mui/material";
import UserMaping from "./UserMaping";
import s from './users.module.css'
import CircularProgress from "@mui/material/CircularProgress";

export type PropsType = {
    users: UserType[]
    totalUsersCount: number
    currentPage: number
    pageSize: number
    follow: (i: number) => void
    unFollow: (i: number) => void
    followingInProgress: number[]
    onPageChanged: (s: number) => void
    toggleIsFollowing: (s: boolean, u: number) => void
    isFetching: boolean
}
const Users = (props: PropsType) => {
    let pages = Math.ceil(props.totalUsersCount / props.pageSize)
    let pagesNumbers = []
    for (let i = 1; i <= pages; i++) {
        pagesNumbers.push(i)
    }
    return (
        <div className={s.users}>
            <div className={s.usersPage}>
                <Pagination onChange={(e, value) => {
                    props.onPageChanged(value)
                }} page={props.currentPage} count={pagesNumbers.length}/>
            </div>
            {props.isFetching ? <div className={s.loader}>
                <CircularProgress/>
            </div> : <UserMaping {...props}/>}
        </div>
    )
}

export default Users