import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

// export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  
// });

export const postAppointment = async (req, res, next) => {
  try {
    console.log("console...................")
    const patientId = req.user._id;
  console.log("user id: ", patientId);

  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const doctorId = isConflict[0]._id;
  const existingAppointments = await Appointment.find({
    doctorId,
    appointment_date,
  }).sort({ createdAt: 1 });
  
  if (existingAppointments.length >= 10) {
    return next(new ErrorHandler("Doctor is fully booked for the selected day.", 400));
  }
  
  const queuePosition = existingAppointments.length + 1;
  

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
    queuePosition,
    status: "Accepted", // ✅ Automatically accept the appointment
  });
  

  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment sent successfully!",
  });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
  const appointment=await Appointment.find();
  res.status(200).json({
    success:true,
    appointment,
  });
});
export const updateAppointmentStatus=catchAsyncErrors(
  async(req,res,next)=>{
    const{id}=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
      return next(new ErrorHandler("Appointment not found!",404));
    }
    const oldHasVisited=appointment.hasVisited;
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{
      new:true,
      runValidators:true,
      useFindandModify:false,
    });
    if (!oldHasVisited && appointment.hasVisited) {
      const doctorId = appointment.doctorId;
      const appointmentDate = appointment.appointment_date;
      const oldQueuePosition = appointment.queuePosition;
      const nextAppointments = await Appointment.find({
        doctorId,
        appointment_date: appointmentDate,
        hasVisited: false,
        queuePosition: { $gt: oldQueuePosition },
      }).sort({ queuePosition: 1 });
      for (let i = 0; i < nextAppointments.length; i++) {
        nextAppointments[i].queuePosition -= 1;
        await nextAppointments[i].save();
      }
    }
  
    res.status(200).json({
      success:true,
      message:"Appointment Status Updated and queue adjusted!",
      appointment,
    });
  }
);
export const getAppointmentsByPatient = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const appointments = await Appointment.find({ patientId: id });

  if (!appointments || appointments.length === 0) {
    return next(new ErrorHandler("No Appointments found for this patient!", 404));
  }

  res.status(200).json({
    success: true,
    appointments,
  });
});

export const getMyAppointments = catchAsyncErrors(async (req, res, next) => {
  const myAppointments = await Appointment.find({ patientId: req.user._id })
    .populate("patientId", "firstName lastName")
    .populate("doctorId", "firstName lastName");

  const appointmentsWithQueue = await Promise.all(
    myAppointments.map(async (appointment) => {
      const sameDayAppointments = await Appointment.find({
        doctorId: appointment.doctorId._id,
        appointment_date: appointment.appointment_date,
      }).sort({ createdAt: 1 });

      const position = sameDayAppointments.findIndex(
        (a) => a._id.toString() === appointment._id.toString()
      );

      return {
        ...appointment.toObject(),
        queuePosition: position + 1,
        totalInQueue: sameDayAppointments.length,
      };
    })
  );

  res.status(200).json({
    success: true,
    appointments: appointmentsWithQueue,
  });
});

export const deleteAppointment=catchAsyncErrors(async (req,res,next)=>{
  const{id}=req.params;
  const appointment= await Appointment.findById(id);
  if(!appointment){
    return next(new ErrorHandler("Appointment not found!",404));
  }
  await appointment.deleteOne();

  res.status(200).json({
    success:true,
    message:"Appointment Deleted!",
  });
});
