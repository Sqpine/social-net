import {instance, APIResponseType} from "./api";
export type User <D={}> ={
    items:D
    totalCount: number
    error: string
}
export type UsersPhotoType={
    small: string|null
    large: string|null
}
export type itemsType={
    id: number
    name:string
    status: string
    uniqueUrlName:string|null
    photos:UsersPhotoType
    followed:boolean
}


export const usersAPI = {
    getUsers(pageNumber: number = 1, pageSize: number = 10) {
        return instance.get<User<itemsType[]>>(`users?page=${pageNumber}&count=${pageSize}`).then(response => response.data)
    },
    unFollowUsers(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`).then(response => response.data)
    },
    followUsers(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`).then(response => response.data)
    }
}