import { AnyAction } from 'redux';
import { LOGIN } from '../actions/types';
import { AppState } from '../store';

export interface ILoginReducer{
    response:string
}
export const loginReducerInit:ILoginReducer={
    response:''
};
const loginReducer=(state =loginReducerInit, action : AnyAction):AppState=>{
    switch(action.type){
        case LOGIN:
            return action.payload;
    }
    return state;
};
export default loginReducer;
