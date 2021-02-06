import { IUser, User } from "../../entity/user";
import { authContants } from "../constants/auth.constants";
import { userConstants } from "../constants/user.constants";
import { userInGroup } from "./userInGroup.reducer";

export interface IConnectedUserState {
    value: IUser;
    requestState: string;
}

export const defaultConnectedUserState: IConnectedUserState ={
    value: new User({id: '', name: '', email: ''}),
    requestState: 'empty'
}

export const connectedUser = (state: IConnectedUserState = defaultConnectedUserState, action: any) => { 
    switch (action.type) {
        case authContants.LOGIN_REQUEST:
        case userConstants.GET_CONNECTED_USER_REQUEST:
            return {
                ...state,
                requestState: 'requesting'
            };

        case authContants.LOGIN_SUCCESS:
        case userConstants.GET_CONNECTED_USER_SUCCESS:{
            return {
                value: {...action.payload},
                requestState: 'success'
            };
        }
            

        case authContants.LOGIN_FAILURE:
        case userConstants.GET_CONNECTED_USER_FAILURE:
            return { state, requestState:'failure' };
        // case itemsConstants.ADD_ITEM_SUCCESS:
        // case itemsConstants.ADD_ITEM_FAILURE:
        // case itemsConstants.ADD_ITEM_REQUEST:
        default:
            return { ...state };
    }
};