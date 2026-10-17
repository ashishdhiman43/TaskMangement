import jsonwebtoken from 'jsonwebtoken';
// import { jwtDecode } from "jwt-decode";

const Auth = async (req,res,next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') 
    try{
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const decoded = jsonwebtoken.verify(token,process.env.JWT_SECRET);
      req.user = decoded;
      // const decodedjwt = jwtDecode(token);
      // console.log("decoded",decodedjwt);
      console.log("token", decoded);
      return next();
    }catch(error){
      console.error("error")
    }
  };

  export default Auth;
  