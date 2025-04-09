import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import { UserProfile } from './UserProfile'
import { OtherDetails } from './OtherDetails'
const Profile = () => {
  const user = useSelector(selectUser)
  return (
    <div className='flex flex-col' style={{backgroundColor:'#FF8F00'}}>
       <UserProfile user={user}/>
       <OtherDetails user={user}/>
    </div>
  )
}


export default Profile