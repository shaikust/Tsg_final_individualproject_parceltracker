/* eslint-disable react/jsx-key */
import Navbar from '../../components/Navbar/Navbar';
import React from 'react';
import { Button, ButtonGroup, Paper, styled, Table, TableBody,
 TableCell, tableCellClasses, TableContainer, TableHead, TableRow }
 from '@mui/material';
import { AppState, useAppThunkDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { parcelApi } from '../../redux/actions/authorization';
import Parceltable from '../../components/Table/Parceltable';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
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
const Admin=()=>{
    const dispatch = useAppThunkDispatch();
    const data = useSelector((state: AppState) => state.parcel);
    // eslint-disable-next-line no-console
    console.log(data.parcelList);
    const getParcel=(e:any)=>{
        e.preventDefault();
        dispatch(parcelApi());
    };
    const addParcel=(e:any)=>{
         e.preventDefault();
        window.location.href ='http://localhost:3000/addparcel';
    };
    const updateParcel=(e:any)=>{
      e.preventDefault();
      window.location.href ='http://localhost:3000/update';
  };
    return(
        <>
        {<Navbar/>}
        <div className="container-fluid text-center">
        <div className='input'>
        <div className='tracker'>
        <h1>Track Your Parcel Here</h1>
        </div>
           <Button variant="contained" type="button" onClick={getParcel}>ParcelList</Button>&nbsp;
           <Button variant="contained" type="button" onClick={updateParcel}>Updateparcel</Button>&nbsp;
           <Button variant="contained" type="button" onClick={addParcel}>AddParcel</Button>
        <div>
            <Parceltable data={data.parcelList}/>
        </div>

        </div>
        </div>
        </>

    );
};
export default Admin;