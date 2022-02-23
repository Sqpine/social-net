import {instance} from "./api";
type CaptchaType ={
    url:string
}
export const securityAPI = {
    getCaptcha() {
        return instance.get<CaptchaType>('security/get-captcha-url')
    }

}