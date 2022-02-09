import {NavLink} from "react-router-dom";
import s from "./users.module.css";
import userPhoto from "../../images/avatar.png";
import React from "react";
import {PropsType} from "./Users";
import {Button} from '@mui/material';

const UserMaping = (props: PropsType) => {
    return (
        <div className={s.usersProfiles}>
            {props.users.map(u => <div className={s.users} key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                 <img className={s.usersPhoto}
                                      src={u.photos.small != null ? u.photos.small : userPhoto} alt=""/>
                            </NavLink>
                        </div>
                        <span>
                            <div>
                                {u.name}
                            </div>
                            <div>
                                Status: <b>{u.status}</b>
                            </div>
                        </span>
                        <div className={s.followUnfollow}>
                            {u.followed ?
                                <Button size='small' color='secondary' variant='contained'
                                        disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unFollow(u.id)
                                }}>Unfollow</Button> :
                                <Button size='small' color='primary' variant='contained'
                                        disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</Button>
                            }
                        </div>
                    </span>
                <span>
                    </span>
            </div>)}
        </div>
    )
}
export default UserMaping