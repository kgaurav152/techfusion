import axios from 'axios'
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({});

export const apiConnector = (method,url,bodyData) => {
    const token = Cookies.get("token"); 
    let temp = {
        token:token,
        ...bodyData
    }
    const newUrl =" https://techfestkec.vercel.app"+url

    return axiosInstance(
        {
            method: `${method}`,
            url :   `${newUrl}`,
            data : temp ? temp : null,
            headers:  null,
            params :  null,

        }
    )
}