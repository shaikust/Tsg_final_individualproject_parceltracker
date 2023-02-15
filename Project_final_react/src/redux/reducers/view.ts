import { VIEW } from './../actions/types';
import { AnyAction } from 'redux';
import { AppState } from '../store';

export interface IViewReducer {
    id:number;
    currentLocation:string;
    parcel: {
        id: number,
        senderLocation:string,
        receiverLocation:string,
        createdBy:string,
        deliveryStatus:string
    }

}

export const commonReducerInit: IViewReducer = {
   id:0,
   currentLocation:'',
   parcel:{
       id:0,
       senderLocation:'',
       receiverLocation:'',
       createdBy:'',
       deliveryStatus:''
   }
};

const viewReducer = (state = commonReducerInit, action: AnyAction): AppState => {
    switch (action.type) {
        case VIEW:
            return action.payload;
    }
    return state;
};

export default viewReducer;