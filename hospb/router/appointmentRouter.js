import express from "express";
import { postAppointment,
    updateAppointmentStatus,deleteAppointment ,getAllAppointments,getMyAppointments,getAppointmentsByPatient} from "../controller/appointmentController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"
const router=express.Router();

router.post("/post",isPatientAuthenticated,postAppointment);
router.get("/getall",isAdminAuthenticated,getAllAppointments);
router.get("/my",isPatientAuthenticated,getMyAppointments);
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);
router.get("/myappointments/:id", isPatientAuthenticated, getAppointmentsByPatient);
export default router;