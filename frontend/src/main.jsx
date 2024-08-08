import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App.jsx'
import store from './Store/store.js'
import './index.css'
import Navbar from './components/Navbar.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <BrowserRouter>
    <Navbar/>
    <App />
    </BrowserRouter>
    </Provider>
  ,
)
