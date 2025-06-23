export const getAvailableDoctors = catchAsyncErrors(async (req, res, next) => {
    const { department, appointment_date } = req.query;
  
    if (!department || !appointment_date) {
      return next(new ErrorHandler("Department and appointment date required!", 400));
    }
  
    const doctors = await User.find({ role: "Doctor", doctorDepartment: department });
  
    const availableDoctors = [];
  
    for (const doctor of doctors) {
      const count = await Appointment.countDocuments({
        doctorId: doctor._id,
        appointment_date,
      });
  
      if (count < 10) {
        availableDoctors.push(doctor);
      }
    }
  
    res.status(200).json({
      success: true,
      doctors: availableDoctors,
    });
  });
  