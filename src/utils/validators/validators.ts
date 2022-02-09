import * as yup from 'yup';

export const validationSchema = yup.object({
    fullName: yup.string().required('Full Name is required'),
    aboutMe: yup.string().required('About Me is required'),
});
export const validationSchemaPost = yup.object({
    postText: yup.string().required('Post text is required'),
});
export const validationSchemaLogin = yup.object({
    email: yup.string().required('Email text is required'),
    password: yup.string().required('Password text is required'),
});
export const validationSchemaDialog = yup.object({
    messageText: yup.string().required('Message text is required')
});