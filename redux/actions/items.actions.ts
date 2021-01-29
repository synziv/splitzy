import { itemsConstants } from "../constants/items.constants";
import { IItem } from "../../objectTypes/item";
import { useDispatch } from 'react-redux'
import { getUsersInGroup } from "./user.actions";
const axios = require('axios').default;
export const getItems = ()=>{
    
    const request = () => ({ type: itemsConstants.GET_ITEMS_REQUEST });
    const success = (items: any) => {
        return{
          type: itemsConstants.GET_ITEMS_SUCCESS,
          payload: items,
        }
    }
    const failure = (response: any) => {
        return{
          type: itemsConstants.GET_ITEMS_FAILURE,
          errors: response,
        }
    };

    const requestURL = '/api/item';

    return async (dispatch: any) => {
        dispatch(request());
        const res = await fetch(requestURL);
        return res.json()
            .then(res => {
                dispatch(success(res));
            })
            .catch((res) =>{ 
                dispatch(failure(res))
            });
    }
}
export const addItem =(item: IItem) =>{
    const request = () => ({ type: itemsConstants.ADD_ITEM_REQUEST });

    const success = (data: any) => {
        return{
          type: itemsConstants.ADD_ITEM_SUCCESS,
          payload: data,
        }
    }
    const failure = (response: any) => {
        return{
          type: itemsConstants.ADD_ITEM_FAILURE,
          errors: response,
        }
    };

    const requestURL = '/api/item';

    return async (dispatch: any) => {
        dispatch(request());
        return await axios.post(requestURL, item)
            .then(res => {
                dispatch(success(res));
                dispatch(getUsersInGroup());
                dispatch(getItems());
            })
            .catch((res) =>{ 
                dispatch(failure(res))
            });
    }
}
export const deleteItem =(id: string) =>{
    const request = () => ({ type: itemsConstants.DELETE_ITEM_REQUEST });

    const success = (data: any) => {
        return{
          type: itemsConstants.DELETE_ITEM_SUCCESS,
          payload: data,
        }
    }
    const failure = (response: any) => {
        return{
          type: itemsConstants.DELETE_ITEM_FAILURE,
          errors: response,
        }
    };

    const requestURL = '/api/item';

    return async (dispatch: any) => {
        dispatch(request());
        console.log(id.toString());
        return await axios({
            method: 'delete',
            url: requestURL,
            data: {
                id: id
            }
        })
            .then(res => {
                dispatch(success(res));
                dispatch(getUsersInGroup());
                dispatch(getItems());
            })
            .catch((res) =>{ 
                dispatch(failure(res))
            });
    }
}