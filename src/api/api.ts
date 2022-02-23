import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        // 'API-KEY': 'fd9797e2-c763-462e-9359-8ba01d0cfae1' DAN SHEVA
        'API-KEY': '8f813530-5f30-4753-8d0a-a95ed67652cb'
    }
})
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC

}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeCaptcha{
    CaptchaRequired = 10
}

export type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}