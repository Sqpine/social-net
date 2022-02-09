import React from 'react';
import ProfileInfo, {ProfileType} from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostContainer";
type PropsType = {
    error:string
    profile:ProfileType
    status:string
    updateStatus:(s:string)=>void
    isOwner: string | undefined
    uploadPhoto:(s: object)=>void
    UploadInformation:(file: object)=>Promise<undefined>
}
const Profile = (props:PropsType) => {
    return (
        <div>
            <ProfileInfo error={props.error} UploadInformation={props.UploadInformation} uploadPhoto={props.uploadPhoto} profile={props.profile} isOwner={props.isOwner}status={props.status}  updateStatus={props.updateStatus}/>
            <MyPostContainer />
        </div>
    );
}
export default Profile;