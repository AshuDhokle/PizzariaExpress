import Axios from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { login } from '../features/user/userSlice';
import ReactLoading from 'react-loading';
import { selectUser } from '../features/user/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import Loading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  
    const dispatch = useDispatch();

    //const navigate = useNavigate();  
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading,setLoding] = useState(false);
    const [registered,setRegistered] = useState(false);
    const [newUser,setNewUser] = useState({
      name:'',
      phone:null,
      email:'',
      address:'',
      password:''
    });
    
    const alreadyLogged = useSelector(selectUser);

    const handleChange = (e) =>{
      const {name,value} = e.target;
      setNewUser(preVal => ({...preVal,[name]:value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();                           
        
        const sendData = async()=>{
          try {
            setLoding(true);
            //const obj = JSON.stringify(newUser)
            const response = await Axios.post('https://pizzaria-express-six.vercel.app/api/user/auth/signup',newUser);
            const data = response.data;

            if(data){
              dispatch(
                login({
                 data
                })
               )
               
              toast.success('Registered Successfully')
              setRegistered(true)
            }else {
              throw new Error(data)
            }

          } catch (error) {
            if(error.response.status===403){
              toast.error('User Already Exists! Please try different phone number');
            }else{
              toast.error('Someting went wrong!')
            }
          }finally{
            setLoding(false);
          }
        }
        
        sendData();  
         
    };

    return (

        <div className="m-4 rounded-2xl min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

          <div className="max-w-md w-full space-y-8">
            
          {
            alreadyLogged 
            ? !registered && <h1 className='text-center font-bold text-xl'>Already Logged In</h1>
            :<div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
           </div>
          }
  
           {
            (registered || alreadyLogged)
            ?  <div className='flex flex-col items-center justify-center'>
               <Link to='/' className='p-2 rounded-lg shadow-xl text-white font-semibold px-4 bg-green-300' > Buy Pizza </Link>
               </div>
            : <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
               <div className="rounded-md shadow-sm -space-y-px">
                <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Name" value={newUser.name} onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
                <input id="phoneNumber" name="phone" type="tel" autoComplete="tel" required
                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                       placeholder="Phone Number" value={newUser.phone} onChange={handleChange}  />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                       placeholder="Email address" value={newUser.email} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="address" className="sr-only"> Address </label>
                <input id="address" name="address" type="text" autoComplete="address" required
                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                       placeholder="Address" value={newUser.address} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="new-password" required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password" value={newUser.password} onChange={handleChange}
                />
              </div>
                <div>
                  <label htmlFor="confirmPassword" className="sr-only"> Confirm Password </label>
                  <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required
                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                         placeholder="Confirm Password"
                         value={confirmPassword}
                         onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      {loading ? <Loading type='spin' width={20} height={20}/> : "Sign Up"}
                </button>
              </div>
              </form>
           }
                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
            
            <ToastContainer />
        </div>
    );
};

export default Signup;
