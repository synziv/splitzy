import { authContants } from "../constants/auth.constants";
const axios = require('axios').default;

export const login = (credential)=>{
    
    const request = () => ({ type: authContants.LOGIN_REQUEST });
    const success = (connectedUser: any) => {
        return{
          type: authContants.LOGIN_SUCCESS,
          payload: connectedUser,
        }
    }
    const failure = (response: any) => {
        return{
          type: authContants.LOGIN_FAILURE,
          errors: response,
        }
    };

    const requestURL = '/api/auth';

    return async (dispatch: any) => {
        dispatch(request());
        return await axios.get(requestURL, {
            params: {
                credential: credential
            }
          })
          .then(res => {
            dispatch(success(res.data));
            })
            .catch((res) => {
                dispatch(failure(res))
            });
    }
}