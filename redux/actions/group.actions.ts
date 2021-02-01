import { IItem } from "../../objectTypes/item";
import { useDispatch } from 'react-redux'
import { getUsersInGroup } from "./user.actions";
import { groupsConstants } from "../constants/group.constants";
import { userConstants } from "../constants/user.constants";
const axios = require('axios').default;

export const addGroup =(group) =>{
    console.log(group);
    const request = () => ({ type: groupsConstants.ADD_GROUP_REQUEST });

    const success = (data: any) => {
        return{
          type: groupsConstants.ADD_GROUP_SUCCESS,
          payload: data,
        }
    }
    const failure = (response: any) => {
        return{
          type: groupsConstants.ADD_GROUP_FAILURE,
          errors: response,
        }
    };

    const requestURL = '/api/group';

    return async (dispatch: any) => {
        dispatch(request());
        axios({
            method: 'post',
            url: '/api/group',
            data: {
              ...group
            }
        })
        .then(res => {
            dispatch(success(res));
            dispatch({
                type: userConstants.GET_CONNECTED_USER_SUCCESS,
                payload: res.data,
            })
        })
        .catch((res) =>{ 
            dispatch(failure(res))
        });
            
    }
}