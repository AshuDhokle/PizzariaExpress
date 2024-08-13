import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPizza = ({value,idx}) => {
  
  const navigate = useNavigate();
 

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    isVeg: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const s = [];
    const p = [];
    for(let i = 0;i<tags.length;i++){
      let [price,size] = tags[i].split("-");
      price = parseInt(price)
      s.push(size);
      p.push(price);
    }
    const data = {
      name:formData.name,
      img:formData.image,
      veg:formData.isVeg,
      size:s,
      price:p,
    } 
    try {
      const response = await Axios.post('http://localhost:3000/api/admin/pizza/addPizza',data)
      if(response.status === 200){
        navigate('/admin/pizzaList')
      }
    } catch (error) {
      console.log(error);
    }
     
  };
  
  const [tags, setTags] = useState([])

  function handleKeyDown(e){
    if(e.key !== 'Enter') return
    e.preventDefault(); // Prevent form submission on Enter key
    const value = e.target.value
    if(!value.trim()) return
    setTags([...tags, value])
    e.target.value = ''
  }

  function removeTag(index){
    setTags(tags.filter((el, i) => i !== index))
  }

  //Tags-----------------------------------------
 
  return (
    <div className=''>
    {
      value === idx && (
    <div className="mt-20 max-w-md mx-auto bg-white p-8 rounded-md shadow-md   animate-fade-in">  
      <h2 className="text-2xl font-bold mb-4">Add Pizza</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name of Pizza
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
       
        <div className="tags-input-container">
          <label htmlFor='price-size'>Prices and Sizes : </label><br/>
          <input onKeyDown={handleKeyDown} id='price-size' type="text" className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Price-Size (e.g. 100-small) "  />
            { tags.map((tag, index) => (
                <div className="px-2 bg-slate-300 w-40 m-2 rounded-xl" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            id="isVeg"
            name="isVeg"
            checked={formData.isVeg}
            onChange={handleChange}
            className="mr-2"
            
          />
          <label htmlFor="isVeg" className="text-sm font-medium text-gray-700">
            Veg
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Pizza
        </button>
      </form>
    </div>

      )
    }
    
    </div>
  );
};

export default AddPizza;
