import Axios from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { selectUser } from '../features/user/userSlice';
import { login } from '../features/user/userSlice';
import Loading from 'react-loading';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState({
      phone:null,
      password:''
    });
    const [message,setMessage] = useState('')
    const alreadyLogged = useSelector(selectUser)
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const fetchData = async()=>{
          setLoading(true)
          try {
            const response = await Axios.post(`https://pizzaria-express-six.vercel.app/api/user/auth/login`,user)
            const data = response.data;
            
            if(data){
              dispatch(login({data}))   
              toast.success('Logged in');
            }else{
              throw new Error(data);
            }
          }catch (error) {
            if(error.response.status === 401){
              toast.error('Wrong Credentials')
            }else if(error.response.status === 404){
              toast.error('User not found')
            }else{
              toast.error('Someting went Wrong')
            }
          }finally{
            setLoading(false)
          }

        }
        fetchData();
    };
    
    const handleChange = (e) =>{
      const {name,value} = e.target;
      setUser(prevUser => ({...prevUser,[name]:value})) 
    }

    return (
        <div className="m-4 rounded-xl min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <ToastContainer/>
          <div className="max-w-md w-full space-y-8">
            <div>
              {
                (alreadyLogged) ? <h1 className='text-center font-bold text-xl'>Logged In</h1>:<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
              }
            
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
                      {loading ? <Loading type='spin' width={20} height={20}/> : "Sign in"}
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
