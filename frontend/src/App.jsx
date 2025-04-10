import {Routes,Route} from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminLogin from './pages/adminLogin'
import MainPage from './pages/MainPage'
import Menu from './pages/Menu'
import Profile from './components/Profile/Profile'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import AdminPannel from './pages/admin'
function App() {
  
  return (
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/success' element={<Success/>} />
        <Route path='/cancel' element={<Cancel/>}/>        

        <Route path='admin/adminLogin' element={<AdminLogin/>}/>
        <Route path='admin/adminPanel' element={<AdminPannel/>}/>
      </Routes>
   
  )
}

export default App
