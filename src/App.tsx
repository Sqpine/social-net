import './App.css';
import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./Redux/app-reducer";
import store, {StoreType} from "./Redux/reduxStore";
import Preloader from "./components/common/preloader";
import {withSuspense} from "./utils/withSuspense";
import NavbarContainer from "./components/Navbar/NavbarContainer";

const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const InProcess = React.lazy(() => import('./components/InProcess/InProcess'));
const Login = React.lazy(() => import("./components/Login/Login"));

type PropsType = {
    loginUser: () => void
    initialized: boolean
}
const SuspendedDialogsContainer = withSuspense(DialogsContainer)
const SuspendedProfileContainer = withSuspense(ProfileContainer)
const SuspendedInProcess = withSuspense(InProcess)
const SuspendedLogin = withSuspense(Login)
const SuspendedUsersContainer = withSuspense(UsersContainer)

const App = (props: PropsType) => {
    useEffect(() => {
        props.loginUser()
    }, [])
    if (!props.initialized) {
        return <div>
            <Preloader/>
        </div>
    } else return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <NavbarContainer/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/dialogs/*' element={
                        <SuspendedDialogsContainer/>
                        // <Suspense fallback={<Preloader/>}>
                        //     <DialogsContainer/>
                        // </Suspense>
                    }/>
                    <Route path="/profile" element={
                        <SuspendedProfileContainer/>

                        // <Suspense fallback={<Preloader/>}>
                        //     <ProfileContainer/>
                        // </Suspense>
                    }>
                        <Route path=":userId" element={
                            <SuspendedProfileContainer/>

                            // <Suspense fallback={<Preloader/>}>
                            //     <ProfileContainer/>
                            // </Suspense>
                        }/>
                    </Route>
                    <Route path='/users/*' element={
                        <SuspendedUsersContainer/>
                        // <Suspense fallback={<Preloader/>}>
                        //     <UsersContainer/>
                        // </Suspense>
                    }/>
                    <Route path='/login/' element={
                        <SuspendedLogin/>
                        // <Suspense fallback={<Preloader/>}>
                        //     <Login/>
                        // </Suspense>
                    }/>
                    <Route path="*" element={
                        <SuspendedProfileContainer/>
                        //     <Suspense fallback={<Preloader/>}>
                        //     <ProfileContainer/>
                        // </Suspense>
                    }/>
                    <Route path='/process' element={
                        <SuspendedInProcess/>
                        // <Suspense fallback={<Preloader/>}>
                        //     <InProcess/>
                        // </Suspense>
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
