import React from "react";
import {connect} from "react-redux";
import {
    follow,
    getUsersThunkCreator,
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

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: UserType[]
    followingInProgress: number[]


}
type MapDispatchToPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}
type PropsType = MapDispatchToPropsType & MapStatePropsType

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
                   followingInProgress={this.props.followingInProgress}/>
        </>
    }
}

let mapStateToProps = (state: StoreType):MapStatePropsType => {
    return {
        users: usersReselect(state),
        pageSize: pageSize(state),
        totalUsersCount: totalUsersCount(state),
        currentPage: currentPage(state),
        isFetching: isFetching(state),
        followingInProgress: followingInProgress(state)
    }
}
export default connect<MapStatePropsType,MapDispatchToPropsType,{},StoreType>(mapStateToProps, {
    follow,
    unFollow,
    getUsers: getUsersThunkCreator
})(UsersContainer)