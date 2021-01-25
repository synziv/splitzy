import { itemsConstants } from "../constants/items.constants";

export const getItems = ()=>{
    const request = () => ({ type: itemsConstants.GET_ITEMS_REQUEST });

    const success = (usersInGroup: any) => {
        return{
          type: itemsConstants.GET_ITEMS_SUCCESS,
          payload: usersInGroup,
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