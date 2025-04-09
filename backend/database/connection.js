import Mongoose from "mongoose";

class Database{
    constructor(){
        this._connection();
    }
    
    _connection(){
        
        Mongoose.connect(`mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONGOOSE_PASSWORD}@expernsetracker.rvtfpsc.mongodb.net/pizzadb`)
        .then(()=>{
            console.log('Database connnected');
        })
        .catch((err)=>{
            console.log('Database Connection Error');
        })
    }
}
const Connection = new Database();
export {Connection}
