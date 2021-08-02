import {createStore} from "redux";

const defaultState={
  currentUser:'',
  photos:{}
}

const reducer = (state=defaultState,action)=>{
  let newState;
  switch (action.type) {
    case "setCurrentUser":
      newState = Object.assign({},state)
      newState.currentUser = action.payload.currentUser
      return newState;
    case "setPhotoURL":
      newState = Object.assign({},state)
      newState = action.payload
      return newState;
    default:
      console.log(action);
      return state;
  }
}
const store = createStore(reducer)
export default store;