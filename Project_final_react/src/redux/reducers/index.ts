import { combineReducers } from 'redux';
import addParcelReducer from './addparcel';
import commonReducer from './common';
import deleteReducer from './delete';
import loginReducer from './login';
import parcelReducer from './parcel';
import updateReducer from './update';
import userReducer from './user';
import viewReducer from './view';

const RootReducer: any = combineReducers({
    common: commonReducer,
    user:userReducer,
    login:loginReducer,
    view:viewReducer,
    parcel:parcelReducer,
    addparcel:addParcelReducer,
    deleteparcel:deleteReducer,
    updateparcel:updateReducer
});

export default RootReducer;
