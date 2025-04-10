import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from 'react-loading';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import Row from './Row';
const PizzaList = ({ value, idx }) => {
  const [pizzaList, setPizzaList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {  
        const response = await axios.get(`https://pizzaria-express-six.vercel.app/api/admin/pizza`);
        setPizzaList(response.data);
      } catch (error) {
        console.error('Error fetching pizza data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      {
        value === idx && (
          <div className='h-full flex flex-col items-center justify-center z-0 animate-fade-in' >
            {loading ? (
              <Loading type='spin' color='#6DE1D2' height={100} width={100} />
            ) : (
              <TableContainer>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell component="th" scope="row">Item</TableCell>
                      <TableCell align="left">Edit</TableCell>
                      <TableCell align="">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      pizzaList.map((pizza, idx) => (
                        <Row key={idx} pizza={pizza} />
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        )
      }
    </>
  );
};

export default PizzaList;
