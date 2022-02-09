import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {StoreType} from "../../Redux/reduxStore";
import {
    getStatus,
    profileThunk,
    setUserProfile,
    updateStatus,
    UploadInformation,
    uploadPhoto
} from "../../Redux/profile-reducer";
import {useNavigate, useParams} from "react-router-dom";
import {UsHoc} from "./withAuthRedirect";

type PropsType = {
    error: string
    setUserProfile: (data: object) => void
    profile: any | object
    id: string | null
    profileThunk: (i: string | undefined, s: string | null) => void
    getStatus: (i: string | undefined, s: string | null) => void
    isAuth: boolean
    status: string
    updateStatus: (s: string) => void
    uploadPhoto: (s: object) => void
    UploadInformation: (file: object) => Promise<undefined>
}
const ProfileContainer = (props: PropsType) => {
    const {userId} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`${UsHoc(props.isAuth, `/profile/${userId ? userId : ''}`)}`)
        props.profileThunk(userId, props.id)
        props.getStatus(userId, props.id)
    }, [props.isAuth, props.id, userId]);
    return (
        <Profile error={props.error} UploadInformation={props.UploadInformation} uploadPhoto={props.uploadPhoto}
                 profile={props.profile} isOwner={userId} status={props.status}
                 updateStatus={props.updateStatus}/>
    )
}

let mapStateToProps = (state: StoreType) => (
    {
        profile: state.profilePage.profile,
        id: state.auth.id,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        login: state.auth.login,
        error: state.profilePage.error
    }
)
export default connect(mapStateToProps, {
    setUserProfile,
    profileThunk,
    getStatus,
    updateStatus,
    uploadPhoto,
    UploadInformation
})(ProfileContainer);