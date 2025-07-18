import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js"
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
export const patientRegister=catchAsyncErrors(async(req,res,next)=>{
   const {firstName,lastName,email,phone,password,gender,dob,nic} = req.body;
   if(!firstName || !lastName ||!email || !phone || !password || !gender ||!dob || !nic){
    return next(new ErrorHandler("Please fill full form",400));
   }
   const isRegistered=await User.findOne({email});
   if(isRegistered){
    return next(new ErrorHandler("User already Registered",400));
   }
   const user=await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role:"Patient",
});
generateToken(user,"User registered!",200,res);
});

export const login=catchAsyncErrors(async(req,res,next)=>{
    const{email,password,confirmPassword,role}=req.body;
    if(!email || !password || !confirmPassword ||!role){
        return next(new ErrorHandler("Please provide all details!",400))

    }
    if(password!==confirmPassword){
        return next(
            new ErrorHandler("Password and confirm password do not match!",400))

    }
    const user=await User.findOne({email}).select("+password");
    console.log(await bcrypt.compare(password,user.password));
    if(!user){
        return next(new ErrorHandler("Invalid email or password!",400));
    }
    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password!",400));
    }
    if(role!== user.role){
        return next(new ErrorHandler("User with this role not found!",400));
    }
    generateToken(user,"User logged in successfully!",201,res);
});

export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic
    }=req.body;
    if(
        !firstName || 
        !lastName ||
        !email || 
        !phone || 
        !password || 
        !gender ||
        !dob || 
        !nic){
        return next(new ErrorHandler("Please fill full form",400));
   }
   const isRegistered=await User.findOne({email});
   if(isRegistered){
    return next(new ErrorHandler("Admin with this email already exists!",400));
   }
   const admin=await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
role:"Admin",
});
res.status(200).json({
    success:true,
    message:"New Admin registered!",
    admin,
});
});
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Doctor with this email already exists!", 400));
    }
  
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvator.path);
  
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(new ErrorHandler("Failed to Upload Doctor Avatar", 500));
    }
  
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      nic,
      doctorDepartment,
      role: "Doctor",
      docAvator: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
  
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  });
  

export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors,

    });
});

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,

    });
});
export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
    res.status(201).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"Admin logged out successfully!",
    });
});
export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
    res.status(201).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"Patient logged out successfully!",
    });
});
