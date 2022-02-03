import React from 'react';
import classes from './Navbar.module.css'
import messages from '../../images/messages.svg';
import music from '../../images/music.svg';
import news from '../../images/news.svg';
import profile from '../../images/profile.svg';
import settings from '../../images/settings.svg';
import {NavLink} from "react-router-dom";
import NavbarFriends from "./Content/NavbarFriends";
import {SideDataType} from "../../Redux/store";
import store from "../../Redux/reduxStore";
const Navbar = () => {
    let navData:SideDataType = store.getState().sideBar
    let navFriends = navData.sideData.map(nav => <NavbarFriends key={nav.id} avatar={nav.avatar} name={nav.name} id={nav.id}/>)
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <img src={profile} alt={'profile'}/>
                <NavLink to="/profile"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <img src={messages} alt={'messages'}/>
                <NavLink to="/dialogs"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <img src={news} alt={'news'}/>
                <NavLink to=""
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>News</NavLink>
            </div>
            <div className={classes.item}>
                <img src={music} alt={'music'}/>
                <NavLink to=""
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>Music</NavLink>
            </div>
            <div className={classes.item}>
                <img src={music} alt={'users'}/>
                <NavLink to="/users"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>Users</NavLink>
            </div>
            <div className={classes.itemFriends}>
                <div>
                    <NavLink to='dialogs'
                             className={navData => navData.isActive ? classes.activeLink : classes.item}>My Friends</NavLink>
                </div>
                <div className={classes.flex}>
                    {navFriends}
                </div>
            </div>
            <div className={classes.item}>
                <img src={settings} alt={'settings'}/>
                <NavLink to=""
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>Settings</NavLink>
            </div>
        </nav>
    );
}
export default Navbar;