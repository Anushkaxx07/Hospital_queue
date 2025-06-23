import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import './MyAppointments.css';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const location = useLocation();
  const { formData } = location.state || {};

  useEffect(() => {
    const fetchMyAppointments = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/appointment/my", {
          withCredentials: true,
        });
        console.log("Appointments from backend:", data.appointments);
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error(error.response?.data?.message || "Failed to fetch appointments");
      }
    };

    fetchMyAppointments();
  }, []);
  const updateAppointmentStatus = async (appointmentId) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status: "Accepted" },
        { withCredentials: true }
      );
      toast.success("Appointment status updated to Accepted");
      fetchMyAppointments(); // Refresh data
    } catch (error) {
      console.error("Failed to update appointment:", error);
      toast.error("Failed to update status");
    }
  };

  // Get only the latest (last) appointment
  const currentAppointment = appointments.length > 0 ? appointments[appointments.length - 1] : null;
  const slotTime = currentAppointment
  ? new Date(
      new Date().getTime() + 45 * 60000 * (currentAppointment.queuePosition - 1)
    )
  : null;
  return (
    <div className="text-center mt-10">
      <div
        style={{
          padding: '20px',
          border: '2px dashed #94d2bd',
          borderRadius: '12px',
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#e0fbfc',
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '10rem',
        }}
      >
        <span
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#333',
            fontFamily: 'sans-serif',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          👤 Welcome:
          <p style={{ color: '#0a9396', marginTop: '5rem' }}>
            {formData?.firstName} {formData?.lastName}
          </p>
        </span>

        {currentAppointment ? (
          <div
            style={{
              borderBottom: '1px solid #ccc',
              marginBottom: '15px',
              paddingBottom: '15px',
              textAlign: 'left',
              backgroundColor: '#fefae0',
              padding: '10px',
              borderRadius: '8px',
              marginTop: '2rem',
            }}
          >
            <strong>
              👨‍⚕️ Dr. {currentAppointment.doctor?.firstName} {currentAppointment.doctor?.lastName}
            </strong>
            <br />
            🏥 Department: {currentAppointment.department}
            <br />
            📅 Date:{' '}
            {currentAppointment.appointment_date
              ? new Date(currentAppointment.appointment_date).toLocaleDateString()
              : 'N/A'}
            <br />
            ✅ Visited: {currentAppointment.hasVisited ? 'Yes' : 'No'}
            <br />
            📌 Status:{' '}
            <strong
              style={{
                color: currentAppointment.status === 'Accepted' ?  'green':'#ff6f61' ,
              }}
            >
              {currentAppointment.status}
            </strong>
            <br />
            ⏳ Queue Position: {currentAppointment.queuePosition} / {currentAppointment.totalInQueue}
            {currentAppointment.status !== 'Accepted' && (
  <button
    onClick={() => updateAppointmentStatus(currentAppointment._id)}
    style={{
      backgroundColor: '#0a9396',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      marginTop: '1rem',
      cursor: 'pointer',
    }}
  >
    Accept Appointment
  </button>
)}

          </div>
        ) : (
          <p>No current appointments found.</p>
        )
        }
   <p
  style={{
    borderBottom: '1px solid #ccc',
    marginBottom: '15px',
    paddingBottom: '15px',
    textAlign: 'left',
    backgroundColor: '#fefae0',
    padding: '10px',
    borderRadius: '8px',
    marginTop: '2rem',
  }}
>
  The current patient who is being treated is Patient 1 <br />
  ⏰ Time: {new Date().toLocaleTimeString()}
</p>


{slotTime && (
  <p
    style={{
      borderBottom: '1px solid #ccc',
      marginBottom: '15px',
      paddingBottom: '15px',
      textAlign: 'left',
      backgroundColor: '#fefae0',
      padding: '10px',
      borderRadius: '8px',
      marginTop: '2rem',
    }}
  >
    Your slot would probably be around ⏰ Time: {slotTime.toLocaleTimeString()}
  </p>
)}



        
      </div>
    </div>
  );
}

export default MyAppointments;
