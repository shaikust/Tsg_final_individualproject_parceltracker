import React from 'react';
import { Button } from '@mui/material';

import { Nav, NavMenu, NavBtn, NavBtnLink, NavLink } from './NavbarElements';

const UserNavbar=()=>{
    const Logout=()=>{
        sessionStorage.clear();
        window.location.href ='http://localhost:3000/login';
    };
    return(
        <>
         <Nav>
            <NavMenu>
            <NavLink to='/userabout' >
            About
          </NavLink>
          <NavLink to='/usercontact' >
            contact Us
          </NavLink>
            </NavMenu>
            <NavBtn>
          <Button variant="contained" type="button" onClick={Logout}>Logout</Button>
        </NavBtn>
        <NavBtn>
          <NavBtnLink to='/userhome'>Back</NavBtnLink>
        </NavBtn>

        </Nav>
        </>

    );
};
export default UserNavbar;