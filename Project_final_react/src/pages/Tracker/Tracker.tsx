import UserNavbar from '../../components/Navbar/UserNavbar';
import React, { useState } from 'react';
import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Tracker.css';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState, useAppThunkDispatch } from '../../redux/store';
import { viewApi } from '../../redux/actions/authorization';
import Tabledata from '../../components/Table/Tabledata';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const Tracker=()=>{
    const [trackingid,setTrackingid]=useState('');
    const dispatch = useAppThunkDispatch();
    // const [data ,setData]=useState([]);
    const data = useSelector((state: AppState) => state.view);
    // eslint-disable-next-line no-console
    console.log('Data',data);
    const getParcel=(e:any)=>{
        e.preventDefault();
        dispatch(viewApi({
            trackingid

        }));

    };
    return(
        <>
        {<UserNavbar/>}
        <form onSubmit={getParcel}>
        <div className='input'>
        <div className='tracker'>
        <h1>Track Your Parcel Here</h1>
        </div>
            Enter tracking id<br>
            </br>
            <Box
               sx={{
                 marginLeft:70,
                 width: 500,
                 maxWidth: '100%',
              }}
    >
             <TextField fullWidth label="Trackingid" id="id" required onChange={e =>setTrackingid(e.target.value)}/>
           </Box>
           <Button variant="contained" type="submit"  >Search</Button>
           <div>
           </div>
           <Tabledata data={data}/>

           </div>
           </form>

        </>
    );

};
export default Tracker;