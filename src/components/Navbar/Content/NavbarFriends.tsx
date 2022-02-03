import React from 'react';
import classes from './NavbarFriends.module.css'
import {SideData} from "../../../Redux/store";

const NavbarFriends = (props:SideData) => {
    return(
        <div>
            <img src={`${props.avatar}`} className={classes.avatar} alt='photo'/>
            <div>{props.name}</div>
        </div>
    )
}
export default NavbarFriends;