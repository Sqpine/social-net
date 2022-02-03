import React, {useEffect, useState} from "react";

type PropsType = {
    updateStatus: (s: string) => void
    status:string
}
const ProfileStatus = (props: PropsType) => {
    let [editMode, setMode] = useState(false);
    let [status, setStatus] = useState(`${props.status}`)
    console.log(props.status)
    const activateEditMode = (): void => {
        setMode(true)
    }
    const disableEditMode = (): void => {
        setMode(false)
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
                    <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={disableEditMode} value={status}/>
                </div>
            }
        </>
    )
}
export default ProfileStatus