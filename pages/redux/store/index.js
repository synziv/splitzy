import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
const asyncFunctionMiddleware = storeAPI => next => action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
      // then call the function and pass `dispatch` and `getState` as arguments
      return action(storeAPI.dispatch, storeAPI.getState)
    }
  
    // Otherwise, it's a normal action - send it onwards
    return next(action)
}

const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware);
const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

export default store;