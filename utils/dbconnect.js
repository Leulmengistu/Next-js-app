import mongoose from 'mongoose';

const connection = {}


async function dbConnect(){
    

    if(connection.isConnected){
        return;
    }

    require('dotenv').config();
    const uri = process.env.MONGO_URI;
    try{
    const db = await mongoose.connect(uri, {
        useNewUrlParser: true,})
    connection.isConnected = db.connections[0].readyState;
    console.log('Connection created with: ',connection.isConnected )
}catch(error){console.log("Database connection error: ", error)}



    
}


export default dbConnect;
