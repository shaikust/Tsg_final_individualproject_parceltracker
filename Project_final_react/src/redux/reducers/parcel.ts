
import { AnyAction } from 'redux';
import { PARCEL } from '../actions/types';
import { AppState } from '../store';

export interface IParcelReducer {
    id: number,
    senderLocation:string,
    receiverLocation:string,
    createdBy:string,
    deliveryStatus:string
}

export interface IParcelReducerInit {
    parcelList: IParcelReducer[]
}


export const commonReducerInit: IParcelReducer = {
    id:0,
    senderLocation:'',
    receiverLocation:'',
    createdBy:'',
    deliveryStatus:''
};

const parcelReducer = (state = commonReducerInit, action: AnyAction): AppState => {
    switch (action.type) {
        case PARCEL:
            return {
                parcelList: action.payload
            };
    }
    return state;
};

export default parcelReducer;
