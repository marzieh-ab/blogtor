import React,{useState,useEffect} from 'react';
import userimg from "../../uploads/download.png";
import Loading from '../../Components/Loading/Loading'

import { AiOutlineClockCircle } from 'react-icons/ai';

// 

const TopBlog = () => {

    const[topBlog,setTopBlog]=useState()
  const [loading ,setLoading]=useState(true)


  useEffect(()=>{
    fetch('http://localhost:4000/blog/top-blogs',{
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data=>{
      console.log(data)
      setTopBlog(data)
      setLoading(false)
    })
    .catch((error)=>console.log(error))



  },[])

  if (loading) {return <Loading/>}



    return (
        <div  className='md:w-[60%]  sm:w[100%] '>

          <div  className='w-[100%] '> 
          {topBlog.map((blog)=>{
            return(
                <div  className='w-[100%]  p-4  my-5 bg-[#fff]  border-[1px]  border-[#eee]  rounded-[5px]'>
                <div  className='w-[100%]  ' >
                 <img src={blog.imgurl} alt=""  className='w-[300]  h-[300px]  object-fit' onError={e => e.target.src =userimg } />
                </div>
                <div  className='text-[#f4c062] text-xs  flex items-center '>
                    <AiOutlineClockCircle  className='mr-2'/>
                    {blog.createdAt.substr(0,10)}
                  

                </div>
                <div  className='font-bold my-3'>{blog.title}</div>
                <div  className='font-light  text-[#777]' dangerouslySetInnerHTML={{ __html: blog.content }}></div>
 
             </div>

            )

           })}

          </div>
           
        </div>
    );
}

export default TopBlog;
