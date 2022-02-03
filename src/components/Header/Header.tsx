import React from "react";
import classes from "./Header.module.css";
import logo from '../../images/logo.svg'
import {NavLink} from "react-router-dom";
type PropsType={
    loginUserOut:()=>void
    isAuth:boolean
    login:string|null
    id:string|null
}
const Header = (props:PropsType) => {
    const onChange = () =>{
        props.loginUserOut()
    }
  return(
      <header className={classes.header}>
          <img className={classes.logo} src={logo} alt=""/>
          <div className={classes.loginBlock}>
              {props.isAuth
                  ?
                  <div><span>{props.login},{props.id}</span> <button onClick={onChange}>Log out</button></div>
                  :
                  <NavLink to={'/login'}>Login</NavLink>}
          </div>
      </header>
  )
}
export default Header