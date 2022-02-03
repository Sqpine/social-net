import React from 'react';
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from './Message/Message';
import {MessagesPageType} from "../../Redux/store";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {messageValidator} from "../../utils/validators/validators";

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
        alert('Sent')
        console.log(prom.messageText)
        addText(prom.messageText)
    })
}

const CreatPost = (props: PostType) => {
    return <div>
        <Formik
            initialValues={{
                messageText: '',
            }}
            validate={values => (messageValidator(values,10))}
            onSubmit={(values, {resetForm}) => {
                sentData(values, props.addText);
                resetForm();
                console.log(values);
            }
            }
        >
            <Form>
                <Field id="messageText" name="messageText" placeholder="Type your message..."/>
                <button type="submit">Submit</button>
                <ErrorMessage name="messageText" component="div"/>
            </Form>
        </Formik>
    </div>;
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
            <div className={classes.messages}>
                {messagesElements}
            </div>
            <div>
                <CreatPost addText={props.addText}/>
            </div>
        </div>
    );
}
export default Dialogs;