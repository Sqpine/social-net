import usersReducer, {actionsUsers, UsersType} from "../Redux/users-reducer";

let state: UsersType
beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Dimon', followed: false, photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 1, name: 'Dimon 1', followed: false, photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 2, name: 'Dimon 2', followed: true, photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 3, name: 'Dimon 3', followed: true, photos: {small: null, large: null}, status: 'status 0'
            }
        ],
        pageSize: 5,
        totalUsersCount: 21,
        currentPage: 1,
        isFetching: false,
        isFollowing: []
    }
})

test('follow suceess', () => {
    const newState = usersReducer(state, actionsUsers.followAccept(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('unfollow success',()=>{
    const newState = usersReducer(state, actionsUsers.unFollowAccept(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})