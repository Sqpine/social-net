import React from "react";
import s from './style.module.css'

const Preloader = () => {
    return (
        <div className={s.loading}>
            <div className={s.loader}>
                <div className={s.shadow}></div>
                <div className={s.box}></div>
            </div>
        </div>
    )
}
export default Preloader