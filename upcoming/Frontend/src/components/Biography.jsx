import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="aboutimg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who are we ?</h3>
        <p>
        Welcome to healthcrypt, your trusted hospital management solution designed to simplify healthcare administration and enhance patient care. Our platform integrates advanced technology to streamline appointments, patient records, billing, and staff management, ensuring a seamless experience for hospitals, clinics, and healthcare professionals.




        </p>
        <p>
        At healthcrypt, we believe in efficiency, security, and innovation. Our user-friendly interface and automated workflows reduce paperwork, improve communication, and provide real-time data access, allowing medical professionals to focus on what truly matters – saving lives.
        </p>
        <p>
        Join us in revolutionizing hospital management with smart, reliable, and scalable digital solutions. Healcrypt – Simplifying Healthcare, Enhancing Lives. 🚑💙
        </p>
      </div>
      
    </div>
  )
}

export default Biography
