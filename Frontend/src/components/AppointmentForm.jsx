import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppointmentForm = () => {
    console.log("Appointment page.........")
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    department: "",
    doctorFirstName: "",
    doctorLastName: "",
    address: "",
    hasVisited: false,
    });

  const departmentsArray = [
    "Pediatrics", "Orthopedics", "Cardiologist", "Neurologist", "Oncologist",
    "Radiology", "Dermatologist", "ENT", "Therapist"
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors", {
        withCredentials: true,
      });
      setDoctors(data.doctors);
    };
    console.log("Dctors", doctors)
    fetchDoctors();
  }, []);

  useEffect(() => {
    console.log("Appointment page doctors", doctors)
  }, [doctors])

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        appointment_date: formData.appointmentDate,
        hasVisited: Boolean(formData.hasVisited),
        doctor_firstName: formData.doctorFirstName,
        doctor_lastName: formData.doctorLastName,
      };

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("formdata: ",data)

      toast.success(data.message);
      navigate('/myappointments', { state: { formData } });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        appointmentDate: "",
        department: "",
        doctorFirstName: "",
        doctorLastName: "",
        address: "",
        hasVisited: false,
      });
    } catch (error) {
        console.log("Error handling appointment: ", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  console.log("console: ", formData)

  return (
    <div className='container form-component register-form'>
      <h2>Appointment</h2>
      <p>Please book your appointment to continue</p>
      <form onSubmit={handleAppointment}>
        <div>
          <input name="firstName" type="text" placeholder='First Name' value={formData.firstName} onChange={handleChange} />
          <input name="lastName" type="text" placeholder='Last Name' value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <input name="email" type="text" placeholder='Email' value={formData.email} onChange={handleChange} />
          <input name="phone" type="number" placeholder='Phone Number' value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <input name="nic" type="number" placeholder='NIC' value={formData.nic} onChange={handleChange} />
          <input name="dob" type="date" placeholder='Date of Birth' value={formData.dob} onChange={handleChange} />
        </div>
        <div>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input name="appointmentDate" type="date" value={formData.appointmentDate} onChange={handleChange} />
        </div>
        <div>
          <select
            name="department"
            value={formData.department}
            onChange={(e) => {
              handleChange(e);
              setFormData((prev) => ({
                ...prev,
                doctorFirstName: "",
                doctorLastName: "",
              }));
            }}
          >
            <option value="">Select Department</option>
            {departmentsArray.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={JSON.stringify({ firstName: formData.doctorFirstName, lastName: formData.doctorLastName })}
            onChange={(e) => {
              const { firstName, lastName } = JSON.parse(e.target.value);
              setFormData((prev) => ({
                ...prev,
                doctorFirstName: firstName,
                doctorLastName: lastName,
              }));
            }}
            disabled={!formData.department}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doc) => doc.doctorDepartment === formData.department)
              .map((doc, index) => (
                <option
                  key={index}
                  value={JSON.stringify({ firstName: doc.firstName, lastName: doc.lastName })}
                >
                  {doc.firstName} {doc.lastName}
                </option>
              ))}
          </select>
        </div>
        <textarea
          name="address"
          rows="10"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: 0 }}>Have you ever visited before?</p>
          <input
            name="hasVisited"
            type="checkbox"
            checked={formData.hasVisited}
            onChange={handleChange}
            style={{ flex: "none", width: "25px" }}
          />
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>Book Appointment</button>
      </form>

      <Link
        state={{ formData }}
        to="/myappointments"
        className="btn"
        style={{
          marginTop: "20px",
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          borderRadius: "5px",
          textDecoration: "none",
          textAlign: "center"
        }}
      >
        View My Appointments
      </Link>
    </div>
  );
};

export default AppointmentForm;
