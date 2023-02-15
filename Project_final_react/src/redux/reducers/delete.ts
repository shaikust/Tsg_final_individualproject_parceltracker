import { DELETE } from './../actions/types';
import { AnyAction } from "redux";
import { AppState } from "../store";

export interface IDeleteReducer {
    response:string;
}

export const commonReducerInit: IDeleteReducer = {
    response:''
};

const deleteReducer = (state = commonReducerInit, action: AnyAction): AppState => {
    switch (action.type) {
        case DELETE:
            return action.payload;
    }
    return state;
};

export default deleteReducer;
