import {ActionTypes} from "./storeType";
import {loginUserThunk} from "./auth-reducer";

const SET_INITIALIZING_SUCCSESS = 'app/SET_INITIALIZING_SUCCSESS'
type initialState = {
    initialized: boolean
}
let initialState: initialState = {
    initialized: false,
}
const AppReducer = (state: initialState = initialState, action: ActionTypes): initialState => {
    switch (action.type) {

        case SET_INITIALIZING_SUCCSESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state

    }
}
export const initializedSuccsess = () => {
    return {
        type: SET_INITIALIZING_SUCCSESS,
    } as const
}
export const initializeApp = () => async (dispatch: any) => {
    let promise = dispatch(loginUserThunk())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccsess())
    })
}

export default AppReducer