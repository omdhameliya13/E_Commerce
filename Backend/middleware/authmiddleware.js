const jwt = require('jsonwebtoken');

const protect = (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Not authorized"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        next();
    }
    catch(err)
    {
        return res.status(401).json({message:"Token failed"});
    }
}

const authorize = (...role)=>{
    return(req,res,next)=>{
        if(!req.user.role){
            return res.status(401).json({message:`User role ${req.user.role} not authorized`});
        }
        next();
    }

}

module.exports = {protect,authorize};