import React, {useEffect, useState} from "react";
import {Typography} from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";

type PropsType = {
    updateStatus: (s: string) => void
    status: string
    isOwner: string | undefined
}
const ProfileStatus = (props: PropsType) => {
    let [editMode, setMode] = useState(false);
    let [status, setStatus] = useState(`${props.status}`)
    console.log(props.status)
    const activateEditMode = (): void => {
        if (!props.isOwner) {
            setMode(true)
        }
    }
    const disableEditMode = (): void => {
        if (!props.isOwner) {
            setMode(false)
        }
        props.updateStatus(status)
    }
    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setStatus(e.currentTarget.value)
    }
    useEffect(() => {
        setStatus(`${props.status}`)

    }, [props.status])
    return (
        <>
            {!editMode &&
                <div>
                    <span>Status:</span>
                    "<span onDoubleClick={activateEditMode}><Typography
                    variant='button'>{props.status || '----'}</Typography></span>"
                    {
                        props.isOwner ?
                            null :
                            <IconButton size='small' color="primary" component="span" onClick={activateEditMode}>
                                <EditIcon fontSize='small'/>
                            </IconButton>
                    }
                </div>
            }
            {editMode &&
                <div>
                    <span>Status:</span>
                    <input onChange={onStatusChange} autoFocus={true} id="icon-button-photo" onBlur={disableEditMode}
                           value={status}/>
                    <label htmlFor="icon-button-photo">
                        <IconButton size='small' color="primary" component="span" onClick={disableEditMode}>
                            <EditIcon fontSize='small'/>
                        </IconButton>
                    </label>
                </div>
            }
        </>
    )
}
export default ProfileStatus