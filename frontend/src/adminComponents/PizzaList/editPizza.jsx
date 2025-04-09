import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
const EditPizza = ({ editTrig, Pizza, setEditTrig }) => {

  const [pizza, setPizza] = useState(Pizza);

  const [newPrice, setNewPrice] = useState();
  const [newSize, setNewSize] = useState();
  const { id } = useParams();


  const handleSubmit = async () => {
    //e.preventDefault();
    const response = await Axios.put(`https://pizzaria-express-six.vercel.app/api/admin/pizza/${id}`, pizza);
    console.log(response);


  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPizza((prevPizza) => ({
      ...prevPizza,
      [name]: type === 'checkbox' ? checked : value,
    }));
    //console.log(pizza);
  }

  const handleClick = (size, price) => {
    const newSize = pizza.size.filter((sz) => sz !== size);
    const newPrice = pizza.price.filter((pr) => pr !== price);
    setPizza(prevState => ({ ...prevState, size: newSize, price: newPrice }))
    //console.log(pizza);
  }

  const addPriceSize = () => {
    let newPriceList = pizza.price;
    let newSizeList = pizza.size;
    newPriceList.push(parseInt(newPrice));
    newSizeList.push(newSize);
    setPizza(prevState => ({ ...prevState, size: newSizeList, price: newPriceList }))
    setNewPrice('')
    setNewSize('')
    //console.log(pizza);
  }

  const handlePriceChange = (e, idx) => {
    let temp = parseInt(e.target.value);
    if (e.target.value.length === 0) {
      temp = 0;
    }
    let newPriceList = pizza.price;
    newPriceList[idx] = temp;
    setPizza(prevState => ({ ...prevState, price: newPriceList }))
  }

  const handleSizeChange = (e, idx) => {
    const temp = e.target.value;
    let newSizeList = pizza.size;
    newSizeList[idx] = temp;
    setPizza(prevState => ({ ...prevState, size: newSizeList }))
  }

  return (editTrig &&
    <div className='fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
      {

        pizza &&
        <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
          <div className='flex flex-row items-center justify-between'>
            <h2 className="text-2xl font-bold mb-4">Update Pizza</h2>
            <IoClose onClick={() => setEditTrig(false)} className='size-8 m-2 text-red-400 hover:text-red-500 cursor-pointer' />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name of Pizza
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={pizza.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="img"
                value={pizza.img}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className=''>
              {
                pizza.size.map((size, idx) => (
                  <div key={idx} className='p-2 m-2 bg-gray-100 rounded-xl shadow-lg w-2/3 flex flex-row items-start justify-between'>
                    <div className=''>
                      <input type='text' value={size} className=' inline p-2 mx-2 rounded-xl w-1/3' onChange={e => handleSizeChange(e, idx)} /> <span>-</span>
                      <input type='text' value={pizza.price[idx]} className=' inline p-2 mx-2 rounded-xl w-1/3' onChange={e => handlePriceChange(e, idx)} />
                    </div>
                    <MdCancel className='inline size-10 text-red-400' onClick={() => handleClick(size, pizza.price[idx])} />
                  </div>
                ))

              }
              <div className='p-2 m-2 bg-gray-100 rounded-xl shadow-lg w-2/3 flex flex-row items-start justify-between'>
                <input type='text' value={newSize} className=' inline p-2 mx-2 rounded-xl w-1/3' onChange={e => setNewSize(e.target.value)} /> <span>-</span>
                <input type='text' value={newPrice} className=' inline p-2 mx-2 rounded-xl w-1/3' onChange={e => setNewPrice(e.target.value)} />
                <IoAddSharp className='inline size-10 text-blue-400' onClick={addPriceSize} />
              </div>
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="isVeg"
                name="veg"
                checked={pizza.veg}
                onChange={handleChange}
                className="mr-2"
              //required
              />
              <label htmlFor="isVeg" className="text-sm font-medium text-gray-700">
                Veg
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Pizza
            </button>
          </form>
        </div>

      }
    </div>
  )
}

export default EditPizza