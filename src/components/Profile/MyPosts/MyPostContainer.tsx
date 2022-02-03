import React from 'react';
import MyPost from "./MyPost";
import {addPostActionCreator} from "../../../Redux/profile-reducer";
import {connect} from "react-redux";
import {StoreType} from "../../../Redux/reduxStore";
let mapStateToProps = (state:StoreType) => {
    return{
        profilePage:state.profilePage.postsData,
    }
}

const MyPostContainer = connect(mapStateToProps,{addPostActionCreator})(MyPost)
export default MyPostContainer;