import { groupsConstants } from "../constants/group.constants";
import { userConstants } from "../constants/user.constants";
const axios = require('axios').default;

export const addGroup =(group: any) =>{
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
        .then((res: { data: any; }) => {
            dispatch(success(res));
            dispatch({
                type: userConstants.GET_CONNECTED_USER_SUCCESS,
                payload: res.data,
            })
        })
        .catch((res: any) =>{ 
            dispatch(failure(res))
        });
            
    }
}