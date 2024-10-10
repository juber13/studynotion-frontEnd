import React from 'react'

import img1 from '../assets/aboutus1.86606deea209badf5925.webp'
import img2 from '../assets/aboutus2.0a1cd797ce3a69e81830.webp'
import img3 from '../assets/aboutus3.f5cfba861877ea03735d.webp'

const About = () => {
  return (
    <div className='main-section w-full height'>
      <div className='about-section flex gap-6 flex-col max-w-3xl m-auto pt-20'>
        <h3 className='text-2xl flex flex-col text-center'>
          Driving Innovation in Online Education for a
          <span className='text'>Brighter Future</span>
        </h3>
        <p className='text-lg font-[300] text-center '>
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </p>

        <div className='images-container flex gap-3'>
            <img src={img1} alt="images" className='w-[250px] object-cover rounded-lg shadow-lg  transition-all duration-1000'/>
            <img src={img2} alt="images" className='w-[250px] object-cover rounded-lg shadow-lg  transition-all duration-1000'/>
            <img src={img3} alt="images" className='w-[250px] object-cover rounded-lg shadow-lg  transition-all duration-1000'/>
        </div>
      </div>
    </div>
  );
}

export default About