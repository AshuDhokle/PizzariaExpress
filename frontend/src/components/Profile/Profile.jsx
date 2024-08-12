import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import { UserProfile } from './UserProfile'
import { OtherDetails } from './OtherDetails'
const Profile = () => {
  const user = useSelector(selectUser)
  return (
    <div className=''>
       
       <div className='p-2' style={{backgroundColor:'#FF8F00'}}>
       <UserProfile user={user}/>
       <OtherDetails user={user}/>
       </div>
    </div>
  )
}


export default Profile