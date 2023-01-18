import React,{useState} from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom';

import Cookies from 'universal-cookie'
const cookies = new Cookies();


export default function Login() {

  const[userName, setUserName]= useState()
const[password, setPassword]= useState()

const navigate=useNavigate()



const loginUser=async()=>{
  console.log("login")

  fetch("http://localhost:4000/user/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: userName,
        password
    })
}).then(res=>res.json())
.then(data=>{
  if(data.token){

    cookies.set('ut',data.token,{path: '/'})
    window.location.assign("http://localhost:3000")
    // navigate('/')
  }

  else{
    if(data.msg=="bad request: no such user exists"){
      return alert("plese register")
    }else if(data.msg="password doesnt match"){
      return alert("passwor wrong")

    }else{
      return alert("password doesnt match")
    }

  }
})

 


}
  return (

    <div  className="h-screen bg-[#7fbc5d]  w-scrren  flex items-center justify-center">

           

    <div className='bg-white  w-[360px]  h-[300px]  p-10  text-center' >

        <input type="text"   value={userName}   onChange={(e)=>setUserName(e.target.value)} placeholder='username' className='  bg-[#f2f2f2]  mb-5 p-2  w-[275px] outline-none'/>
        <input type="password"   value={password}   onChange={(e)=>setPassword(e.target.value)} placeholder='password' className='  bg-[#f2f2f2]  mb-5  p-2 w-[275px]  outline-none' />
        <button  className='  bg-[#7ebc5c]  text-white p-2  w-[275px]'   onClick={loginUser}>Login</button>

        <p  className='mt-4  text-[#b3b3b3] text-[12px] '>Not registered?
{/* 
        <a href=""  className='text-[#4CAF50]'> Create an account</a> */}
          <Link to='/register'  className='text-[#4CAF50]'> Create an account</Link>
        
        </p>
    </div>
    
    
</div>
   
  )
}
