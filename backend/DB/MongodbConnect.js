import mongoose from "mongoose";

const MongodbConnect = async() => {
  try {
    await mongoose.connect('mongodb://localhost:27017/')
    console.log("connected to MongoDB ! ");
    
  } catch (error) {
    console.log("can not connected to mongodb");
    
  }
}

export default MongodbConnect

