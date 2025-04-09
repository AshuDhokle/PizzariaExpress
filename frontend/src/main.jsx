import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App.jsx'
import store from './Store/store.js'
import './index.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
const Page = () =>{

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Navbar/>
    <App />
    <Footer/>
    </BrowserRouter>
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Page/>
  ,
)

