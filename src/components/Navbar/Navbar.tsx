import React from 'react';
import classes from './Navbar.module.css'
import messages from '../../images/messages.svg';
import music from '../../images/music.svg';
import news from '../../images/news.svg';
import profile from '../../images/profile.svg';
import settings from '../../images/settings.svg';
import users from '../../images/users.svg'
import {NavLink} from "react-router-dom";
import NavbarFriends from "./Content/NavbarFriends";
import {itemsType} from "../../api/users-api";

type PropsType={
    navData:itemsType[]
}
const Navbar = (props:PropsType) => {
    const navFriends = props.navData.map(nav => <NavbarFriends key={nav.id} avatar={nav.photos.small} name={nav.name}
                                                             id={nav.id}/>)

debugger
    return (
        <nav className={classes.nav}>
            <NavLink to="/profile"
                     className={navData => navData.isActive ? classes.activeLink : classes.unActive}>
                <div className={classes.item}>
                    <img src={profile} alt={'profile'}/>
                    <span>
                        Profile
                    </span>
                </div>
            </NavLink>
            <NavLink to="/dialogs"
                     className={navData => navData.isActive ? classes.activeLink : classes.unActive}>
                <div className={classes.item}>
                    <img src={messages} alt={'messages'}/>
                    <span>
                        Messages
                    </span>
                </div>
            </NavLink>
            <NavLink to="/process"
                     className={navData => navData.isActive ? classes.activeLink : classes.unActive}>
                <div className={classes.item}>
                    <img src={news} alt={'news'}/>
                    <span>
                        News
                    </span>
                </div>
            </NavLink>
            <NavLink to="/process"
                     className={navData => navData.isActive ? classes.activeLink : classes.unActive}>
                <div className={classes.item}>
                    <img src={music} alt={'music'}/>
                    <span>
                        Music
                    </span>
                </div>
            </NavLink>
            <NavLink to="/users"
                     className={navData => navData.isActive ? classes.activeLink : classes.unActive}>
                <div className={classes.item}>
                    <img src={users} alt={'users'}/>
                    <span>
                        Users
                    </span>
                </div>
            </NavLink>
            <div className={classes.itemFriends}>
                <NavLink to='/dialogs'
                         className={navData => navData.isActive ? classes.activeLink : classes.unActive}>My
                    Friends</NavLink>
                <div>
                    <div className={classes.flex}>
                        {navFriends}
                    </div>
                </div>
            </div>
            <NavLink to="/process"
                     className={navData => navData.isActive ? classes.activeLink : classes.unActive}>
                <div className={classes.item}>
                    <img src={settings} alt={'settings'}/>
                    <span>
                        Settings
                    </span>
                </div>
            </NavLink>
        </nav>
    );
}
export default Navbar;