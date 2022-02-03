import React, {useEffect} from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {loginUserOut, loginUserThunk, setUserDataAC} from "../../Redux/auth-reducer";
import {StoreType} from "../../Redux/reduxStore";

type PropsType = {
    loginUserOut:()=>void
    isAuth:boolean
    login:string|null
    id:string|null
}
const HeaderContainer = (props: PropsType) => {
    return (
        <Header isAuth={props.isAuth} login={props.login} id={props.id} loginUserOut={props.loginUserOut}/>
    )
}
const mapStateToProps = (state: StoreType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id,
})
export default connect(mapStateToProps, {
    setUserDataAC,
    loginUserOut: loginUserOut
})(HeaderContainer)