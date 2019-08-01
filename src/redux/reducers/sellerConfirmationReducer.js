import { combineReducers } from "redux";

const buyerInfo = (state = {}, action) => {
  //reducer to store the buyer info on seller receive offer page
  switch (action.type) {
    case 'SET_BUYER_INFO':
      return action.payload;
    default:
      return state;
  }
};

const sellerInfo = (state = {}, action) => {
  //reducer to store the buyer info on seller receive offer page
  switch (action.type) {
    case 'SET_SELLER_INFO':
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  buyerInfo,
  sellerInfo,
});