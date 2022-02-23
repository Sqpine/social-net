import React from "react";
import {ContactType} from "./ProfileInfo/ProfileInfo";

type PropsType = {
    e: string
    contacts: ContactType
}

const ProfileContact = (props: PropsType) => {
    if (props.contacts) {
        return (
            <div key={props.e}>
                <span><b>{props.e}</b>: <a href={`https://${props.contacts}`} rel="noopener noreferrer"
                                           target="_blank">{props.contacts}</a></span>
            </div>
        )
    }
    return null
}
export default ProfileContact