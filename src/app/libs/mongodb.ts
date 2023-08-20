import mongoose from "mongoose";
const { MONGODB_URI } = process.env
if(!MONGODB_URI){
    console.log("URL : " + MONGODB_URI)
    throw new Error("MONGODB_URI deberia estar definido");
}
export const connectDB = async () =>{
    try{
        const {connection} = await mongoose.connect(MONGODB_URI);
        if(connection.readyState === 1){
            console.log("mongodb conected!")
            return Promise.resolve(true)
        }
    }catch(error){
        console.log("error: " + error)
        return Promise.reject(false)
    }
};
