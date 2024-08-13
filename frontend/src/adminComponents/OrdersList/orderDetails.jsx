import {convertDate} from '../../utils/formatDate'
import { formatOrdersString } from '../../utils/formatOrdersString'
export const OrdersDetails = ({createdAt,amount,items,shipping}) =>{
    return(
      <div className=' text-start'>
        <h1> <span className='font-semibold'>Date : </span> {convertDate(createdAt)}</h1>
        <h1> <span className='font-semibold'>Amount : </span> {amount} /-</h1>
        <div>
          <h1 className='w-64'> <span className='font-semibold'> Shipping : </span> {shipping}</h1>
        </div>
        
        <h1 ><span className='font-semibold'>Items : </span>{formatOrdersString(items)}</h1>
      
      </div>
    )
  }
  