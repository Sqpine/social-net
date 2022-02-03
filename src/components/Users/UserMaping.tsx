import {NavLink} from "react-router-dom";
import s from "./users.module.css";
import userPhoto from "../../images/avatar.png";
import React from "react";
import {PropsType} from "./Users";

const UserMaping = (props:PropsType) =>{
    return(
        <div className={s.users}>
            {props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                 <img className={s.usersPhoto}
                                      src={u.photos.small != null ? u.photos.small : userPhoto} alt=""/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed ?
                                <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unFollow(u.id)
                                }}>Unfollow</button> :
                                <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>
                            }
                        </div>
                    </span>
                <span>
                        <span>
                            <div>
                                {u.name}
                            </div>
                            <div>
                                {u.status}
                            </div>
                        </span>
                    </span>
            </div>)}
        </div>
    )
}
export default UserMaping