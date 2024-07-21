import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Admin from './adminComponents/admin'
import AdminLogin from './adminComponents/adminLogin'
import AddPizza from './adminComponents/addPizza'
import PizzaList from './adminComponents/pizzaList'
import OrderList from './adminComponents/orderList'
import UserList from './adminComponents/userList'
import MainPage from './MainPage'
import Menu from './components/Menu'
import Profile from './components/Profile'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Maps from './pages/Maps'
function App() {
  const [count, setCount] = useState(0)

  return (
    < div className=''>
      
      <Routes>
         <Route path='/' element={<MainPage/>}/>
         <Route path='/menu' element={<Menu/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/profile/:id' element={<Profile/>}/>
         <Route path='/success' element={<Success/>} />
         <Route path='/cancel' element={<Cancel/>}/>        
         <Route path='/map' element={<Maps/>}/>
        <Route path='/admin/*' element={<Admin/>}>
         <Route path='adminLogin' element={<AdminLogin/>}/>
         <Route path='addPizza' element={<AddPizza />} />
         <Route path='pizzaList' element={<PizzaList />} />
         <Route path='userList' element={<UserList />} />
         <Route path='orderList' element={<OrderList />} />
        </Route>
     
      </Routes>
    </div>
  )
}

export default App
