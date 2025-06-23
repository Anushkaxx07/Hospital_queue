import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#003366', color: '#fff', padding: '3rem 1rem 2rem' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
        
        {/* About Section */}
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Curamed Hospital</h3>
          <p style={{fontSize:'0.95rem'}}>Your health is our top priority.  offers top-tier healthcare with expert professionals and state-of-the-art facilities.</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ flex: '1 1 150px' }}>
          <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
            <li><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a></li>
            <li><a href="/appointment" style={{ color: '#fff', textDecoration: 'none' }}>Book Appointment</a></li>
          </ul>
        </div>

        {/* Departments */}
        <div style={{ flex: '1 1 180px' }}>
          <h4 style={{ marginBottom: '1rem' }}>Departments</h4>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li>Pediatrics</li>
            <li>Cardiology</li>
            <li>Orthopedics</li>
            <li>Neurology</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ flex: '1 1 200px' }} >
          <h4 style={{ marginBottom: '1rem' }}>Contact Us</h4>
          <div className='gt'>
          <p style={{fontSize:"0.95rem"}}><FaMapMarkerAlt /> 123, Health Street, MedCity</p>
          <p style={{fontSize:"0.95rem"}}><FaPhoneAlt /> +91 98765 43210</p>
          <p style={{fontSize:"0.95rem"}}><FaEnvelope /> contact@healcrypt.com</p>

          </div>
         
        </div>
      </div>

      <hr style={{ margin: '2rem 0', borderColor: 'rgba(255,255,255,0.1)' }} />

      <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} Curamed Hospital. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
