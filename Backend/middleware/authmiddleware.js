const jwt = require('jsonwebtoken');

const protect = (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Not authorized"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err)
    {
        return res.status(401).json({message:"Token failed"});
    }
}

/*const authorize = (...BusinessRole)=>{
    return(req,res,next)=>{
        if(!req.user.BusinessRoleusinessRole){
            return res.status(401).json({message:`User role ${req.user.BusinessRole} not authorized`});
        }
        next();
    }

}*/

module.exports = {protect};