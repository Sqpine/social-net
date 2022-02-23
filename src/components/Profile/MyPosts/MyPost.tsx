import React from 'react';
import Post from "./Post/Post";
import classes from "./MyPost.module.css";
import {PostsData} from "../../../Redux/profile-reducer";
import Button from '@material-ui/core/Button';
import {useFormik} from 'formik';
import {validationSchemaPost} from "../../../utils/validators/validators";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

type PropsType = {
    profilePage: PostsData[]
    addPostActionCreator: (s: string) => void
    profile: any
}
type PostType = {
    addPost: (s: string) => void
}
type DataType = {
    postText: string
}

const sentData = (values: DataType, addPost: (s: string) => void) => {
    let sentData = new Promise<DataType>((resolve) => {
        resolve(values)
    })
    sentData.then(prom => {
        addPost(prom.postText)
    })
}

const CreatPost = (props: PostType) => {
    const formik = useFormik({
        initialValues: {
            postText: ''
        },
        validationSchema: validationSchemaPost,
        onSubmit: (values, {resetForm}) => {
            sentData(values, props.addPost)
            resetForm();
        }
    });
    return (<div>
        <form onSubmit={formik.handleSubmit} className={classes.manage}>
            <div>
                <TextField
                    id="postText"
                    name="postText"
                    label="Post Text"
                    value={formik.values.postText}
                    onChange={formik.handleChange}
                    error={formik.touched.postText && Boolean(formik.errors.postText)}
                    helperText={formik.touched.postText && formik.errors.postText}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon/>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
            </div>
            <div>
                <Button color="primary" size='small' variant="contained" type="submit">
                    Submit
                </Button>
            </div>
        </form>
    </div>)
}

const MyPost = (props: PropsType) => {
    const postsElements = props.profilePage.map(
        post => <Post profile={props.profile} key={post.id} message={post.message} likesCount={post.likesCount}
                      id={post.id}/>
    )
    return (
        <div className={classes.postBlock}>
            <h3>My posts</h3>
            <CreatPost addPost={props.addPostActionCreator}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
}
const MyPostMemorized = React.memo(MyPost)
export default MyPostMemorized;