import React from 'react';
import { Button } from '@mui/material';
import { Nav, NavBtn, NavBtnLink, NavLink, NavMenu } from '../../components/Navbar/NavbarElements';
import './About.css';
import ErrorBoundary from '../../components/error-boundary/error-boundary';
import Navbar from '../../components/Navbar/Navbar';
const About=()=>{

    return(
        <>
                {<Navbar/>}

        <div className='about'>
            <h3>About Us</h3>
            <div className='text'>
            <p>You have multiple tracking numbers,
                 different logistics providers, looking for regular track event updates? We have you covered.</p>
             <p>Allow us to take out the complexity of tracing your shipments across different carriers.</p>
             <p> We provide you with an easy-to-use overview of your parcel tracking,
                 translations & regular updates - simple and convenient!</p>
            </div>
            <div className='text2'>
            Track & trace your parcels any time & get continuous updates
            </div>

        </div>
        </>

    );

};
export default About;