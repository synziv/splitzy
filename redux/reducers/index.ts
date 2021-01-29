import { UserInGroupState } from "./userInGroup.reducer";
import { combineReducers } from 'redux';
import {userInGroup} from './userInGroup.reducer';
import {items} from './items.reducer';
import {connectedUser, defaultConnectedUserState, IConnectedUserState} from './connectedUser.reducer';
import { ItemsState } from "./items.reducer";

const initialState: State = {
    connectedUser:{
      value: {},
      requestState: ''
    },
    userInGroup: {
      values: [],
      requestState: ''
    },
    items: {
      values: [],
      requestState: ''
    },
  };
export interface State{
  userInGroup: UserInGroupState;
  items: ItemsState;
  connectedUser: IConnectedUserState;
}
const appReducer = combineReducers({
  userInGroup,
  items,
  connectedUser
});

  function rootReducer(state:State= initialState, action) {
    return appReducer(state, action);
  };



export default rootReducer;