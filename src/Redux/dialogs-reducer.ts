import {ActionTypes} from "./storeType";

const ADD_MESSAGE = 'dialog/ADD-MESSAGE'
const CHANGE_NEW_TEXT_MESSAGE = 'dialog/CHANGE-NEW-TEXT-MESSAGE'

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
    avatar: string
}
export type MessagesPageType = {
    dialogsData: DialogType[]
    messagesData: MessageType[]

}
let initialState: MessagesPageType = {
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
}
const DialogsReducer = (state: MessagesPageType = initialState, action: ActionTypes): MessagesPageType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const newMessage: MessageType = {
                id: new Date().getTime(),
                message: action.text,
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            }
        }
        default:
            return state

    }
}
export const addMessageActionCreator = (text: string) => {
    return {
        type: ADD_MESSAGE,
        text
    } as const
}

export default DialogsReducer