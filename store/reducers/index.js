import { combineReducers } from 'redux';
import { userReducer } from '@store/slices/auth';
import { cartReducer } from '@store/slices/cart';
import { commonReducer } from '@store/slices/common';

const rootReducer = combineReducers({
  common: commonReducer,
  user: userReducer,
  cart: cartReducer

});

export default rootReducer;