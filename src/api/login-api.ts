import {instance, APIResponseType, ResultCodeCaptcha, ResultCodeEnum} from "./api";

type LoginUserInType = {
    userId?: number
}

export const loginAPI = {
    loginUserIn(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<APIResponseType<LoginUserInType,ResultCodeEnum|ResultCodeCaptcha>>('auth/login', {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha
        })
    },
    loginUserOut() {
        return instance.delete<APIResponseType>('auth/login')
    }

}