import React, {useState} from 'react';
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader";
import ProfileStatus from "./ProfileStatus";
type PhotosType={
    photos:PhotoType
}
type PhotoType = {
    large:string
    small:string
}
type PropsType = {
    profile:PhotosType|any
    status:string
    updateStatus:(s:string)=>void
}
const ProfileInfo = (props:PropsType) => {
    if(!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large} alt=""/>
            </div>
            <ProfileStatus status={props.status}  updateStatus={props.updateStatus}/>
        </div>
    );
}
export default ProfileInfo;