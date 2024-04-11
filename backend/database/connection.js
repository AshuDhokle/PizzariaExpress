import Mongoose from "mongoose";

const server = '127.0.0.1:27017';
const database = 'pizzadb';

class Database{
    constructor(){
        this._connection();
    }

    _connection(){
        Mongoose.connect(`mongodb://${server}/${database}`)
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
