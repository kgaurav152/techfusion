import Event from "@/models/Event";
import Participation from "@/models/Participation";
import User from "@/models/User";
import mongoose from "mongoose";

export async function connect() {
  if(mongoose.connections[0].readyState) return;
    try{
        await mongoose.connect(process.env.MONGO_URL);
        mongoose.model('User',User) 
        mongoose.model('Event',Event) 
        mongoose.model('Participation',Participation) 
        console.log("Connected to MongoDB");
    }
    catch(error){
        throw new Error("Error in connecting to MongoDB",error)
    }
   
}