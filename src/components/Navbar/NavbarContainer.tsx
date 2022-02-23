import React, {useEffect} from "react";
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {SideBarThunk} from "../../Redux/sidebar-reducer";
import {StoreType} from "../../Redux/reduxStore";

const NavbarContainer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(SideBarThunk())
    }, [])

    const navState = useSelector((state: StoreType) => state.sideBar)
    return (
        <div>
            {navState.isFetching?
                null
                :
                <Navbar navData={navState.items}/>
            }
        </div>
    )
}
export default NavbarContainer