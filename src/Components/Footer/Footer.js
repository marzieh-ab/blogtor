import React from 'react';
 import { CiFacebook  } from 'react-icons/ci';
import { FiTwitter } from 'react-icons/fi';
import {BsInstagram } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';


const Footer = () => {
    return (

       <>
       <div  className='w-full py-7 h-[100px]  '>
        <div  className='container mx-auto'>
             
        <div  className='md:flex  items-center  block  w-[100%]  '>
            <div  className='md:w-[40%]  flex items-center sm:w-[100%]   md:justify-start  justify-center  '>
                <div  className='w-[40px]  rounded-[50%] h-[40px]  bg-[#333]  text-white  flex items-center justify-center  hover:bg-[#e67e22]  transition-all duration-200  mx-2'>
                <BsInstagram  />
                </div>
                <div  className='w-[40px]  rounded-[50%] h-[40px]  bg-[#333]    text-white  flex items-center justify-center  hover:bg-[#e67e22]  transition-all duration-200  mx-2'>
                <CiFacebook/>
                </div>

                <div  className='w-[40px]  rounded-[50%] h-[40px]  bg-[#333]   text-white  flex items-center justify-center  hover:bg-[#e67e22]  transition-all duration-200  mx-2'>
                
                <FiTwitter/>
                </div>

                <div  className='w-[40px]  rounded-[50%] h-[40px]  bg-[#333]   text-white  flex items-center justify-center  hover:bg-[#e67e22]  transition-all duration-200  mx-2'>
                
                <BsLinkedin/>
                </div>
               
              
                
                


            </div>
            <div  className='md:w-[60%] flex md:justify-end  items-center   justify-center md:text-xl sm:w-[100%]    mt-5  md:mt-0'>

            Created By
            <span  className='text-[#e67e22]  mx-1'> Mr. Web Designer </span>
            |All Rights Reserved

            </div>
        </div>


        </div>
       </div>
       </>
    );
}

export default Footer;
