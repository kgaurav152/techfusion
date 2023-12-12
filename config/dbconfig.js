import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connnection= mongoose.connection;

    connnection.on('connected', ()=>{
      console.log('MongoDB connected successfully');
    })

    connnection.on('error', (err)=>{
      console.log('MongoDB connection error. Please make sure MongoDB is running.' + err);
      process.exit();
    })

  } catch (error) {
    console.log('Something gone wrong!');
    console.log(error);
  }
}