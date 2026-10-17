import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

//Create a user 
export const registerUser = async(req, res)=>{
    try{
        const {name,email, username, password,roles}=req.body;
        if(!email || !username || !password ){
            res.status(400).json({message:"All fields required"})
        }
        const userexist = await User.findOne({email});
        if(userexist){
            return res.status(404).json({message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        const newUser = User({email,username,password :hashedPassword,roles});
        
        await newUser.save();

        const token = jwt.sign({ id: newUser.id, roles: roles}, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
        const saved = await User.find(newUser).select("-password");
        res.json({saved,token});
    }catch(error){
        res.status(400).json({message:"Failed to registered"})
    }
}

//login user
export const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({message:"Invalid Credentials"})
        }
        const token = jwt.sign({ id: user._id, roles: user.roles}, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
            res.status(200).json(token);
    }catch(error){
        res.status(400).json({message:"Failed to login. Try Again!!!"})
    }
}

//get userprofie
export const getProfile = async (req,res)=>{
    try{
        const user = await User.find().select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.json(user);
    }catch(error){
        res.status(400).json({message:"Error fetching details"})
    }
}

//get user by id
export const getUserById = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
            res.json(user);
    }catch(error){ return res.status(500).json({message:"error fetching details"})}
}

//delete user
export const deleteUser = async (req,res)=>{
    try{
        const id = req.user.id;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.json("user deleted successfully");
    }catch(error){
        res.status(400).json({message:"Failed while deleting user"})
    }
}

//update profile
export const updateUser = async (req,res)=>{
    try{
        const id = req.user.id;
        const {name,roles} = req.body;
    
        const user = await User.findByIdAndUpdate(id,{name,roles},{new: true}).select("-password");
        if(!user){
          return res.status(404).json({message:"user not found"});
        }
        await user.save();
        res.status(200).json({message:"User updated Successfully",user});
      }catch(error){
        res.status(400).json({message:"Failed to update details"})
    }
}

//get assigned tasks
export const getassignedTasks = async (req,res)=>{
    try{
        const id = req.user.id;
        const gettasks = await User.findById(id).populate('assignedTask');
        console.log(gettasks.assignedTask)
        return res.json(gettasks.assignedTask);
    }catch(error){
        res.status(400).json({message:"Failed to assign task"})
    }
}

//logout
export const logout = async (req,res)=>{
    try{
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    }catch(error){
        res.status(400).json({message:"Failed to logout"})
    }
}

//get all usernames
export const getall =async(req,res)=>{
    try{
        const username = await User.find().select("-password");
        if(!username){
            res.status(404).json({message:"username not found"})
        }
        res.json(username);
    }catch(error){
        res.status(400).json({message:"Failed to fetch users"})
    }
}

export const forgotPasswordToken = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
   
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `<p>Hi ${user.username},</p>
            <p>Click below link to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>This link will expire in 10 minutes.</p>
             <p>If you did not request a password reset, please ignore this email.</p>
             <p>Best regards,<br/>Dhiman Technology</p>`,
    });

    res.json({ message: "Reset link sent" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};