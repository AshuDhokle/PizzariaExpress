import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import { logout,selectUser } from '../../features/user/userSlice'
import { FaRegCircleUser } from "react-icons/fa6";
import { Button,Menu,MenuItem } from '@mui/material';
export const UserMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleLogout = (e) => {
      e.preventDefault();
      dispatch(logout());
      navigate('/')
    };
    
    const goToProfile = () =>{
      navigate(`/profile/${user._id}`)
    }
    return(
      <div>
        {
            user ? <div>
              <Button onClick={handleClick}>
                <FaRegCircleUser className='m-2 size-8 text-back'  />
              </Button>
   
              <Menu
               id="basic-menu"
               anchorEl={anchorEl}
               open={open}
               onClose={handleClose}
               MenuListProps={{
               'aria-labelledby': 'basic-button',
              }}>
                <MenuItem onClick={handleClose}><Button onClick={goToProfile}>Profile</Button></MenuItem>
                <MenuItem onClick={handleClose}><Button onClick={handleLogout}>Logout</Button></MenuItem>
              </Menu>
  
            </div>
            : <Link to='/login' className=' m-2 p-2' >Login</Link>
        }
      </div>
    )
  }
  