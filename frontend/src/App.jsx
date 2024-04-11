import { useState } from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Order from './components/Orders'
import Cart from './components/Cart'
import Admin from './adminComponents/admin'
import AdminLogin from './adminComponents/adminLogin'
import AddPizza from './adminComponents/addPizza'
import PizzaList from './adminComponents/pizzaList'
import OrderList from './adminComponents/orderList'
import UserList from './adminComponents/userList'
import MainPage from './MainPage'
import User from './components/User'
function App() {
  const [count, setCount] = useState(0)

  return (
    < div  className='absolute inset-0 overflow-auto bg-cover bg-center' style={{ backgroundImage: "url('https://thumbs.dreamstime.com/b/pizza-seamless-pattern-vector-pizza-pattern-abstract-background-background-useful-restaurant-identity-packaging-89205691.jpg')" }}>
      
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        
        <Route path='/user/*' element={<User/>}>
         <Route path='home' element={<Home/>}/>
         <Route path='login' element={<Login/>}/>
         <Route path='signup' element={<Signup/>}/>
         <Route path='orders' element={<Order/>}/>
         <Route path='cart' element={<Cart/>}/>
        </Route>
        
        
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
