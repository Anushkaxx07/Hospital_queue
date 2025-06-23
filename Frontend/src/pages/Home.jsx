import React from 'react';
import Hero from '../components/Hero';
import Departments from '../components/Departments';
import Biography from '../components/Biography';
import MessageForm from '../components/MessageForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
    <Hero title={"| Welcome to Curamed | Your trusted Healthcare provider"}
    imageUrl={"./images/madam.jpg"}
    />
    <Biography
    imageUrl={"./images/about.png"}
    />
    <Departments/>
    <MessageForm/>
    <Footer/>
      
    </>
  )
  
}

export default Home
