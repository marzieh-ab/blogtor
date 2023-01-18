import React, { useState, useEffect } from "react";
 import image from '../../uploads/BlogImage.jpg'
import Cookies from "universal-cookie";
import {Link} from 'react-router-dom'
import { MdOutlineEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';



const cookies = new Cookies();
const token = cookies.get("ut");








export default function Blogs() {

  const [blogs, setBlogs] = useState("");
  const [loading, setLoading] = useState(true);

  
  const fetchUser = () => {
    fetch("http://localhost:4000/blog/my-blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      }
    
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        console.log(data)

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  useEffect(() => {
   
      fetchUser();
   
  }, []);

  if(loading){
    return (<h1>loading...</h1>)

  }

  const deleteArticle=(blogId)=>{
 
    fetch('http://localhost:4000/blog/delete',{
      method:'POST',
      headers: { 'Content-Type': 'application/json', auth: `ut ${token}`  },
      body : JSON.stringify({ blogId}) 
      })
      .then(response => response.json())
      .then(data => {
        fetchUser()
        console.log(data)
       
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }



  return (
    <div>
      <div className="  w-[100%] shadow-lg shadow-[#ccc] p-4  text-center  md:w-[70vw]  mt-4 mx-auto text-3xl">
        <h1 className="capitalize">MYBLOGS</h1>
      </div>
      <div className="mt-5  flex   justify-between items-center flex-wrap p-4">
         { blogs.length>0 
         
         
         ?
         
         blogs.map((item,i)=>{
           return (
            
            <div   key={i} className=" w-[100%] md:w-[30%]   lg:w-[45%]  mt-4 h-[300px] border-[1px] border-[#ccc] ">
              <div className="flex  items-center   justify-center">
                <img
                  src={item.imgurl}
                  
                  className=" w-[50%]  h-[160px]  object-cover"
                  alt=""
                  onError={e => e.target.src =image }
                />
              </div>

              <div className="mt-2">
                <h1 className="text-center">{item.title}</h1>
              </div>

              <div  className="flex  items-center  justify-center p-3">
              <Link   to={`/dashboard/editblog/${item._id}`} className="p-1 w-[70px] bg-[green]  text-[#fff]   flex justify-center  rounded-md  text-center mx-4">
                <MdOutlineEdit/>
                </Link>
              <button   onClick={()=>deleteArticle(item._id)} className="p-1  w-[70px] bg-[red]   flex justify-center text-center  text-[#fff]   rounded-md">
              <MdDeleteOutline />
              </button>
              </div>
             
             

              
            
            </div>
      
        );
         

        })
        :'NOBLOGSYET'
      
      }

      
      


      


      </div>

     
    </div>
  );
}
