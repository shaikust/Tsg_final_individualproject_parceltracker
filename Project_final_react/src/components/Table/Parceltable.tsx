/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import React from 'react';
import { useAppThunkDispatch } from '../../redux/store';
import { deleteApi } from '../../redux/actions/authorization';
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

const Parceltable=({data}: any)=>{
    // eslint-disable-next-line no-console
    console.log('Data: ', data);
    const dispatch = useAppThunkDispatch();
    const deleteParcel=(id:number)=>{
      console.log(id);
      dispatch(deleteApi({
        id
      }));
    };
    return(
        <div style={{marginTop:10}}>
             <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ParcelId</StyledTableCell>
            <StyledTableCell align="center">senderLocation</StyledTableCell>
            <StyledTableCell align="center">RecieverLocation</StyledTableCell>
            <StyledTableCell align="center">deliverystatus</StyledTableCell>
            <StyledTableCell align="center">createdby</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
              data?.map((item:any)=>{
                return (
                    <StyledTableRow >
                    <StyledTableCell component="th" scope="row">
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">{item.senderLocation}</StyledTableCell>
                    <StyledTableCell align="center">{item.receiverLocation}</StyledTableCell>
                    <StyledTableCell align="center">{item.deliveryStatus}</StyledTableCell>
                    <StyledTableCell align="center">{item.createdBy}</StyledTableCell>
                    <StyledTableCell align="center">{<ButtonGroup
                                         disableElevation
                                         variant="contained"
                                         aria-label="Disabled elevation buttons">
                                         {/* <Button >update</Button> */}
                                         <Button onClick={()=>deleteParcel(item.id)}>delete</Button>
                   </ButtonGroup>}
                   </StyledTableCell>
                  </StyledTableRow>
                  );
                })
            }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    );
};
export default Parceltable;