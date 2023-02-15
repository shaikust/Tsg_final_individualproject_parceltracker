import React from 'react';
import { Link} from 'react-router-dom';
import { Nav, NavBtn, NavLink, NavMenu } from '../../components/Navbar/NavbarElements';
import Button from '@mui/material/Button';
import './Home.css';

const Home = () => {
  const Logout=()=>{
    sessionStorage.clear();
    window.location.href ='http://localhost:3000/login';
  };
    return (
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
      </Nav>
            <div className="container-fluid text-center" >
                <div className='main'>
             <div className='admin'>
            <h2>Welcome to Parcel Tracker</h2>
        </div>
        <div className="col-sm-2 sidenav">
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed"
                type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree"
                 aria-expanded="false" aria-controls="collapseThree">
                  Menu
                </button>
              </h2>
              <div id="collapseThree"
              className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                 {/* <div >
          <Link to='/parceltracker'>
            Track Parcel

          </Link>
          </div> */}
          <div >
          <Link to='/admin'>
            ParcelList

          </Link>
          </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
    </div>
        </>
    );
};
export default Home;
