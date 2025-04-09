import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {statesAndUnionTerritories} from '../../utils/address.js'
import { MdOutlineAddLocationAlt } from "react-icons/md";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice.js';
const AddAddress = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState({
    cat: '',
    area: '',
    street: '',
    city: '',
    state: '',
    pin: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const addressString = address.street + ', ' + address.area + ', ' + address.city + ', ' + address.state + ', ' + address.pin
    const response = await axios.put('https://pizzaria-express-six.vercel.app/api/user/update/addAddress',{id:user._id ,type:address.cat, address:addressString});
    console.log(response);
    
    handleClose();
  };

  return (
    <div className=' self-center flex flex-row items-center justify-center'>
      
      <MdOutlineAddLocationAlt onClick={handleOpen} className='size-8 text-green-500 cursor-pointer '/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Enter Address
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
            <InputLabel id="type-address-label">Type</InputLabel>
            <Select
             labelId="type-address-label"
             label='Type'
             name="cat"
             value={address.type}
             onChange={handleChange}
            >
              {
                ['Home','Work','Other'].map((item,idx)=>(
                    <MenuItem key={idx} value={item}>{item}</MenuItem>
                ))
              }
            </Select>
            </FormControl>
            <TextField
              label="Area"
              name="area"
              value={address.area}
              onChange={handleChange}
              fullWidth
              
              margin="normal"
            />
            <TextField
              label="Street"
              name="street"
              value={address.street}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={address.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="pin"
              name="pin"
              value={address.pin}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                label='State'
                name="state"
                value={address.state}
                onChange={handleChange}
              >
                {
                  statesAndUnionTerritories.map((state,idx)=>(
                    <MenuItem key={idx} value={state}>{state}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
          
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1
};

export default AddAddress;
