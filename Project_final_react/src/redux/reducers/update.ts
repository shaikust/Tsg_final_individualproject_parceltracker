import { UPDATE } from './../actions/types';
import { AnyAction } from "redux";
import { AppState } from "../store";

export interface IUpdateReducer {
    response:string;
};
export const commonReducerInit: IUpdateReducer = {
    response:''
};

const updateReducer = (state = commonReducerInit, action: AnyAction): AppState => {
    switch (action.type) {
        case UPDATE:
            return action.payload
    }
    return state;
};

export default updateReducer;
