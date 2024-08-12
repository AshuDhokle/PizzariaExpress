
import {Select, MenuItem,InputLabel, FormControl} from '@mui/material'
import {useSelector} from 'react-redux'
import AddAddress from '../AddAddress/AddAddress';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { selectUser } from '../../features/user/userSlice';
export const SelectAddress = ({deliveryAddress,setDeliveryAddress}) =>{
  const user = useSelector(selectUser)
  const [addresses,setAddresses] = useState([]);
    
    useEffect(()=>{
      const fetchAddresses = async()=>{
        try {
          const response = await axios.get('http://localhost:3000/api/user/update/getAllAddress',{params: {id:user._id}}) 
          if(response){
            setAddresses(response.data)  
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchAddresses();
    },[])

    const handleChange = (e) =>{
      setDeliveryAddress(e.target.value)
    }
    return(
      <div className='my-4 flex flex-col items-center justify-center'>
        <FormControl sx={{m:2}}>
          <InputLabel id="address">Address</InputLabel>
            <Select
             labelId="address"
             id='address' 
             label='Address'
             value={deliveryAddress}
             onChange={handleChange}
             sx={{width:300,color:'black'}}
            >
            {addresses && addresses.length > 0 &&
              addresses.map((address,idx)=>(
                <MenuItem key={idx} value={address}>{address.address}</MenuItem>
              ))
            }
            </Select> 
          </FormControl>
        <AddAddress/>
      </div>
    )
  }