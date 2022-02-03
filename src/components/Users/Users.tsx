import React from "react";
import {UserType} from "../../Redux/users-reducer";
import {Pagination} from "@mui/material";
import UserMaping from "./UserMaping";
import s from './users.module.css'

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
}
const Users = (props: PropsType) => {
    let pages = Math.ceil(props.totalUsersCount / props.pageSize)
    let pagesNumbers = []
    for (let i = 1; i <= pages; i++) {
        pagesNumbers.push(i)
    }
    return (
        <div className={s.usersPage}>
            <UserMaping {...props}/>
            <Pagination className={s.center} onChange={(e, value) => {
                props.onPageChanged(value)
            }} page={props.currentPage} count={pagesNumbers.length}/>
        </div>
    )
}

export default Users