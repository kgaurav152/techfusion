// import Event from "@/models/Event";
// import Participation from "@/models/Participation";
// import User from "@/models/User";
// import mongoose from "mongoose";

// export async function connect() {
//   if(mongoose.connections[0].readyState) return;
//     try{
//         await mongoose.connect(process.env.MONGO_URL);
//         mongoose.model('User',User) 
//         mongoose.model('Event',Event) 
//         mongoose.model('Participation',Participation) 
//         console.log("Connected to MongoDB");
//     }
//     catch(error){
//         throw new Error("Error in connecting to MongoDB",error)
//     }
   
// }

import Event from "@/models/Event";
import Participation from "@/models/Participation";
import User from "@/models/User";
import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const connnection = mongoose.connection;
   
    connnection.on('connected', ()=>{
      // mongoose.model('User',User) 
      // mongoose.model('Participation',Participation) 
      // mongoose.model('Event',Event) 
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