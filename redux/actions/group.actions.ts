import { IItem } from "../../objectTypes/item";
import { useDispatch } from 'react-redux'
import { getUsersInGroup } from "./user.actions";
import { groupsConstants } from "../constants/group.constants";
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
            console.log('success')
            dispatch(success(res));
        })
        .catch((res) =>{ 
            dispatch(failure(res))
        });
            
    }
}