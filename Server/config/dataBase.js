import mongoose from "mongoose";


const ConnectDB = async()=>{
    try{  
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connect ...");
    }catch(err){
        console.error("mongodb error-->"+err); 
        process.exit(1)
    }finally{
        console.log("----------------------------------------->>>>>");   
    }
}


export default ConnectDB;