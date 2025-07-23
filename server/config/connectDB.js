import {connect} from 'mongoose';

const connectDB=async()=>{
    try{
        const mongoDBconnection=await connect(process.env.CONNECTION_STRING);
        console.log(`The database has successfully connected`);
    }
    catch(error){
        console.log(`Error:${error}`);
        process.exit(1);
    }
};
export default connectDB;