import {Routes,Route} from 'react-router-dom'
import './App.css'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import AdminLogin from './adminComponents/adminLogin'
import MainPage from './pages/MainPage'
import Menu from './components/Menu/Menu'
import Profile from './components/Profile/Profile'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import AdminPannel from './adminComponents/admin'
function App() {
  
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

        <Route path='admin/adminLogin' element={<AdminLogin/>}/>
        <Route path='admin/adminPanel' element={<AdminPannel/>}/>
      </Routes>
    </div>
  )
}

export default App
