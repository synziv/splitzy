import { UserInGroupState } from "./userInGroup.reducer";
import { combineReducers } from 'redux';
import {userInGroup} from './userInGroup.reducer';
import {items} from './items.reducer';
import { ItemsState } from "./items.reducer";

const initialState = {
    //connectedUser:{},
    userInGroup: [],
    items: []
  };
export interface State{
  userInGroup: UserInGroupState;
  items: ItemsState;
}
const appReducer = combineReducers({
  userInGroup,
  items
});

  function rootReducer(state= initialState, action) {
    return appReducer(state, action);
  };



export default rootReducer;