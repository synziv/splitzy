import { userConstants } from "../constants/user.constants";
const axios = require('axios').default;

export const getUsersInGroup = ()=>{
    const request = () => ({ type: userConstants.GET_USERS_IN_GROUP_REQUEST });

    const success = (usersInGroup: any) => {
        return{
          type: userConstants.GET_USERS_IN_GROUP_SUCCESS,
          payload: usersInGroup,
        }
    }
    const failure = (response: any) => {
        return{
          type: userConstants.GET_USERS_IN_GROUP_FAILURE,
          errors: response,
        }
    };

    const requestURL = '/api/user';

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
export const getConnectedUser = (tokenId)=>{
    const request = () => ({ type: userConstants.GET_CONNECTED_USER_REQUEST });

    const success = (usersInGroup: any) => {
        return{
          type: userConstants.GET_CONNECTED_USER_SUCCESS,
          payload: usersInGroup,
        }
    }
    const failure = (response: any) => {
        return{
          type: userConstants.GET_USERS_IN_GROUP_FAILURE,
          errors: response,
        }
    };

    const requestURL = '/api/user';

    return async (dispatch: any) => {
        dispatch(request());
        axios({
            method: 'get',
            url: '/api/group',
            data: {
              tokenId: tokenId,
              method: 'getConnectedUser'
            }
        })
            .then(res => {
                dispatch(success(res));
            })
            .catch((res) =>{ 
                dispatch(failure(res))
            });
    }
} 