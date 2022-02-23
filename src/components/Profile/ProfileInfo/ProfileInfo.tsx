import React, {useState} from 'react';
import classes from "./ProfileInfo.module.css";


import Preloader from "../../common/preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileContact from "../ProfileContact";
import ProfileForm from "../profileForm";
import IconButton from '@material-ui/core/IconButton';
import {Button} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import avatar from '../../../images/avatar.png'
import {UsersPhotoType} from "../../../api/users-api";

export type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    photos: UsersPhotoType
    userId: number
    aboutMe: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName: string
    contacts: { [key: string]: ContactType }
}

export type ProfileData = {
    profile: ProfileType | null
}
type PropsType = {
    error: string
    profile: ProfileType | null
    status: string
    updateStatus: (s: string) => void
    isOwner: string | undefined
    uploadPhoto: (s: File) => void
    UploadInformation: (file: object) => Promise<boolean | undefined>
}

const ProfileDataInfo = (props: ProfileData) => {
    if (!props.profile) {
        return null
    } else return (
        <div>
            <div>
                Full name: <b>{props.profile.fullName}</b>
            </div>
            <div>
                Looking for a job: <b>{props.profile.lookingForAJob ? 'yes' : 'no'}</b>
            </div>

            {props.profile.lookingForAJob &&
                <div>My professional skills: {props.profile.lookingForAJobDescription}</div>
            }
            <div>
                About me: {props.profile.aboutMe}
            </div>
            <div>
                <hr/>
                {Object.keys(props.profile.contacts).map(e => {
                    if (props.profile) {
                        return <ProfileContact key={e + 'sss'} contacts={props.profile.contacts[e]} e={e}/>
                    }
                    return null
                })}
            </div>
        </div>
    )
}
const ProfileInfo = (props: PropsType) => {
    let [editMode, setMode] = useState(false)
    if (!props.profile) {
        return <Preloader/>
    }
    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.uploadPhoto(e.target.files[0])
        }
    }
    const onClick = () => {
        if (editMode) {
            setMode(false)
        } else setMode(true)
    }
    return (
        <div className={classes.page}>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large || avatar} alt=""/>
            </div>
            {props.isOwner ? null :
                <div className={classes.descriptionBlock}>
                    <label htmlFor="icon-button-photo">
                        <IconButton color="primary" component="span">
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                    <input
                        accept="image/*"
                        className={classes.input}
                        onChange={uploadImage}
                        id="icon-button-photo"
                        type="file"
                    />
                </div>
            }
            <ProfileStatus isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
            <ProfileDataInfo profile={props.profile}/>
            {props.isOwner ? null : editMode
                ? <div className={classes.button}>
                    <Button color="secondary" variant='contained' onClick={onClick}>Discard Chages</Button>
                </div>
                :
                <div className={classes.button}>
                    <Button color="primary" variant='contained' onClick={onClick}>Change Profile</Button>
                </div>
            }
            {
                editMode ?
                    <ProfileForm error={props.error} UploadInformation={props.UploadInformation} profile={props.profile}
                                 onClick={onClick}/> : null
            }
        </div>
    );
}
export default ProfileInfo;