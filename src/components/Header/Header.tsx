import React from "react";
import classes from "./Header.module.css";
import logo from '../../images/logo.svg'
import {NavLink} from "react-router-dom";
import {Button} from '@mui/material';
import {AuthActionsTypes} from "../../Redux/auth-reducer";
import {ThunkBaseType} from "../../Redux/reduxStore";

type PropsType = {
    loginUserOut:()=>void
    isAuth: boolean
    login: string | null
    id: string | null
}
const Header = (props: PropsType) => {
    const onChange = () => {
        props.loginUserOut()
    }
    return (
        <header className={classes.header}>
            <div>
                <img className={classes.logo} src={logo} alt=""/>
            </div>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ?
                    <div className={classes.animation}>
                        <div>
                            <h5>{props.login},{props.id}</h5>
                        </div>
                        <Button color='secondary' size='small' variant="contained" onClick={onChange}>Log out</Button>
                    </div>
                    :
                    <NavLink className={classes.animation} to={'/login'}>
                        <Button color='primary' size='small' variant="contained">Login</Button>
                    </NavLink>}
            </div>
        </header>
    )
}
export default Header