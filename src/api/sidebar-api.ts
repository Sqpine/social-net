import {instance} from "./api";
import {itemsType, User} from "./users-api";

export const sidebarApi = {
    getFollowUser: () => {
        return instance.get<User<itemsType>>(`users?count=3&page=1&friend=true`).then(res => res.data)
    }
}