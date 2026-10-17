
const checkRole =(role)=> async(req,res,next)=> {
    try{
        const checkStatus = req.user.roles;
        const check = role.includes(checkStatus);
        
        if (check !== true){
            res.status(404).json({message:"you dont have access."})
        }
       return next();
    }catch(error){}
  };
  
  export default checkRole;

