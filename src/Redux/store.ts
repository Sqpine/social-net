import {addPostActionCreator, setUserProfile, setUserStatus} from "./profile-reducer";
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
export type StoreStateType = {
    _state: StateType
    _callSubscriber: (_state: StateType) => void
    getState: () => StateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionTypes) => void
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

/*let store: StoreStateType = {
    _state: {
        messagesPage: {
            dialogsData: [
                {
                    id: 1,
                    name: 'Sasha',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU'
                },
                {id: 2, name: 'Sofia', avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
                {
                    id: 3,
                    name: 'Vlad',
                    avatar: 'https://images.ctfassets.net/hrltx12pl8hq/61DiwECVps74bWazF88Cy9/2cc9411d050b8ca50530cf97b3e51c96/Image_Cover.jpg?fit=fill&w=480&h=270'
                },
                {
                    id: 4,
                    name: 'Yura',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYIX4fdymadei7FiL-19pxFAWPLEJgQlNEww&usqp=CAU'
                },
                {
                    id: 5,
                    name: 'Misha',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_U4D9vI7TukMPMsH7AiBItemQXeIF_3qeHQ&usqp=CAU'
                },
                {id: 6, name: 'Vasya', avatar: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg'}
            ],
            messagesData: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'Hello my friend'},
                {id: 3, message: 'Yo dear!'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'},
                {id: 6, message: 'Yo'}
            ],
            text: ''
        },
        profilePage: {
            postsData: [
                {id: 1, message: 'How are you?', likesCount: 11},
                {id: 2, message: 'This my first post!', likesCount: 20},
            ],
            text: ''
        },
        sideBar: {
            sideData: [
                {
                    id: 1,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU',
                    name: 'Sasha'
                },
                {id: 2, avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', name: 'Sofia'},
                {
                    id: 3,
                    avatar: 'https://images.ctfassets.net/hrltx12pl8hq/61DiwECVps74bWazF88Cy9/2cc9411d050b8ca50530cf97b3e51c96/Image_Cover.jpg?fit=fill&w=480&h=270',
                    name: 'Vlad'
                }
            ]
        }
    },
    _callSubscriber() {
        console.log("Hello")
    },
    getState() {
        return this._state;
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
        this._state.sideBar = sidebarReducer(this._state.sideBar, action)
        this._callSubscriber(this._state)
    }
}
export {store};*/
