import Axios from 'axios';
import React, { useState,useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { selectUser } from '../features/user/userSlice';
import { login } from '../features/user/userSlice';
import ReactLoading from 'react-loading';

const Login = () => {
    
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
   // const [loggedIn,setLoggedIn] = useState(false);
    const [user,setUser] = useState({
      phone:null,
      password:''
    });
    const [message,setMessage] = useState('')
    const navigate = useNavigate();
    
      const alreadyLogged = useSelector(selectUser)
      

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Add your login logic here, for example, calling an authentication API
        // console.log('Email:', user.phone);
        // console.log('Password:', user.password);
        
          const fetchData = async()=>{
            try {
              //const obj = JSON.stringify(user) 
              const response = await Axios.post(`http://localhost:3000/login`,user)
              return response;
            } catch (error) {
              console.log(`Error Fetcing Data : ${error.response.status}`);
              
              throw new Error(error.response.status);
            }
          } 
          try {
            setLoading(true);
            const data = await fetchData();
            
             
            if(data.status === 200){
              setLoading(false);
                const logedUser = data.data;
                console.log(logedUser);
                dispatch(
                 login({
                  name:logedUser.name,
                  email:logedUser.email,
                  phone:logedUser.phone,
                  password:logedUser.password,
                  _id:logedUser._id
                 })
                )
                //setLoggedIn(true);
                //navigate('/')
            }
        } 
        catch (error) {
           
          setLoading(false);
          const status = parseInt(error.message);
          
          if(status === 404){
             setMessage('Invalid Phone Number')
            }else if(status === 401){
              setMessage(`Password dosen't match`);
            }else{
            setMessage('An error occurred while logging in. Please try again.'); 
           }
        }

         
    };
    
    const handleChange = (e) =>{
      const {name,value} = e.target;
      setUser(prevUser => ({...prevUser,[name]:value})) 
    }

    return (
        <div className="m-4 rounded-xl min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              {
                (alreadyLogged) ? <h1 className='text-center font-bold text-xl'>Logged In</h1>:<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
              }
             {loading && <ReactLoading type='spin' color='blue' height={200} width={200}/> }
             {message.length>0 && <p className='text-red-400 font-light'>{message}</p> } 
          </div>
          { alreadyLogged
              ?<div className='flex flex-col items-center justify-center'>
                <Link to='/' className='p-2 rounded-lg shadow-xl text-white font-semibold px-4 bg-green-300' > Buy Pizza </Link>
              </div>
              :<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                 <div>
                 <label htmlFor="phone" className="sr-only">Phone number</label>
                 <input id="phone" name="phone" type="tel" autoComplete="phone" required
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                 placeholder="Phone Number" value={user.phone} onChange={handleChange} />
                 </div>
                <div>
                 <label htmlFor="password" className="sr-only">Password</label>
                 <input id="password"  name="password"  type="password"  autoComplete="current-password"  required  
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"  
                      placeholder="Password"  value={user.password}  onChange={handleChange}
                 />
                </div>
               </div>

               <div>
                <button type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                </button>
               </div>
              </form>
          }
            <div className="text-center">
              <p className="mt-2 text-sm text-gray-600">Don't have an account?{' '}
              <Link to='/signup' className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
              </p>
            </div>
            </div>
        </div>
    );
};

export default Login;
