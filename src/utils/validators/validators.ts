import React from "react";

type ErrorType = {
    email?: string
    password?: string
    postText?: string
    messageText?:string
}

export const loginValidator = (values: any) => {
    const errors: ErrorType = {};
    if (!values.email) {
        errors.email = 'Required';
    }
    else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    else if (!values.password) {
        errors.password = 'Required';
    }
    return errors;
}
export const postValidator = (values: any, maxLength: number) => {
    const errors: ErrorType = {};
    if (!values.postText) {
        errors.postText = 'Required';
    } else if (values.postText.length > maxLength)
    {
        errors.postText = `Максимальное количество символов ${maxLength}`
    }
    return errors;
}
export const messageValidator = (values: any, maxLength: number)=>{
    const errors:ErrorType={}
    if(!values.messageText){
        errors.messageText='Required'
    }else if(values.messageText.length>maxLength){
        errors.messageText=`Максимальное количество символов ${maxLength}`
    }
    return errors;
}