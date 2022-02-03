import React from "react";
import profileReducer, {addPostActionCreator, ProfilePageType} from "./Redux/profile-reducer";
let initialState: ProfilePageType = {
    postsData: [
        {id: 1, message: 'How are you?', likesCount: 11},
        {id: 2, message: 'This my first post!', likesCount: 20},
    ],
    status: '',
    profile: null
}
it('Lenght of post should be incremented',()=>{
    let action = addPostActionCreator('Helllo')
    let newState = profileReducer(initialState,action)
    expect(newState.postsData[2].message).toBe('Helllo')
})