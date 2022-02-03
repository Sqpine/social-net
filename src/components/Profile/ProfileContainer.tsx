import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {StoreType} from "../../Redux/reduxStore";
import {getStatus, profileThunk, setUserProfile, updateStatus} from "../../Redux/profile-reducer";
import {useNavigate, useParams} from "react-router-dom";
import {UsHoc} from "./withAuthRedirect";

type PropsType = {
    setUserProfile: (data: object) => void
    profile: any | object
    id: string | null
    profileThunk: (i: string | undefined, s: string | null)=>void
    getStatus:(i: string | undefined, s: string | null)=>void
    isAuth:boolean
    status:string
    updateStatus:(s:string)=>void
}
const ProfileContainer = (props: PropsType) => {
    const {userId} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        navigate( `${UsHoc(props.isAuth)}`)
        props.profileThunk(userId, props.id)
        props.getStatus(userId, props.id)
    },[props.isAuth]);
    return (
        <Profile profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
    )
}

/*class ProfileContainer extends React.Component<PropsType>{
    componentDidMount() {
        const linker=this.props.useLinker()
        debugger
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${linker}'`).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render(){
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}
const useLinker = () =>{
    const params = useParams();
    const current = params.id;
    if(current){
        return current
    }
    else return null
}*/
let mapStateToProps = (state: StoreType) => (
    {
        profile: state.profilePage.profile,
        id: state.auth.id,
        isAuth: state.auth.isAuth,
        status:state.profilePage.status
    }
)
export default connect(mapStateToProps, {
    setUserProfile,
    profileThunk,
    getStatus,
    updateStatus
})(ProfileContainer);