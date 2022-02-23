import {instance, APIResponseType} from "./api";
import {UsersPhotoType} from "./users-api";
import {ContactType} from "../components/Profile/ProfileInfo/ProfileInfo";
export type ProfileType ={
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription:string
    fullName: string
    aboutMe: string
    contacts:{ [key: string]: ContactType }
    // contacts:{
    //     github: string
    //     vk: string
    //     facebook: string
    //     instagram: string
    //     twitter: string
    //     website: string
    //     youtube: string
    //     mainLink: string
    // }
    photos:UsersPhotoType
}
export const profileAPI = {
    contentProfile(userId: string | null) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res=>res.data)
    },
    getStatus(userId: string | null) {
        return instance.get<string>(`profile/status/${userId}`).then(res=>res.data)
    },
    UpdateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status})
    },
    UploadPhoto(photoData: File) {
        const photo = new FormData()
        photo.append('image', photoData)
        return instance.put<APIResponseType<UsersPhotoType>>('profile/photo', photo, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>res.data)
    },
    uploadInformation(profile: any) {
        return instance.put('profile', profile)
    }
}