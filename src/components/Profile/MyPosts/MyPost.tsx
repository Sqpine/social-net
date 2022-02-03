import React from 'react';
import Post from "./Post/Post";
import classes from "./MyPost.module.css";
import {PostsData} from "../../../Redux/profile-reducer";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import {postValidator} from "../../../utils/validators/validators";

type PropsType = {
    profilePage: PostsData[]
    addPostActionCreator: (s: string) => void
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
        alert('Posted')
        addPost(prom.postText)
    })
}

const CreatPost = (props: PostType) => {
    return <div>
        <Formik
            initialValues={{
                postText: '',
            }}
            validate={values => (postValidator(values,10))}
            onSubmit={(values, {resetForm}) => {
                sentData(values, props.addPost)
                resetForm();
            }
            }

        >
            <Form>
                <Field id="postText" name="postText" placeholder="Type your post message..."/>
                <ErrorMessage name="postText" component="div"/>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    </div>;
}

const MyPost = (props: PropsType) => {
    let postsElements = props.profilePage.map(
        post => <Post key={post.id} message={post.message} likesCount={post.likesCount} id={post.id}/>
    )
    console.log('Render')
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
export default MyPost;