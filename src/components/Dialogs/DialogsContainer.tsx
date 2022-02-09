import React, {useEffect} from 'react';
import Dialogs from "./Dialogs";
import {addMessageActionCreator, MessagesPageType,} from "../../Redux/dialogs-reducer";
import {connect} from "react-redux";
import {StoreType} from "../../Redux/reduxStore";
import {compose} from "redux";
import {useNavigate} from "react-router-dom";
import {UsHoc} from "../Profile/withAuthRedirect";

type MapStatePropsType = {
    messagesPage: MessagesPageType
    isAuth: boolean
}
type PropsType = {
    messagesPage: MessagesPageType
    addMessageActionCreator: (s: string) => void;
    isAuth: boolean
}

const DialogsContainer = (props: PropsType) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`${UsHoc(props.isAuth, '/dialogs')}`)
    }, [])
    return (
        <Dialogs {...props}
                 addText={props.addMessageActionCreator}/>
    )
}
let mapStateToProps = (state: StoreType): MapStatePropsType => {
    return {
        messagesPage: state.messagesPage,
        isAuth: state.auth.isAuth
    }
}
export default compose(
    connect(mapStateToProps, {addMessageActionCreator})
)(DialogsContainer)
