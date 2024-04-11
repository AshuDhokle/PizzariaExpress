import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
        <form className=' w-64 shadow-xl bg-white  grid grid-cols-3 '>
            <select className=' text-center bg-white  border-2 col-span-2'>
                <option>All</option>
                <option>Veg</option>
                <option>Non-Veg</option>
            </select>
            <div className=''>
            <button className=' text-center p-2 rounded-2xl ' type='submit'><CiSearch className='size-6' /></button>
            </div>
        </form>
  )
}

export default SearchBar