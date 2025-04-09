import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import UpdateDeliveryPopup from './updateDeliveryPopup';
import React,{ useState } from "react";
import axios from "axios";
import Loading from "react-loading";
export const DeliveryDetails = (props) =>{
    const [check,setCheck] = useState(props.delivered);
    const [trigger,setTrigger] = useState(false);
    const [loading, setLoading] = useState(false);
    const updateDelivery = async(id) =>{
      setLoading(true);
      
      try {
        await axios.put(`https://pizzaria-express-six.vercel.app/api/admin/order/${id}`)  
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
        {loading && <Loading type="spin" width={50} height={50}/>}
        {
        check 
          ? <IoMdCheckbox className='size-6' />
          : <MdCheckBoxOutlineBlank className='size-6' onClick={()=>setTrigger(true)}/>
        }
        <UpdateDeliveryPopup trig = {trigger} updateDelivery={updateDelivery} id = {props.id} resetTrig={resetTrig}/>
      </div>
    )
  }
  