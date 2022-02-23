import React from 'react';
import MyPostMemorized from "./MyPost";
import {ProfileAction} from "../../../Redux/profile-reducer";
import {connect} from "react-redux";
import {StoreType} from "../../../Redux/reduxStore";


let mapStateToProps = (state: StoreType) => {
    return {
        profilePage: state.profilePage.postsData,
        profile: state.profilePage.profile,
    }
}

const MyPostContainer = connect(mapStateToProps, {addPostActionCreator: ProfileAction.addPostActionCreator})(MyPostMemorized)
export default MyPostContainer;