import {InferActionsTypes} from "./storeType";
import {loginUserThunk} from "./auth-reducer";
import {ThunkBaseType} from "./reduxStore";

const SET_INITIALIZING_SUCCSESS = 'app/SET_INITIALIZING_SUCCSESS'
type initialState = {
    initialized: boolean
}
let initialState: initialState = {
    initialized: false,
}

const AppReducer = (state: initialState = initialState, action: ActionAppTypes): initialState => {
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
const actionApp = {
    initializedSuccsess : () => {
        return {
            type: SET_INITIALIZING_SUCCSESS,
        } as const
    }
}
type ActionAppTypes=InferActionsTypes<typeof actionApp>
type ThunkType = ThunkBaseType<ActionAppTypes>
export const initializeApp = ():ThunkType => async (dispatch) => {
    let promise = dispatch(loginUserThunk())
    Promise.all([promise]).then(() => {
        dispatch(actionApp.initializedSuccsess())
    })
}

export default AppReducer