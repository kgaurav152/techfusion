import { cloudinaryConnect } from '@/config/cloudinary';
import {v2 as cloudinary} from 'cloudinary';

export const uploadImageToCloudinary = async (file,folder,height,quality) =>{

    cloudinaryConnect();
    const options = {
        folder,
        resource_type : "auto"
    }
    if(height){
        options.height=height
    }
    if(quality){
        options.quality=quality
    }

  return await cloudinary.uploader.upload(file, options);
   
} 