import './App.css';
import React, {useEffect, Suspense} from 'react';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./Redux/app-reducer";
import store, {StoreType} from "./Redux/reduxStore";
import Preloader from "./components/common/preloader";
import s from './s.module.css'
import {Suspens} from "./HOC/suspens";

const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import UsersContainer from "./components/Users/UsersContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
// import Login from "./components/Login/Login";
const App = (props: any) => {
    useEffect(() => {
        props.loginUser()
    }, [])
    if (!props.initialized) {
        return <div className={s.preloader}>
            <Preloader/>
        </div>
    } else return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/dialogs/*' element={
                        <Suspense fallback={<Preloader/>}>
                            <DialogsContainer/>
                        </Suspense>
                    }/>
                    <Route path="profile" element={
                        <Suspense fallback={<Preloader/>}>
                            <ProfileContainer/>
                        </Suspense>
                    }>
                        <Route path=":userId" element={
                            <Suspense fallback={<Preloader/>}>
                            <ProfileContainer/>
                        </Suspense>
                        }/>
                    </Route>
                    <Route path='/users/*' element={
                        <Suspense fallback={<Preloader/>}>
                            <UsersContainer/>
                        </Suspense>
                    }/>
                    <Route path='/login/' element={
                        <Suspense fallback={<Preloader/>}>
                            <Login/>
                        </Suspense>
                        }/>
                </Routes>
            </div>
        </div>
    );
}
const mapStateToProps = (state: StoreType) => {
    return {
        initialized: state.app.initialized
    }

}
let AppWithRouter = connect(mapStateToProps, {
    loginUser: initializeApp,
})(App);
const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppWithRouter/>
            </Provider>
        </BrowserRouter>
    )
}
export default MainApp
