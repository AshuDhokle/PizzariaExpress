import React from 'react'
import SearchBar from './SearchBar'
import Menu from './Menu'
import Navbar from './Navbar'
const Home = () => {
  return (
    <div className='p-4 flex flex-col justify-center items-center  m-4 shadow-2xl rounded-xl backdrop-opacity-0 backdrop-invert bg-white/60 z-10'>
    
    <div className='w-full flex flex-row items-center justify-start flex-wrap m-8 '>
    <h1 className='mx-10 p-2 font-nunito font-bold text-xl text-red-500 w-32'>Menu</h1>
    <SearchBar/>
    </div>
    <Menu/>
    </div>
  )
}

export default Home