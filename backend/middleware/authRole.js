import jwt from 'jsonwebtoken'

const authRole = async(req,res,next) =>{
    
    if(req.user.role === "instructor"){
        next();
    }
    else{
        res.json({success:false,message:"Access Denied.Instructors Only"})
    }
}

export default authRole;