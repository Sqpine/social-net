import React from 'react';
import classes from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import {DialogType} from "../../../Redux/store";

const DialogItem = (props:DialogType) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to={path}>
                <img className={classes.avatar} src={`${props.avatar}`} alt=""/>{props.name}
            </NavLink>
        </div>
    )
}
export default DialogItem;