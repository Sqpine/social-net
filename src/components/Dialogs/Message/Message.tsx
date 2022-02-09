import React from 'react';
import classes from "./../Dialogs.module.css";
import {MessageType} from "../../../Redux/storeType";

const Message = (props: MessageType) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}
export default Message;