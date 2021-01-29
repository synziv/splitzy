import { IUser } from "../../objectTypes/user";
import { authContants } from "../constants/auth.constants";

export interface IConnectedUserState {
    value: IUser;
    requestState: string;
}

export const defaultConnectedUserState: IConnectedUserState ={
    value: null,/*{
        id: '-MS3Vc-PX4CZzmfVi9hO',
        name: 'Alexis',
        email: 'alexis@email.com',
        total: 0,
        color: 'green',
        owingArr: [{ user:'-MS3VYXs7TTA5oSadrcA', owing:0}],
        groups: ['-MS3W5LMXAwk9nqRl0Dc']
    },*/
    requestState: 'success'
}

export const connectedUser = (state: IConnectedUserState = defaultConnectedUserState, action: any) => { 
    switch (action.type) {
        case authContants.LOGIN_REQUEST:
            return {
                ...state,
                requestState: 'requesting'
            };

        case authContants.LOGIN_SUCCESS:{
            console.log(action.payload);
            return {
                values: {...action.payload},
                requestState: 'success'
            };
        }
            

        case authContants.LOGIN_FAILURE:
            return { state, requestState:'failure' };
        // case itemsConstants.ADD_ITEM_SUCCESS:
        // case itemsConstants.ADD_ITEM_FAILURE:
        // case itemsConstants.ADD_ITEM_REQUEST:
        default:
            return { ...state };
    }
};