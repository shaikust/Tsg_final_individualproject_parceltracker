import { AppState } from './../store';
import { REGISTER } from './../actions/types';
import { AnyAction } from 'redux';

export interface IUserReducer {
    response:string
}

export const userReducerInit: IUserReducer = {
  response:''
};
const userReducer = (state = userReducerInit, action: AnyAction): AppState => {
    switch (action.type) {
        case REGISTER:
            return action.payload;
    }
    return state;
};
export default userReducer ;