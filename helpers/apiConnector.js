import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData) => {
  const token = Cookies.get("token");
  let temp = {
    token: token,
    ...bodyData,
  };

  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: temp ? temp : null,
    headers: { "Cache-Control": "no-cache" },
    params: null,
  });
};

// {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json', // Adjust the content type if necessary
//   }
