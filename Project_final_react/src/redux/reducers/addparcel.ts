import { AnyAction } from 'redux';
import { ADDPARCEL } from '../actions/types';
import { AppState } from '../store';

export interface IAddparcelReducer {
    response:string
    
}

export const commonReducerInit: IAddparcelReducer = {
   response:''
};

const addParcelReducer = (state = commonReducerInit, action: AnyAction): AppState => {
    switch(action.type){
        case ADDPARCEL:
            return action.payload;
    }
    return state;
};

export default addParcelReducer;