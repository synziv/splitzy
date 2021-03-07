import { userConstants } from "../constants/user.constants";
import { firebaseInstance } from "../../utils/firebase";
const axios = require('axios').default;

export const getUsersInGroup = (groupId: string)=>{
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

    const requestURL = '/api/group';

    return async (dispatch: any) => {
        dispatch(request());
        await axios.get(requestURL, {
            params:{
                groupId: groupId
            }
        })
        .then((res: any) => {
            dispatch(success(res.data));
        })
        .catch((res: any) => {
            dispatch(failure(res))
        });
    }
}
export const getConnectedUser = (tokenId: string)=>{
    const request = () => ({ type: userConstants.GET_CONNECTED_USER_REQUEST });

    const success = (res: any) => {
        return{
          type: userConstants.GET_CONNECTED_USER_SUCCESS,
          payload: res.data,
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
            url: requestURL,
            params: {
              tokenId: tokenId,
              method: 'getConnectedUser'
            }
        })
        .then((res: any) => {
                dispatch(success(res));
            })
            .catch((res: any) => {
                firebaseInstance.auth().signOut();
                dispatch(failure(res))
            });
    }
} 