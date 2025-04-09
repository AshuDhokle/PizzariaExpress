import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import UpdateDeliveryPopup from './updateDeliveryPopup';
import React,{ useState } from "react";
import axios from "axios";
export const DeliveryDetails = (props) =>{
    const [check,setCheck] = useState(props.delivered);
    const [trigger,setTrigger] = useState(false);
    const [loading, setLoading] = useState(false);
    const updateDelivery = async(id) =>{
      setLoading(true);
      console.log(props);
      
      try {
        const response = await axios.put(`http://localhost:3000/api/admin/order/${id}`)  
      } catch (error) {
        console.log(error);
      }  finally {
        setCheck(true);
        setTrigger(false)
        setLoading(true);
      }          
    }
    
    const resetTrig = () =>{
      setTrigger(false);
    }
  
    return(
      <div>
        {
        check 
          ? <IoMdCheckbox className='size-6' />
          : <MdCheckBoxOutlineBlank className='size-6' onClick={()=>setTrigger(true)}/>
        }
        <UpdateDeliveryPopup trig = {trigger} updateDelivery={updateDelivery} id = {props.id} resetTrig={resetTrig}/>
      </div>
    )
  }
  