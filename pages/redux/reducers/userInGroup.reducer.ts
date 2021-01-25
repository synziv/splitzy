import { userConstants } from "../constants/user.constants";

export interface UserInGroup {
    id: number
    name: string;
    total: number;
    color: string;
    owingArr?: {user: number, owing:number}[];
    groups: number[];
}
export interface UserInGroupState {
    users: UserInGroup[];
    requestState: string;
}

const defaultState: UserInGroupState[]=[
    // {
    //     id: -1,
    //     name: '',
    //     total: -1,
    //     color: '',
    //     owingArr: [],
    //     groups: []
    // }
];

export const userInGroup = (state: UserInGroupState[] = defaultState, action: any) => { 
    switch (action.type) {
        case userConstants.GET_USERS_IN_GROUP_REQUEST:
            return {
                ...state,
                requestState: 'requesting'
            };

        case userConstants.GET_USERS_IN_GROUP_SUCCESS:{
            return {
                ...action.payload,
                requestState: 'success'
            };
        }
            

        case userConstants.GET_USERS_IN_GROUP_FAILURE:
            return { state, requestState:'failure' };
        default:
            return { ...state };
    }
};