import React, { useState, useEffect } from "react";
import Loading from '../../Components/Loading/Loading';
import {Link} from 'react-router-dom'

import userimg from "../../uploads/download.png";


export default function Allusers() {
  const [users, setUsers] = useState("");
  const[loading,setLoading]=useState(true)

  useEffect(() => {
    fetch("http://localhost:4000/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);

        console.log(data);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if(loading){
    return (<Loading/>)
  }

  return (
    <div>
      <h1 className="text-center text-4xl  my-10">Users</h1>
      <div >

        {users.map((user)=>{
            return(

             

            <Link  to={`/singleUser/${user._id}`} className="  
            flex flex-col justify-center items-center gap-2 w-full
       md:flex md:flex-row md:items-center  md:justify-between md:flex-wrap md:px-3  md:w-[30%] 
            
            border-[1px] rounded-md   md:my-4   sm:space-y-4     ">
                            <div className="     md:flex md:items-center  md:justify-center mx-auto " >
                              <img src={user.avatar} alt="" className="  border-[1px]  w-[200px] h-[200px]  rounded-[50%] mt-3   "    onError={e => e.target.src =userimg }/>
                            </div>
                            <p className="text-center my-4 text-2xl">{user.name}</p>
              
                            <div className="flex items-center  my-4  justify-center">{user.bio}</div>
                            <div className="flex items-center  my-4  justify-center">{user.createdAt}</div>
                          </Link>
              
             

                


            )

        })}
       
           
         
      </div>
    </div>
  );
}
