import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import About from '../../pages/About/About';
import Userabout from '../../pages/About/Userabout';
import Addparcel from '../../pages/Addparcel/Addparcel';
import Admin from '../../pages/Admin/Admin';
import Contact from '../../pages/Contact/Contact';
import Usercontact from '../../pages/Contact/Usercontact';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import Tracker from '../../pages/Tracker/Tracker';
import Update from '../../pages/Update/Update';
import Userhome from '../../pages/Userhome/Userhome';
const AppRoutes = () => {
     const role = sessionStorage.getItem('role');
    return (
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/adminhome' element={role==='ROLE_ADMIN'?<Home />:<Navigate to='/login'/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/about' element={role==='ROLE_ADMIN'?<About/>:<Navigate to='/login'/>}/>
            <Route path='/contact' element={role==='ROLE_ADMIN'?<Contact/>:<Navigate to='/login'/>}/>
            <Route path='/parceltracker' element={role==='ROLE_USER'?<Tracker/>:<Navigate to='/login'/>}/>
            <Route path='/admin' element={role==='ROLE_ADMIN'?<Admin/>:<Navigate to='/login'/>}/>
            <Route path='/addparcel' element={role==='ROLE_ADMIN'?<Addparcel/>:<Navigate to='/login'/>}/>
            <Route path='/userhome' element={role==='ROLE_USER'?<Userhome/>:<Navigate to='/login'/>}/>
            <Route path='update' element={role==='ROLE_ADMIN'?<Update/>:<Navigate to='/login'/>}/>
            <Route path='/userabout' element={role==='ROLE_USER'?<Userabout/>:<Navigate to='/login'/>}/>
            <Route path='/usercontact' element={role==='ROLE_USER'?<Usercontact/>:<Navigate to='/login'/>}/>
        </Routes>
    );
};

export default AppRoutes;
