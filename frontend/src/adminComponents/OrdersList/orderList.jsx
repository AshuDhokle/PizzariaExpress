import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ReactLoading from 'react-loading';

import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { UserDetails } from './UserDetails';
import { OrdersDetails } from './orderDetails';
import { DeliveryDetails } from './deliveryDetails';
const OrderList = ({value,idx}) => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Axios.get('http://localhost:3000/api/admin/order/orderList');
        setOrderList(response.data);
        console.log(response.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    value === idx &&(

    <div className=' m-4 flex flex-col items-center justify-center  '>
      {loading ? (
        <ReactLoading type='spin' color='blue' height={200} width={200} />
      )
       :
        ( 
          <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                User
              </TableCell>
              <TableCell>
                Order Details
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((order,idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell ><UserDetails name={order.name} email={order.email} userId={order.userId}/></TableCell>
                    <TableCell ><OrdersDetails createdAt={order.createdAt} amount={order.orderAmount} items={order.orderItems} shipping={order.shippingAddress}/></TableCell>
                    <TableCell ><DeliveryDetails delivered={order.isDelivered}/></TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
        )   
      }
      
    </div>
  )

  );
};


export default OrderList;


