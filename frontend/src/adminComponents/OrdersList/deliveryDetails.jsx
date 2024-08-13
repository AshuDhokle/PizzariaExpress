import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import UpdateDeliveryPopup from './updateDeliveryPopup';
import React,{ useState } from "react";
export const DeliveryDetails = (props) =>{
    const [check,setCheck] = useState(props.delivered);
    const [trigger,setTrigger] = useState(false);
    const updateDelivery = async(id) =>{
        const response = await Axios.put(`http://localhost:3000/api/admin/order/${id}`)
        if(response){
          console.log(response);
          setCheck(true);
          setTrigger(false)
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
  