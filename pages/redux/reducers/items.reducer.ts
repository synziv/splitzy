import { itemsConstants } from "../constants/items.constants";

export type IItem={
    name: string;
    total: number;
    user: number;
    splitMode: string | number;
    splitWith: number[];
    groupdId: number;
}
export interface ItemsState {
    values: IItem[];
    requestState: string;
}

const defaultState: ItemsState[]= []

export const items = (state: ItemsState[] = defaultState, action: any) => { 
    switch (action.type) {
        case itemsConstants.GET_ITEMS_REQUEST:
            return {
                ...state,
                requestState: 'requesting'
            };

        case itemsConstants.GET_ITEMS_SUCCESS:{
            return {
                values: [...action.payload],
                requestState: 'success'
            };
        }
            

        case itemsConstants.GET_ITEMS_FAILURE:
            return { state, requestState:'failure' };
        default:
            return { ...state };
    }
};