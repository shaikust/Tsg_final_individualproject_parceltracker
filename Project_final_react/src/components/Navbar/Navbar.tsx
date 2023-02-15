import React from 'react';
import { Button } from '@mui/material';

import { Nav, NavMenu, NavBtn, NavBtnLink, NavLink } from './NavbarElements';

const Navbar=()=>{
    const Logout=()=>{
        sessionStorage.clear();
        window.location.href ='http://localhost:3000/login';
    };
    return(
        <>
         <Nav>
            <NavMenu>
            <NavLink to='/about' >
            About
          </NavLink>
          <NavLink to='/contact' >
            contact Us
          </NavLink>
            </NavMenu>
            <NavBtn>
          <Button variant="contained" type="button" onClick={Logout}>Logout</Button>
        </NavBtn>
        <NavBtn>
          <NavBtnLink to='/adminhome'>Back</NavBtnLink>
        </NavBtn>

        </Nav>
        </>

    );
};
export default Navbar;