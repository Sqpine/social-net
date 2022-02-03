import React, {useEffect} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostContainer";
import {useNavigate} from "react-router-dom";
type PhotosType={
    photos:PhotoType
}
type PhotoType = {
    large:string
    small:string
}
type PropsType = {
    profile:PhotosType|null
    status:string
    updateStatus:(s:string)=>void
}
const Profile = (props:PropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status}  updateStatus={props.updateStatus}/>
            <MyPostContainer />
        </div>
    );
}
export default Profile;