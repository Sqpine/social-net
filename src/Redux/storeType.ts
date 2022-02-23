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
    avatar: string|null
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
type PropertiesTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

