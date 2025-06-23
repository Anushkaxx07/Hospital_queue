import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Departments = () => {
  const departmentArray = [
    { name: "Pediatrics", imageUrl: "./images/pedi.jpeg" },
    { name: "Orthopedics", imageUrl: "./images/orth.jpg" },
    { name: "Cardiologist", imageUrl: "./images/card.jpg" },
    { name: "Neurologist", imageUrl: "./images/neur.jpg" },
    { name: "Oncologist", imageUrl: "./images/onc.jpg" },
    { name: "Radiology", imageUrl: "./images/rad.jpg" },
    { name: "Dermatologist", imageUrl: "./images/dermat.jpg" },
    { name: "ENT", imageUrl: "./images/entt.jpg" },
    { name: "Therapist", imageUrl: "./images/ther.jpg" },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className='container departments'>
      <h2>Departments</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        transitionDuration={1000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        showDots={false}
      >
        {
          departmentArray.map((depart, index) => (
            <div
              className="card department-card"
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={depart.imageUrl}
                alt={depart.name}
                className="department-img"
              />
              <div className="depart-name">{depart.name}</div>
            </div>
          ))
        }
      </Carousel>
    </div>
  );
};

export default Departments;
