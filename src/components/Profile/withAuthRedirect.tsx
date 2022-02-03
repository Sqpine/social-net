import React from "react";


export const UsHoc = (isAuth:boolean,path='/profile')=>{
    if(!isAuth){
        return '/login'
    }
    else {
        return path
    }
}
//  const useAuthRedicrectComponent = (Component:any) => {
//     return function RedirectComponent (props:WithLoadingProps){
//         const navigate = useNavigate();
//         if(!props.isAuth){
//                 navigate( '/login')
//         }
//         return <Component {...props} />
//     }
// }