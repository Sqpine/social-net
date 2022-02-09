import React from 'react';
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from './Message/Message';
import {MessagesPageType} from "../../Redux/storeType";
import {useFormik} from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Button from "@material-ui/core/Button";
import {validationSchemaDialog} from "../../utils/validators/validators";

type PropsType = {
    messagesPage: MessagesPageType
    addText: (s: string) => void;
    isAuth: boolean
}
type PostType = {
    addText: (s: string) => void
}
type DataType = {
    messageText: string
}

const sentData = (values: DataType, addText: (s: string) => void) => {
    let sentData = new Promise<DataType>((resolve) => {
        resolve(values)
    })
    sentData.then(prom => {
        addText(prom.messageText)
    })
}

const CreatPost = (props: PostType) => {
    const formik = useFormik({
        initialValues: {
            messageText: ''
        },
        validationSchema: validationSchemaDialog,
        onSubmit: (values, {resetForm}) => {
            sentData(values, props.addText)
            resetForm()
        }
    })

    return (<div>
        <form onSubmit={formik.handleSubmit} className={classes.manage}>
            <div>
                <TextField
                    id="messageText"
                    name="messageText"
                    value={formik.values.messageText}
                    onChange={formik.handleChange}
                    error={formik.touched.messageText && Boolean(formik.errors.messageText)}
                    helperText={formik.touched.messageText && formik.errors.messageText}
                    label="Message Text"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineIcon/>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
            </div>
            <div>
                <Button color="primary" size='small' variant="contained" type="submit">
                    Submit
                </Button>
            </div>
        </form>
    </div>)
}
const Dialogs = (props: PropsType) => {
    let dialogsElements = props.messagesPage.dialogsData.map(
        (d) => <DialogItem key={d.id} avatar={d.avatar} name={d.name} id={d.id}/>
    )
    let messagesElements = props.messagesPage.messagesData.map(
        (m) => <Message key={m.id} message={m.message} id={m.id}/>
    )

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div>
                <div className={classes.messagesBlock}>
                    <div className={classes.messages}>
                        {messagesElements}
                    </div>
                </div>
                <div>
                    <CreatPost addText={props.addText}/>
                </div>
            </div>
        </div>
    );
}
export default Dialogs;