import React from "react";
import {useFormik} from 'formik';
import {ContactType, ProfileType} from "./ProfileInfo/ProfileInfo";
import {Button} from "@material-ui/core";
import s from './Profile.module.css'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import {validationSchema} from "../../utils/validators/validators";
import {Typography} from "@mui/material";

type Values = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
}

type PropsType = {
    error: string
    profile: ProfileType | null
    onClick: () => void
    UploadInformation:(file: object) => Promise<boolean | undefined>
}
const ProfileForm = (props: PropsType) => {
    const formik = useFormik({
        initialValues: {
            lookingForAJob: props.profile?.lookingForAJob || false,
            lookingForAJobDescription: props.profile?.lookingForAJobDescription || '',
            fullName: props.profile?.fullName || '',
            aboutMe: props.profile?.aboutMe || '',
            contacts: {
                github: props.profile?.contacts.github || '',
                vk: props.profile?.contacts.vk || '',
                facebook: props.profile?.contacts.facebook || '',
                instagram: props.profile?.contacts.instagram || '',
                twitter: props.profile?.contacts.twitter || '',
                website: props.profile?.contacts.website || '',
                youtube: props.profile?.contacts.youtube || '',
                mainLink: props.profile?.contacts.mainLink || ''
            }
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const promise = props.UploadInformation(values)
            promise.then(r => {
                if (r) {
                    props.onClick()
                }
            })
        }
    });
    return (
        <div className={s.animation}>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.button}>
                    <Button color="primary" variant="contained" type="submit">
                        Submit
                    </Button>
                </div>
                {props.error &&
                    <div className={s.animation}>
                        <Typography variant='subtitle1' color='red'>
                            {props.error}
                        </Typography>
                    </div>}
                <div className={s.formStyle}>
                    <TextField size='small'
                               id="fullName"
                               name="fullName"
                               label="Full Name"
                               value={formik.values.fullName}
                               onChange={formik.handleChange}
                               error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                               helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                </div>
                <div className={s.formStyle}>
                    <TextField
                        size='small'
                        id="aboutMe"
                        name="aboutMe"
                        label="About Me"
                        value={formik.values.aboutMe}
                        onChange={formik.handleChange}
                        error={formik.touched.aboutMe && Boolean(formik.errors.aboutMe)}
                        helperText={formik.touched.aboutMe && formik.errors.aboutMe}
                    />
                </div>
                <div className={s.formStyle}>
                    <label htmlFor="lookingForAJob">Looking For A Job</label>
                    <Checkbox
                        id="lookingForAJob"
                        name="lookingForAJob"
                        checked={formik.values.lookingForAJob}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={s.formStyle}>
                    <TextField
                        size='small'
                        id="lookingForAJobDescription"
                        name="lookingForAJobDescription"
                        label="My professional skills"
                        value={formik.values.lookingForAJobDescription}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={s.formStyle}>
                    <TextField
                        size='small'
                        id="contacts.github"
                        name="contacts.github"
                        label="GitHub"
                        value={formik.values.contacts.github}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={s.formStyle}>
                    <TextField
                        size='small'
                        id="contacts.vk"
                        name="contacts.vk"
                        label="Vk"
                        value={formik.values.contacts.vk}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={s.formStyle}>
                    <TextField
                        size='small'
                        id="contacts.facebook"
                        name="contacts.facebook"
                        label="FaceBook"
                        value={formik.values.contacts.facebook}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={s.formStyle}>
                    <TextField
                        size='small'
                        id="contacts.instagram"
                        name="contacts.instagram"
                        label="Instagram"
                        value={formik.values.contacts.instagram}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={s.formStyle}>
                    <TextField
                        size='small'
                        id="contacts.twitter"
                        name="contacts.twitter"
                        label="Twitter"
                        value={formik.values.contacts.twitter}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={s.formStyle}>
                    <TextField
                        size='small'
                        id="contacts.website"
                        name="contacts.website"
                        label="Website"
                        value={formik.values.contacts.website}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={s.formStyle}>
                    <TextField
                        size='small'
                        id="contacts.youtube"
                        name="contacts.youtube"
                        label="YouTube"
                        value={formik.values.contacts.youtube}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={s.formStyle}>
                    <TextField
                        size='small'
                        id="contacts.mainLink"
                        name="contacts.mainLink"
                        label="Main Link"
                        value={formik.values.contacts.mainLink}
                        onChange={formik.handleChange}
                    />
                </div>
            </form>
        </div>
    )
}
export default ProfileForm