import jwt from "jsonwebtoken"; 

export const getDataFromToken =(token) => { 
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken.id;
  } catch (err) { 
    throw new Error(err.message);
    c
  }
};
