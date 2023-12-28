import axios from 'axios'
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({});

export const apiConnector = (method,url,bodyData) => {
    const token = Cookies.get("token"); 
    let temp = {
        token:token,
        ...bodyData
    }

    return axiosInstance(
        {
            method: `${method}`,
            url :   `${url}`,
            data : temp ? temp : bodyData,
            headers:  null,
            params :  null,

        }
    )
}