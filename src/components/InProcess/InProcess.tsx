import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UsHoc} from "../Profile/withAuthRedirect";
import {connect} from "react-redux";
import {StoreType} from "../../Redux/reduxStore";
import s from './style.module.css'

type PropsType ={
    isAuth:boolean
}
const InProcess = (props:PropsType) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5)
    const setTimer = () => {
        const result = count - 1
        setCount(result)
    }
    useEffect(() => {
        if (count === 0) {
            navigate(`${UsHoc(props.isAuth,'/profile')}`)
        } else setTimeout(() => {
            setTimer()
        }, 1000)
    }, [count])
    return (
        <div className={s.center}>
            <img className={s.robot} src="https://c.tenor.com/CigpzapemsoAAAAi/hi-robot.gif" alt=""/>
            <h2>
                Sorry, this page has not been created yet.
            </h2>
            <h4>You will be redirected in {count} seconds</h4>
        </div>
    )
}
let mapStateToProps = (state:StoreType):PropsType=>{
    return{
        isAuth:state.auth.isAuth
    }
}
export default connect(mapStateToProps)(InProcess)