import React from 'react'

import img1 from '../assets/aboutus1.86606deea209badf5925.webp'
import img2 from '../assets/aboutus2.0a1cd797ce3a69e81830.webp'
import img3 from '../assets/aboutus3.f5cfba861877ea03735d.webp'

const About = () => {
  return (
    <div className='main-section w-full min-h-screen text-black'>
      <div className='about-section flex gap-8 flex-col max-w-4xl m-auto pt-28 px-4'>
        <h3 className='text-3xl md:text-4xl flex flex-col text-center font-bold '>
          Driving Innovation in Online Education for a
          <span className='text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mt-2'>Brighter Future</span>
        </h3>
        <p className='text-lg md:text-xl font-[300] text-center text-gray-300 leading-relaxed'>
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </p>

        <div className='images-container flex flex-col md:flex-row gap-6 justify-center items-center mt-4'>
            <img src={img1} alt="images" className='w-[300px] h-[200px] object-cover rounded-xl shadow-2xl hover:scale-105 transition-all duration-500 hover:shadow-blue-500/25'/>
            <img src={img2} alt="images" className='w-[300px] h-[200px] object-cover rounded-xl shadow-2xl hover:scale-105 transition-all duration-500 hover:shadow-purple-500/25'/>
            <img src={img3} alt="images" className='w-[300px] h-[200px] object-cover rounded-xl shadow-2xl hover:scale-105 transition-all duration-500 hover:shadow-pink-500/25'/>
        </div>
      </div>
    </div>  );
}

export default About