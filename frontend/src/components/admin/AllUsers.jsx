import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';

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
const AllUsers = () => {
   const [allUsers, setAllUser] = useState([])

   const getAllUsers = async () => {
      try {
         await axios.get('http://localhost:8001/api/admin/getallusers', {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
         })
            .then((res) => {
               if (res.data.success) {
                  setAllUser(res.data.data)
               }
            }).catch((err) => {
               console.log(err)
            })
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getAllUsers()
   }, [])

   const deleteUser = async (userId) => {
      let assure = window.confirm("are you sure to delete")
      if (assure) {
         try {
            const response = await axios.delete(`http://localhost:8001/api/admin/deleteuser/${userId}`, {
               headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            if (response.data.success) {
               alert(response.data.message);
               getAllUsers();
            } else {
               alert(response.data.message);
            }
         } catch (error) {
            console.log(error);
         }
      }
   }

   return (
      <TableContainer className='my-5' component={Paper}>
         <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
               <TableRow>
                  <StyledTableCell>User ID</StyledTableCell>
                  <StyledTableCell align="center">User Name</StyledTableCell>
                  <StyledTableCell align="center">User Email</StyledTableCell>
                  <StyledTableCell align="center">User Type</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {allUsers.map((user) => (
                  <StyledTableRow key={user._id}>
                     <StyledTableCell component="th" scope="row">
                        {user._id}
                     </StyledTableCell>
                     <StyledTableCell align="center">{user.name}</StyledTableCell>
                     <StyledTableCell align="center">{user.email}</StyledTableCell>
                     <StyledTableCell align="center">{user.type}</StyledTableCell>
                     <StyledTableCell align="center">
                        <Button onClick={() => deleteUser(user._id)} variant="outlined" color="error">
                           Delete
                        </Button>

                     </StyledTableCell>
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>

   )
}

export default AllUsers

