import React from 'react'

const Hero = ({title,imageUrl}) => {
  return (
    <div className='hero container'>
        <div className='banner'>
            <h1>{title}</h1>
            <p>
            Healthcrypt is an advanced hospital management website designed to reduce your wait 
time, enhance your care and reduce your stress. We provide an integrated 
platform to manage your records, appointments and other hospital-related functions, 
ensuring seamless communication between hospital doctors and you.
            </p>

        </div>
        <div className="banner">
            <img src={imageUrl} alt="hero" className='animated-image' />
            <span>
                <img src="./images/Vector.png" alt="vector" />
            </span>
        </div>
      
    </div>
  )
}

export default Hero;

