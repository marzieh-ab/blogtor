import React ,{useState}from 'react';
import Cookies from 'universal-cookie'
import {Navigate, useNavigate} from 'react-router-dom';

const cookies = new Cookies();


const Signup = () => {

    const [userName,setUserName]=useState('')
    const [name,setName]=useState('')

    const navigate=useNavigate()
    

    const registerNewUser= ()=>{

        console.log(userName,name)
        console.log(1)
        // return
        fetch("http://localhost:4000/user/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userName,
                name
            })
        })
         .then(res => res.json())
         .then(data=>{
           
            if(data.token){
                cookies.set('ut',data.token,{path: '/'})

                // navigate('/')
                window.location.assign("http://localhost:3000")

            }else{
            if(data.msg=="this username already exists in the database"){
                return alert("this username already exists in the database")

            }else{
                return alert("complete all input")
            }

            }
         })
      

    }


    return (
        <div  className="h-screen bg-[#7fbc5d]  w-scrren  flex items-center justify-center">

           

            <div className='bg-white  w-[360px]  h-[300px]  p-10  text-center' >

                <input  value={userName}  onChange={(e)=>setUserName(e.target.value)} type="text"  placeholder='username' className='  bg-[#f2f2f2]  mb-5 p-2  w-[275px] outline-none'/>
                <input  value={name}  onChange={(e)=>setName(e.target.value)} type="text"  placeholder='name' className='  bg-[#f2f2f2]  mb-5  p-2 w-[275px]  outline-none' />
                <button  className='  bg-[#7ebc5c]  text-white p-2  w-[275px]'  onClick={registerNewUser}>singup</button>
            </div>
            
            
        </div>
    );
}

export default Signup;
