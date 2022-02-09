import React from "react";
import {connect} from "react-redux";
import {
    follow,
    getUsersThunkCreator,
    setCurrentPage,
    setPages,
    setUsers,
    toggleIsFetching,
    toggleIsFollowing,
    unFollow,
    UserType
} from "../../Redux/users-reducer";
import {StoreType} from "../../Redux/reduxStore";
import Users from "./Users";
import {
    currentPage,
    followingInProgress,
    isFetching,
    pageSize,
    totalUsersCount,
    usersReselect
} from "../../Redux/users-selectors";

type PropsType = {
    users: UserType[]
    totalUsersCount: number
    currentPage: number
    pageSize: number
    follow: any
    unFollow: any
    setUsers: any
    setCurrentPage: (s: number) => void
    setPages: (s: number) => void
    isFetching: boolean
    followingInProgress: number[]
    toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowing: (s: boolean, u: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}


class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        let pages = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pagesNumbers = []
        for (let i = 1; i <= pages; i++) {
            pagesNumbers.push(i)
        }
        return <>
            <Users isFetching={this.props.isFetching} totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage} unFollow={this.props.unFollow} follow={this.props.follow}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   toggleIsFollowing={this.props.toggleIsFollowing}
                   followingInProgress={this.props.followingInProgress}/>
        </>
    }
}

let mapStateToProps = (state: StoreType) => {
    return {
        users: usersReselect(state),
        pageSize: pageSize(state),
        totalUsersCount: totalUsersCount(state),
        currentPage: currentPage(state),
        isFetching: isFetching(state),
        followingInProgress: followingInProgress(state)
    }
}

export default connect(mapStateToProps, {
    follow: follow,
    unFollow: unFollow,
    setUsers,
    setCurrentPage,
    setPages,
    toggleIsFetching,
    toggleIsFollowing,
    getUsers: getUsersThunkCreator
})(UsersContainer)