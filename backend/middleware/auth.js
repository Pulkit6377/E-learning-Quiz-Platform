import jwt from 'jsonwebtoken'

const auth = (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({msg:"Access Denied. Not Authorized"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
};

export default auth;