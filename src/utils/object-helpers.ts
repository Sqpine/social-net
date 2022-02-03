import {UserType} from "../Redux/users-reducer";

export const mapingUsers = (state:UserType[],userId:number,newObjProps: { followed:boolean })=>{
    return state.map(u => {
        if (u.id === userId) {
            return {...u,...newObjProps}
        }
        return u
    })
}