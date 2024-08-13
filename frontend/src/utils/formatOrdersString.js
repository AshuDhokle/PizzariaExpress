export const formatOrdersString = (orders) =>{
    let str = "";
    for(let i = 0;i<orders.length;i++){
      str += orders[i].name 
      str += ' - '
      str += orders[i].size
      str += ' x ' 
      str += orders[i].quantity
      str += ', '; 
    }
    return str.slice(0,-2);
  }