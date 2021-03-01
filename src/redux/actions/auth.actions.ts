import firebase from "firebase";
import { authContants } from "../constants/auth.constants";
const axios = require('axios').default;

export const login = (credential: firebase.auth.OAuthCredential)=>{
    
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

    const requestURL = '/api/auth/facebook';
    console.log(credential.toJSON());
    return async (dispatch: any) => {
        dispatch(request());
        return await axios.post(requestURL, {
            credential: credential.toJSON()
          })
          .then((res: { data: any; }) => {
            console.log(res.data);
            dispatch(success(res.data));
            })
            .catch((res: any) => {
                dispatch(failure(res))
            });
    }
}