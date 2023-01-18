import React,{useState,useEffect} from 'react'
import Loading from '../../Components/Loading/Loading';
import userimg from "../../uploads/download.png";
import { json, useParams } from 'react-router-dom';
import image from '../../uploads/BlogImage.jpg'
import {Link} from 'react-router-dom'
import StarRatings from 'react-star-ratings';

export default function Singleuser() {

    const[user,setUser]=useState('')
    const [userBlogs, setUserBlogs]=useState('')
    const[loading,setLoading]=useState(true)
    let params = useParams()
    let index=params.id


    const fetchBlogByUser=()=>{
      fetch('http://localhost:4000/blog/by-user',{
        method:"POST",
        headers: { "Content-Type": "application/json" },
         body:  JSON.stringify({_id:index }) 

      }).then(res=>res.json())
      .then(data=>{
        setUserBlogs(data)
        setLoading(false)

      }).catch(error=>{
        console.log(error)

      })
    }


    useEffect(() => {
        fetch(`http://localhost:4000/user/singleUser/${index}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
            fetchBlogByUser()

  
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
        <div  className="border-[1px]  rounded-sm  pl-20 mb-5">
            <div  className="my-2">
                <img src={user.avatar} alt=""    onError={e => e.target.src =userimg } className='border-[1px]  rounded-[50%]  w-[200px]  h-[200px]'/>

            </div>
            <p  className='my-2 mx-10'>{user.name}</p>
            <p  className='my-2  mx-10'>{user.username}</p>
            <p  className='my-2  mx-10'>joinat:{user.createdAt}</p>
          
           <div  className='my-2  mx-10'>  
           <StarRatings
          rating={user.averageScore}
          starRatedColor="yellow"
          numberOfStars={5}
           starDimension="20px"
          starSpacing="5px"
          name='rating'
          />


           </div>

      <div className='flex space-x-2    my-2  mx-10 '>
            <h2 className='text-xl'>{user.bio}</h2>
            </div>
           


        </div>
        <div>
            <h1  className='text-center  text-2xl'>{user.name}'s Blogs:</h1>
            <div  className=' p-2 md:flex  md:items-center md:justify-between md:w-[600px] mx-auto mt-5  gap-2 '>
              {  userBlogs=='' ?<div className='text-black font-bold opacity-30 text-5xl'>No blog</div>
              :
              userBlogs.map((blog)=>{
                console.log(blog)
                
                return(
                  <Link   to={`/singleblog/${blog._id}`} className='flex flex-col justify-center items-center    mt-4  w-full md:w-[30%]  border-[1px]  rounded-sm'>
                     <div className="flex  items-center   justify-center  w[30%]  h-[30%]">
                  <img  

                  className=" w[30%]  h-[30%]"
                    src={blog.imgurl}
                    
                    className=" w-[70%]  h-[160px]  object-cover"
                    alt=""
                    onError={e => e.target.src =image }
                  />
                </div>
                <div className="mt-2">
                  <h1 className="text-center">{blog.title}</h1>
                </div>


                  </Link>
                )

              })}
              
               

            </div>

        </div>


    </div>
  )
}
