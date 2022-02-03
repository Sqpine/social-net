import React, {useEffect} from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {loginUser} from "../../Redux/auth-reducer";
import {connect, useDispatch} from "react-redux";
import {Dispatch, Store} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {loginValidator} from "../../utils/validators/validators";
import {useNavigate} from "react-router-dom";
import {UsHoc} from "../Profile/withAuthRedirect";
import {StoreType} from "../../Redux/reduxStore";
import s from './s.module.css'

type DataType = {
    email: string
    password: string
    toggle: boolean
}
type PropsType = {
    isAuth: boolean
    error: string | undefined
}
type LoginFormType = {
    error: string | undefined
}
const login = (values: DataType, dispatch: ThunkDispatch<Dispatch, Store, any>) => {
    let sentData = new Promise<DataType>((resolve) => {
        resolve(values)
    })
    sentData.then(data => {
        alert('Hello!')
        dispatch(loginUser(data.email, data.password, data.toggle))
    })
}
const LoginForm = (props: LoginFormType) => {
    const dispatch = useDispatch<ThunkDispatch<Dispatch, Store, any>>()
    return (
        <div>
            <Formik
                initialValues={
                    {
                        email: '',
                        password: '',
                        toggle: false
                    }
                }
                validate={values => (loginValidator(values))}
                onSubmit={(values) => {
                    login(values, dispatch)
                }}
            >
                <Form>
                    <div>
                        <Field type="email" name="email"/>
                        <ErrorMessage name="email" component="div"/>
                    </div>
                    <div>
                        <Field type="password" name="password"/>
                        <ErrorMessage name="password" component="div"/>
                        {props.error ? <div>{props.error}</div> : null}
                    </div>
                    <label>
                        <Field type="checkbox" name="toggle"/>
                    </label>
                    <button type="submit">
                        Login
                    </button>
                </Form>
            </Formik>
        </div>
    )
}
const Login = (props: PropsType) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`${UsHoc(props.isAuth)}`)
    }, [props.isAuth, props.error])
    return (
        <div className={s.loginForm}>
            Hello
            <LoginForm error={props.error}/>
        </div>
    )
}
let mapStateToProps = (state: StoreType) => {
    return ({
        isAuth: state.auth.isAuth,
        error: state.auth.error
    })

}
export default connect(mapStateToProps)(Login)
