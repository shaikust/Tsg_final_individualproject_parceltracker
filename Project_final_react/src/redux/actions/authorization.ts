import axios from '../../utils/interceptors';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { handleError } from '../../utils/handle-error';
import { PARCEL, VIEW, ADDPARCEL, DELETE, UPDATE } from './types';
import { toast } from 'react-toastify';

export const viewApi = (data:any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        const response = await axios.get(`http://localhost:8080/admin-user-controller/parcel/${data.trackingid}`);
        dispatch({
            type: VIEW,
            payload: response.data,
        });
        // eslint-disable-next-line no-console
         console.log(response.data);
        return response.data;
    } catch (err: any) {
        handleError(err);
        toast.error('Tracking id is not valid',{
                     position: 'top-right',            
                     autoClose: 5001,
                     hideProgressBar: false,
                     closeOnClick: true,            
                     pauseOnHover: true,           
                     draggable: true,            
                     progress: 1,           
                     theme: 'dark',
                     onClose: () => {
                        window.location.href = 'http://localhost:3000/parceltracker';
                      } 
                    });
    }
};

export const parcelApi = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        const response = await axios.get('http://localhost:8080/admin-user-controller/parcel');
        dispatch({
            type: PARCEL,
            payload: response.data,
        });
        // eslint-disable-next-line no-console
        //  console.log(response);
        return response.data;
    } catch (err: any) {
        handleError(err);
    }
};

export const AddparcelApi = (data:any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        const response = await axios.post('http://localhost:8080/admin-user-controller/parcel',{
            senderLocation:data.senderLocation,
            receiverLocation:data.receiverLocation,
            deliveryStatus:data.deliveryStatus,
            createdBy:data.createdBy

        });
        dispatch({
            type: ADDPARCEL,
            payload: response.data,
        });
        // eslint-disable-next-line no-console
          console.log(response);
          if(response.status===200){
            toast.success(response.data,{
                         position: 'top-right',            
                         autoClose: 5001,
                         hideProgressBar: false,
                         closeOnClick: true,            
                         pauseOnHover: true,           
                         draggable: true,            
                         progress: 1,           
                         theme: 'dark',
                         onClose: () => {
                            window.location.href = 'http://localhost:3000/addparcel';
                          }  
                        }
                        );
            
          }
        return response.data;
    } catch (err: any) {
        handleError(err);
    } 
};

export const deleteApi = (data:any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        console.log(data);
        const response = await axios.delete(`http://localhost:8080/admin-user-controller/parcel/${data.id}`);
        dispatch({
            type: DELETE,
            payload: response.data,
        });
        if(response.status===200){
            toast.success(response.data,{
                         position: 'top-right',            
                         autoClose: 5001,
                         hideProgressBar: false,
                         closeOnClick: true,            
                         pauseOnHover: true,           
                         draggable: true,            
                         progress: 1,           
                         theme: 'dark',
                         onClose: () => {
                            window.location.href = 'http://localhost:3000/admin';
                          }  
                        });
            
          }
        return response.data.data;
    } catch (err: any) {
        handleError(err);
        toast.error(' failed to delete',{
                     position: 'top-right',            
                     autoClose: 5001,
                     hideProgressBar: false,
                     closeOnClick: true,            
                     pauseOnHover: true,           
                     draggable: true,            
                     progress: 1,           
                     theme: 'dark', 
                    });
    }
};
export const updateApi = (data:any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        const response = await axios.put(`http://localhost:8080/admin-user-controller/parcel/${data.id}`,{
            senderLocation:data.currentLocation,
            deliveryStatus:data.deliveryStatus
        });
        dispatch({
            type: UPDATE,
            payload: response.data,
        });
        if(response.status===200){
            toast.success(response.data,{
                         position: 'top-right',            
                         autoClose: 5001,
                         hideProgressBar: false,
                         closeOnClick: true,            
                         pauseOnHover: true,           
                         draggable: true,            
                         progress: 1,           
                         theme: 'dark',
                          onClose: () => {
                            window.location.href = 'http://localhost:3000/update';
                          } 
                        });
          }

        return response.data.data;
    } catch (err: any) {
        handleError(err);
        toast.error(' failed to update',{
                     position: 'top-right',            
                     autoClose: 5001,
                     hideProgressBar: false,
                     closeOnClick: true,            
                     pauseOnHover: true,           
                     draggable: true,            
                     progress: 1,           
                     theme: 'dark', 
                    });
    }
};
