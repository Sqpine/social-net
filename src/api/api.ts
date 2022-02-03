import axios from "axios";
const instance = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        'API-KEY':'8f813530-5f30-4753-8d0a-a95ed67652cb'
    }
})
export const usersAPI={
    getUsers(pageNumber: number = 1, pageSize: number = 10){
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`).then(response => response.data)
    },
    unFollowUsers(id:number){
        return instance.delete(`follow/${id}`).then(response => response.data)
    },
    followUsers(id:number){
        return instance.post(`follow/${id}`).then(response => response.data)
    }
}
export const headerAPI={
    loginUser(){
        return instance.get('auth/me')
    }
}
export const loginAPI={
    loginUserIn(email:string,password:string,rememberMe:boolean){
        return instance.post('auth/login',{email:email,password:password,rememberMe:rememberMe})
    },
    loginUserOut(){
        return instance.delete('auth/login')
    }

}
export const profileAPI={
    contentProfile(userId:string|null){
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId:string|null){
        return instance.get(`profile/status/${userId}`)
    },
    UpdateStatus(status:string){
        return instance.put(`profile/status`,{status:status})
    }
}

// export const getUsers = (pageNumber: number = 1, pageSize: number = 10) => {
//     return instance.get(`users?page=${pageNumber}&count=${pageSize}`).then(response => response.data)
// }