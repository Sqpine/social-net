import React from 'react';
import classes from "./Post.module.css";
import FavoriteIcon from '@material-ui/icons/Favorite';
import avatar from '../../../../images/avatar.png'
import {ProfileType} from "../../ProfileInfo/ProfileInfo";

type PropsType = {
    id: number
    message: string
    likesCount: number
    profile: ProfileType | null
}
const Post = (props: PropsType) => {
    return (
        <div className={classes.item}>
            <div className={classes.postInfo}>
                <div>
                    <img src={props.profile?.photos.small || avatar} alt=""/>
                </div>
                <div>
                    <h4>
                        {props.message}
                    </h4>
                </div>
            </div>
            <div className={classes.postInfo}>
                <FavoriteIcon color='primary'/>
                <div>
                    <span>Like</span> {props.likesCount}
                </div>
            </div>
        </div>
    );
}
export default Post;