import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'




const createToken = (user) =>{
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,)
}

export const register = async(req,res) =>{
    const {name,email,password,role,adminKey} = req.body;
    try{
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.status(400).json({message:"User already exists"})
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid Email"})
        }

        if(password.length < 8){
            return res.status(400).json({message:"Password must be at least 8 characters long"})
        }

        const salt  =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        let userRole  = "student";
        if(role === "instructor"){
            if(adminKey === process.env.ADMIN_KEY){
                userRole = "instructor";
            }
            else{
                return res.status(400).json({message:"Invalid Admin Key"})
            }
        }

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            role:userRole
        });

        const User = await newUser.save();

        const token = createToken(User);

        return res.status(201).json({message:"User Registered Successfully",token:token});
    }
    catch(error){
        return res.status(500).json({message:"Server Error"})
    }

};


export const login = async(req,res) => {
    const {email,password} = req.body ;

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Not Registered"})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }

        const token = createToken(user);

        return res.json({success:true,message:"Login Successful",token:token,role:user.role})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

