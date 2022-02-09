import React, {useEffect} from "react";
import {useFormik} from 'formik';
import {loginUser} from "../../Redux/auth-reducer";
import {connect, useDispatch} from "react-redux";
import {Dispatch, Store} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {validationSchemaLogin} from "../../utils/validators/validators";
import {useNavigate} from "react-router-dom";
import {UsHoc} from "../Profile/withAuthRedirect";
import {StoreType} from "../../Redux/reduxStore";
import s from './s.module.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from "@mui/material/Checkbox";
import {Typography} from '@mui/material';

type DataType = {
    email: string
    password: string
    toggle: boolean
    captcha: string
}
type PropsType = {
    captcha: string
    isAuth: boolean
    error: string | undefined
}
type LoginFormType = {
    error: string | undefined
    captcha: string
}
const login = (values: DataType, dispatch: ThunkDispatch<Dispatch, Store, any>) => {
    let sentData = new Promise<DataType>((resolve) => {
        resolve(values)
    })
    sentData.then(data => {
        dispatch(loginUser(data.email, data.password, data.toggle, data.captcha))
    })
}

const LoginForm = (props: LoginFormType) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            toggle: false,
            captcha: ''
        },
        validationSchema: validationSchemaLogin,
        onSubmit: (values) => {
            login(values, dispatch)
        }
    });
    const dispatch = useDispatch<ThunkDispatch<Dispatch, Store, any>>()
    return (
        <div className='loginForm'>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.loginBlock}>
                    <div className={s.field}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </div>
                    <div className={s.field}>
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <div>
                        <label htmlFor="toggle">Save Me</label>
                        <Checkbox
                            id="toggle"
                            name="toggle"
                            size='small'
                            checked={formik.values.toggle}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {props.captcha && <div className={s.animation}>
                        <div>
                            <img className={s.captcha} src={props.captcha} alt="Captcha"/>
                        </div>
                        <TextField
                            id="captcha"
                            name="captcha"
                            label="captcha"
                            type="captcha"
                            value={formik.values.captcha}
                            onChange={formik.handleChange}
                        />
                    </div>}
                    {props.error &&
                        <Typography className={s.warning} variant='subtitle1'>{props.error}</Typography>}
                    <div className={s.button}>
                        <Button color='primary' variant='contained' size='small' type="submit">
                            Login
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
const Login = (props: PropsType) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`${UsHoc(props.isAuth)}`)
    }, [props.isAuth, props.error])
    return (
        <div className={s.login}>
            <LoginForm captcha={props.captcha} error={props.error}/>
        </div>
    )
}
let mapStateToProps = (state: StoreType) => {
    return ({
        isAuth: state.auth.isAuth,
        error: state.auth.error,
        captcha: state.auth.captcha
    })

}
export default connect(mapStateToProps)(Login)
