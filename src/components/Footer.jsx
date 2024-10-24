import React from "react";
import { TbWorld } from "react-icons/tb";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";

const Footer = () => {
  return (
    <div className='footer-container bg-[#F8F8F8] p-4'>
      <div className='container w-[90%] max-w-5xl m-auto'>
        <div className='top flex items-center justify-between mt-5 sm:mt-8'>
          <img src='../../images/zomato.avif' alt='' className='w-[120px]' />
          <div className='flex gap-4 flex-col sm:flex-row'>
            <div className='flex items-center gap-2  rounded-md border-gray-300 text-md font-[350] border-2 p-1'>
              <img src='../../images/Flag_of_India.png' className='w-[20px]' />
              <span>India</span>
              <MdKeyboardArrowDown />
            </div>
            <div className='flex items-center gap-2 p-1  font-[350] border-gray-300   rounded-md text-md border-2'>
              <TbWorld className='text-xl' />
              <span>English</span>
              <MdKeyboardArrowDown />
            </div>
          </div>
        </div>

        <div className='main-list grid sm:grid-cols-5 grid-cols-2  gap-6 justify-between mt-6 text-sm mb-16'>
          <div className='flex flex-col gap-1 font-[300]'>
            <a href='#' className='text-md font-normal tracking-[2px]'>
              About study Notion
            </a>
            <a href='#'>Who We Are</a>
            <a href='#'>Blog</a>
            <a href='#'>Work With Us</a>
            <a href='#'>Investor Relations</a>
            <a href='#'>Report Fraud</a>
            <a href='#'>Press Kit</a>
            <a href='#'>Contact Us</a>
          </div>
          <div className='flex flex-col gap-1 font-[300]'>
            <a href='#' className='text-md font-normal tracking-[2px]'>
              ZOMAVERSE
            </a>
            <a href='#'>Zomato</a>
            <a href='#'>Blinkit</a>
            <a href='#'>Feeding India</a>
            <a href='#'>Hyperpure</a>
            <a href='#'>Zomato Live</a>
            <a href='#'>Zomaland</a>
            <a href='#'>Weather Union</a>
          </div>
          <div className='flex flex-col gap-1 font-[300] '>
            <a href='#' className='text-md font-normal tracking-[2px]'>
              FOR RESTAURENTS
            </a>
            <a href='#'>Partner With Us</a>
            <a href='#'>Apps For You</a>
          </div>

          <div className='flex flex-col gap-1 font-[300]'>
            <a href='#' className='text-md font-normal tracking-[2px]'>
              LEARN MORE
            </a>
            <a href='#'>Privacy</a>
            <a href='#'>Security</a>
            <a href='#'>Terms</a>
            <a href='#'>Sitemap</a>
          </div>

          <div className='flex flex-col gap-5 font-[300]'>
            <a href='#' className='text-md font-normal tracking-[2px]'>
              SOCIAL LINK
            </a>
            <span className='flex gap-2 text-xl'>
              <FaInstagramSquare />
              <FaFacebook />
              <FaLinkedin />
              <FaTwitter />
              <FaYoutube />
            </span>
            <img
              src='../../images/23e930757c3df49840c482a8638bf5c31556001144.webp'
              alt=''
              className='w-[120px]'
            />
            <img
              src='../../images/9f0c85a5e33adb783fa0aef667075f9e1556003622.webp'
              alt=''
              className='w-[120px]'
            />
          </div>
        </div>

        <hr className='mt-4 mb-6' />
        <p className='text-xs mt-4 pb-8 text-gray-400'>
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies. All trademarks are
          properties of their respective owners. 2008-2024 © Zomato™ Ltd. All
          rights reserved ,{" "}
          <span className='font-medium'>Love and made By Juber❤️</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
