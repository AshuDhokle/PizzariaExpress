import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ReactLoading from 'react-loading';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
const UserList = ({value,idx}) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Axios.get('http://localhost:3000/api/admin/users');
        setUserList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
      value === idx && (

    <div className='overflow-x-auto'>
      {loading ? (
        <ReactLoading type='spin' color='blue' height={200} width={200} />
      ) : (
        <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell>
                Phone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user,idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell >{user.name}</TableCell>
                    <TableCell >{user.email}</TableCell>
                    <TableCell >{user.phone}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      )}
    </div>
      )

  );
};

export default UserList;
