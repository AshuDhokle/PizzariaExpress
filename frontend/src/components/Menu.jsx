import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import axios from 'axios'
import ReactLoading from 'react-loading';

const Menu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    axios.get('http://localhost:3000/pizzas')
      .then((res) => {
        setPizzas(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  useEffect(()=>{
    console.log(window.innerWidth);
  },[window.innerWidth])// Calculate the indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pizzas.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='mt-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {loading ? (
          <ReactLoading type='spin' color='blue' height={100} width={100} />
        ) : currentItems.length > 0 ? (
          currentItems.map((pizza, idx) => <Cards key={idx} pizza={pizza} />)
        ) : (
          <h1 className='flex flex-col items-start justify-center'>No pizzas found</h1>
        )}
      </div>
      {/* Pagination */}
      <ul className='flex justify-center mt-4'>
        {Array.from({ length: Math.ceil(pizzas.length / itemsPerPage) }, (_, index) => index + 1).map((number) => (
          <li key={number}>
            <button
              className={`mx-1 px-4 py-2 border border-gray-500 rounded ${
                number === currentPage ? 'bg-gray-500 text-white' : 'bg-white text-gray-500'
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
