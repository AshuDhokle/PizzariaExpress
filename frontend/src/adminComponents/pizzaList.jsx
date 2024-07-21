import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ReactLoading from 'react-loading';
import { MdOutlineUpdate } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import DeletePopup from './deletePopup';
import { ToastContainer, toast } from 'react-toastify';
const PizzaList = () => {
  const [pizzaList, setPizzaList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Axios.get('http://localhost:3000/api/admin/pizza');
        setPizzaList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pizza data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  
  return (
    <div  className=' m-4 flex flex-col items-center justify-center z-0 animate-fade-in' >
      {loading ? (
        <ReactLoading type='spin' color='blue' height={200} width={200} />
      ) : (
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-3 '>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 h-8 text-center'>
            <tr className='px-6 py-3'>
              <th className='w-1/3'>Pizza Name</th>
              <th className='w-1/3'>Size</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody className='border border-3 text-center'>
            {pizzaList.map((pizza, idx) => (
              <tr
              className=' odd:bg-blue-100 odd:dark:bg-blue-200 even:bg-blue-200 even:dark:bg-gray-800 border-b dark:border-gray-700'
              key={idx}
              >
                <td className='px-6 py-4 font-medium text-red-500 whitespace-nowrap dark:text-white text-lg'>
                  {pizza.name}
                </td>
                <td className='p-4'>
                  <SubTable price={pizza.price} size={pizza.size} />
                </td>
                <td className='flex flex-row items-center justify-center'>
                  <PizzaOperation pizza = {pizza}/>
                </td>
              </tr>
            ))}
          </tbody>
          <ToastContainer/>
        </table>
      )}
    </div>
  );
};

const PizzaOperation = ({pizza}) =>{
  const [trigger,setTrigger] = useState(false);
  const handleDelete = async(id) =>{
    
    const response = await Axios.delete(`http://localhost:3000/api/admin/pizza/${id}`)  
    if (response.status === 200){
      toast('Pizza Deleted SuccessFully')
      setTrigger(false);
      window.location.reload(true);
    } 
    //toast(id)

  }

  const resetTrigger = () =>{
    setTrigger(false);
  }

  return (
    <div className='flex flex-row '>
      <Link to={`/admin/editPizza/${pizza._id}`}><MdOutlineUpdate className='size-6 mx-2 mt-8 text-blue-500 hover:text-blue-600' /></Link>
      <MdOutlineDelete onClick={()=>setTrigger(true)} className='size-6 mx-0 mt-8 text-red-500 hover:text-red-600' />
      <DeletePopup trig = {trigger}  resetTrig = {resetTrigger} deleteHandler={handleDelete} id={pizza._id}/> 
    </div>
  )
}

const SubTable = ({ price, size }) => {
  return (
    <table className='w-full text-sm text-left rtl:text-right border border-3 '>
      <thead className='text-center border '>
        <tr>
          <th className='text-black'>Size</th>
          <th className='text-black'>Price</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {price.map((price, index) => (
          <tr key={index} className='font-bold'>
            <td className='text-blue-500'>{size[index]}</td>
            <td className='text-red-500'>{price}/-</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default PizzaList;
