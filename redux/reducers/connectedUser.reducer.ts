import { IUser } from "../../objectTypes/user";

export interface IConnectedUserState {
    value: IUser;
    requestState: string;
}

const defaultState: IConnectedUserState ={
    value: {
        id: '-MS3Vc-PX4CZzmfVi9hO',
        name: 'Alexis',
        email: 'alexis@email.com',
        total: 0,
        color: 'green',
        owingArr: [{ user:'-MS3VYXs7TTA5oSadrcA', owing:0}],
        groups: ['-MS3W5LMXAwk9nqRl0Dc']
    },
    requestState: 'success'
}

export const connectedUser = (state: IConnectedUserState = defaultState, action: any) => { 
    switch (action.type) {
        default:
            return { ...state };
    }
};