import React from "react";


export const UsHoc = (isAuth: boolean, path = '/profile') => {
    if (!isAuth) {
        return '/login'
    } else {
        return path
    }
}