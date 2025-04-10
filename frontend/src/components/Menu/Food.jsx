import React from 'react'
import Cards from '../Cards/Cards';
import ReactLoading from 'react-loading';

export const Food = ({items,loading}) =>{
  
    return(
      <div className='px-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 border-l-2 border-gray-300 flex-wrap'>
          
          {loading ? (
            <div className='m-20 flex flex-col items-center justify-center '><ReactLoading type='spin' color='#1DCD9F' height={50} width={50} /> </div>
          ) : items.length > 0 ? (
            items.map((pizza, idx) => <Cards key={idx} pizza={pizza} />)
          ) : (
            <h1 className='flex flex-col items-start justify-center'>No pizzas found</h1>
          )}
  
      </div>
    )
  }
  