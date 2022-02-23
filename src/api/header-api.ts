import {instance, ResultCodeEnum} from "./api";

export const headerAPI = {
    loginUser() {
        return instance.get<TypeLoginUser>('auth/me')
    }
}
type TypeLoginUser = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {
        id: string
        email: string
        login: string
    }
}