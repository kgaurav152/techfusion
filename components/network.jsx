"use client"
import axios from 'axios';
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast';

export default class Network {
    
    constructor() {
        this.url = process.env.BASE_URL;
        // console.log(process.env.BASE_URL);
        

    }
    hit(action = "",subaction="index", data = "", handle = null) {
        if(Cookies.get("token")!=null){
            this.token = Cookies.get("token");
            // console.log("found")
        }else{
            this.token = "";
            // console.log("not found")
        }

        const requestData = {
            "api_key": this.token,
            "body": data
        };

        // console.log(requestData);
        
        axios.post(this.url+"/"+action+"/"+subaction,requestData)
        .then((response) => {
            // console.log("Network Response: " + response.data);
            // console.log(response);
            const responseData = response.data.data;
            // console.log(responseData);
            // handle(response.data.data);
            
           
            if(response.data.messages.error){
                toast.error(response.data.messages.error);
            }else{
                if(response.data.messages.success){
                    toast.success(response.data.messages.success);
                }
                handle(responseData);
            }
            // console.log(response.data.messages);
            if(response.data.data.api_key){
                Cookies.set('token' , response.data.data.api_key);
            }
            // return responseData;
        });
    }
  
    
  
}