import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAdminAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.adminToken;
    if(!token){
        return next(
            new ErrorHandler("Dashboard user is not Authenticated",400));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);
    if(req.user.role !== "Admin"){
        return next(
            new ErrorHandler(`${req.user.role} not authorized for this resources!`,403

        )
    );
    }
    next();

});
export const isPatientAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    console.log("Token from cookie:", token);
    if(!token){
        return next(new ErrorHandler("Patient is not Authenticated!",400));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded);
    req.user=await User.findById(decoded.id);
    console.log("User from DB:", req.user);
    if(req.user.role!=="Patient"){
        return next(
            new ErrorHandler(`${req.user.role} not authorized for this resources!`,403

        )
    );
    }
    next();

});

export const isAuthorized=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    `${req.user.role} not allowed to access this resource!`
                )
            );

          
        }
        next();
    };
}