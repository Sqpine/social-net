import React from 'react';
import classes from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import {DialogType} from "../../../Redux/storeType";

const DialogItem = (props: DialogType) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to={path} className={classes.dialogItem}>
                <div>
                    <img className={classes.avatar} src={`${props.avatar}`} alt=""/>
                </div>
                <div>
                    <h5>
                        {props.name}
                    </h5>
                </div>
            </NavLink>
        </div>
    )
}
export default DialogItem;