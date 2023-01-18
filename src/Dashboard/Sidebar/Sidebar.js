import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { FaStackExchange } from "react-icons/fa";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { BiExit } from "react-icons/bi";
import  Cookies  from 'universal-cookie';
const cookies = new Cookies();
// const token = cookies.get("ut");


// AiOutlineHome
// FaStackExchange
// BsFillPlusSquareFill
// ImProfile
// BiExit

export default function Sidebar() {

  const navigate=useNavigate()
  const logOut = () =>{
    cookies.remove('ut', {path:'/'});
    navigate('/login')
    
  }


  return (
    <div  className='w-[100%] md:w-[20%]    h-screen  shadow-md  shadow-slate'>
      <div>
        <div className='w-[100%]  h-[200px] bg-[#f3f7f9] rounded-t-lg  flex  items-center justify-center p-5' >
          <img src="img/user.png" alt=""   className='w-[100px]  h-[100px] rounded-[50%] '/>
        </div>
        <div>

          <ul  className=''>
            <li  className="p-5 border-b-[1px]  border-[#ccc]  " >
            <Link to="/"  className='flex items-center  flex-row-reverse '>
              <AiOutlineHome   className='ml-4  text-2xl '/>
          
            Home
          </Link>

            </li>
            <li  className="p-5 border-b-[1px]  border-[#ccc]" >
            <Link to="blogs"  className='flex items-center flex-row-reverse '>
              <FaStackExchange  className='ml-4  text-2xl '/>

              Blogs
          
            
          </Link>

            </li>

            <li  className="p-5 border-b-[1px]  border-[#ccc]" >
            <Link to="createblog"  className='flex items-center  flex-row-reverse '>
              <BsFillPlusSquareFill  className='ml-4  text-2xl '/>

              createblog
          
            
          </Link>

            </li>

           

            <li  className="p-5 border-b-[1px]  border-[#ccc]" >
            <Link to="editprofile"  className='flex items-center flex-row-reverse '>
              <ImProfile   className='ml-4 text-2xl '/>

              Editprofile
          
            
          </Link>

            </li>

            <li  className="p-5 border-b-[1px]  border-[#ccc]" >
            <p    className='flex items-center flex-row-reverse  cursor-pointer'>
              <BiExit  className='ml-4 text-2xl '  onClick={logOut} />
            

              Exit
          
            
          </p>

            </li>
          </ul>


        </div>
      </div>

    </div>
  )
}
