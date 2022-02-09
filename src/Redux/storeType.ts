import {addError, addPostActionCreator, setPhotoSuccsesful, setUserProfile, setUserStatus} from "./profile-reducer";
import {addMessageActionCreator,} from "./dialogs-reducer";
import {
    followAccept,
    setCurrentPage,
    setPages,
    setUsers,
    toggleIsFetching,
    toggleIsFollowing,
    unFollowAccept
} from "./users-reducer";
import {loginError, setUserDataAC} from "./auth-reducer";
import {initializedSuccsess} from "./app-reducer";

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
    avatar: string
}
export type PostsData = {
    id: number
    message: string
    likesCount: number
}
export type SideData = {
    id: number
    avatar: string
    name: string
}
export type MessagesPageType = {
    dialogsData: DialogType[]
    messagesData: MessageType[]

}
export type ProfilePageType = {
    postsData: PostsData[]
    text: string
}
export type SideDataType = {
    sideData: SideData[]
}
export type StateType = {
    messagesPage: MessagesPageType
    profilePage: ProfilePageType
    sideBar: SideDataType
}
export type ActionTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof addMessageActionCreator>
    | ReturnType<typeof followAccept>
    | ReturnType<typeof unFollowAccept>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setPages>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof setUserDataAC>
    | ReturnType<typeof loginError>
    | ReturnType<typeof toggleIsFollowing>
    | ReturnType<typeof initializedSuccsess>
    | ReturnType<typeof setPhotoSuccsesful>
    | ReturnType<typeof addError>

