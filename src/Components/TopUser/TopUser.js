import React,{useEffect,useState} from 'react'
import userimg from "../../uploads/download.png";
import Loading from '../../Components/Loading/Loading'
import {Link} from 'react-router-dom';



export default function TopUser() {

  const[topuser,setTopUser]=useState()
  const [loading ,setLoading]=useState(true)


  useEffect(()=>{
    fetch('http://localhost:4000/user/top-users',{
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data=>{
      
      setTopUser(data)
      setLoading(false)
    })
    .catch((error)=>console.log(error))



  },[])

  if (loading) {return <Loading/>}



  return (
    <div  className='md:w-[30%]  sm:w[100%] '>

        <div  className=' rounded-[20px]   border-[1px ]  border-[#00000033]  shadow-md '>
            <div  className='text-center p-4  text-[#fff]  bg-[#333333] rounded-t-md' >Popular Users</div>
            <div  className='bg-[#fff]   '>
              {topuser.map((user)=>{
                return(
                  <Link   to={`singleUser/${user._id}`} className='ml-7  flex items-center mb-3'>

                  <img src={user.avatar} alt=""    className='w-[50px] border-[2px]   border-[#e78429] h-[50px ]  rounded-[50%]  mt-2' onError={e => e.target.src =userimg } />
                  <p  className='ml-5  hover:text-[#e78429]   font-bold transition-all duration-200'>{user.username}</p>
                  
                  </Link>

                )

              })}
               

                 
                  
               
            </div>



        </div>
    </div>
  )
}
