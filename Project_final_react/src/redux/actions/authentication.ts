import axios from 'axios';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { AnyAction } from 'redux';
import { handleError } from '../../utils/handle-error';
import {  REGISTER, LOGIN } from './types';
// import 'react-toastify/dist/ReactToastify.css';

export const RegisterApi = (data:any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        // eslint-disable-next-line no-console
        console.log('Data ',data);
        const response = await axios.post('http://localhost:8080/controller/register',{
            email:data.email,
            name:data.name,
            password:data.password,
            phone:data.phone

        });
        dispatch({
            type:REGISTER ,
            payload: response.data
        });
        // eslint-disable-next-line no-console
        console.log('pay',response.data);
        if(response.data==='user registered successfully'){
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
                            window.location.href = 'http://localhost:3000/login';
                          }  
                        });
        }else{
            toast.error(response.data,{
                         position: 'top-right',            
                         autoClose: 5001,
                         hideProgressBar: false,
                         closeOnClick: true,            
                         pauseOnHover: true,           
                         draggable: true,            
                         progress: 1,           
                         theme: 'dark',
                         onClose: () => {
                            window.location.href = 'http://localhost:3000/register';
                          }  
                        });
        }
    } catch (err: any) {
        handleError(err);
        toast.error(' login is failed',{
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

export const LoginApi = (data:any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        const response = await axios.post('http://localhost:8080/controller/login',{
            email:data.email,
            password:data.password
        });
        dispatch({
            type: LOGIN,
            payload: response.data
        });
        // eslint-disable-next-line no-console
        // console.log('pay',response.data.role);
        // if(response.status===200){
        //     alert('Success');
        //     sessionStorage.setItem('accesstoken',response.data.accessToken);
        //     window.location.href ='http://localhost:3000/home';
        // }else {
        //     alert('Incorrect username or password');
        // }
        if(response.data.role==='ROLE_ADMIN'){
            // alert('Admin login is success')
            sessionStorage.setItem('accesstoken',response.data.accessToken);
            sessionStorage.setItem('role',response.data.role);
            toast.success('Admin login is success',{
                         position: 'top-right',            
                         autoClose: 5001,
                         hideProgressBar: false,
                         closeOnClick: true,            
                         pauseOnHover: true,           
                         draggable: true,            
                         progress: 1,           
                         theme: 'dark',  
                        });
             window.location.href ='http://localhost:3000/adminhome';
        }else if(response.data.role==='ROLE_USER'){
            sessionStorage.setItem('accesstoken',response.data.accessToken);
            sessionStorage.setItem('role',response.data.role);
            toast.success('User login is success',{
                         position: 'top-right',            
                         autoClose: 5001,
                         hideProgressBar: false,
                         closeOnClick: true,            
                         pauseOnHover: true,           
                         draggable: true,            
                         progress: 1,           
                         theme: 'dark', 
                        });
             window.location.href ='http://localhost:3000/userhome';
        }else{
            toast.info(' login is failed',{
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
        return response.data;
    } catch (err: any) {
        // handleError(err);
        // eslint-disable-next-line no-console
        console.error(err);
        toast.error(' login is failed',{
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