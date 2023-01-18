import React,{useState,useEffect} from 'react';
import StarRatings from 'react-star-ratings';
import Loading from '../../Components/Loading/Loading';
import Cookies from 'universal-cookie';

import image from '../../uploads/BlogImage.jpg'
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
    const [blog, setBlog] = useState("");
    const [comment,setComment]=useState()
    const [comments,setComments]=useState([])
    const [rate,setRate]=useState()
    const[loading,setLoading]=useState(true)

    let params = useParams()
    let index=params.id
    const cookies = new Cookies();
    const token = cookies.get('ut')


    useEffect(() => {
        fetch(`http://localhost:4000/blog/single-blog/${index}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
             console.log(data,"blog")
            setBlog(data);
            getAllComment()
            setLoading(false)
    
            // console.log(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, []);



      const submitComment =() =>{
        fetch('http://localhost:4000/comment/submit',{
          method:'POST',
          headers: { 'Content-Type': 'application/json', auth: `ut ${token}`  },
          body : JSON.stringify({
            text: comment,
            blogId: index}) 
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
           
            if(data.msg==="bad request: bad inputs")return (alert('error'))
            getAllComment()
        
           
          })
          .catch((error) => {
            console.error('Error:', error);
          });
       
      }


      const getAllComment=()=>{

        fetch(`http://localhost:4000/comment/by-blog/${index}`,{
          method:'GET',
          headers: { 'Content-Type': 'application/json' },
          
        })
        .then(response => response.json())
        .then(data => {
        //   console.log(data)
    
          setComments(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error:', error);
        })
      }

      const changeRate=(rating)=>{

        console.log(rating)



        fetch('http://localhost:4000/blog/submit-rate',{   
          method:'POST',
          headers: { 'Content-Type': 'application/json'  ,auth: `ut ${token}`},
          body : JSON.stringify({   
          blogId: index, 
          score: rating})
        })    
        .then(response => response.json())
        .then(data => {
         
          console.log(data,"rate")
          alert("your submit success")
        
         
          
        })
        .catch((error) => {
          console.error('Error:', error);
       });

       

      }

    
      



      if(loading){
        return (<Loading/>)
      }


    return (
        <div>

<div  className="border-[1px]  rounded-sm  pl-20 mb-5">
            <div  className="my-2">
                <img src={blog.imgurl} alt=""    onError={e => e.target.src =image } className='border-[1px]  rounded-[50%]  w-[200px]  h-[200px]'/>

            </div>

            <div  className='my-2  mx-10'>  
           <StarRatings
            rating={blog.averageScore}
          starRatedColor="yellow"
          numberOfStars={5}
           starDimension="20px"
          starSpacing="5px"
          name='rating'
          starHoverColor="orange"
          starEmptyColor="gray"
          edit={false}
        
          />
          <span>({blog.rateCount})</span>


           </div>
            <h1 className='my-2 mx-10  text-2xl'>{blog.title}</h1>

            <div className='flex space-x-2    my-2  mx-10 '>
            <div className='font-light  text-justify'  dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>
           
          
           <div  className='my-2  mx-10'>  
           <StarRatings
            rating={0}
          starRatedColor="yellow"
          numberOfStars={5}
           starDimension="20px"
          starSpacing="5px"
          name='rating'
          starHoverColor="orange"
          starEmptyColor="gray"
          changeRating={changeRate}
          />


           </div>

    
           


        </div>

        

        <div  className='p-5'>

            
    {token?
    (
      <div>
      <input   onChange={(e)=>setComment(e.target.value)}  type="text" placeholder='Enter Your Comment' className='bg-[#eee]  pl-2 outline-none rounded-lg  block md:w-[79vw] md:h-[3vw]  h-[50px]  w-[100%]'></input>
      <button className='bg-blue-500 md:w-[10vw]  w-[100%]  mt-3 text-[#FEFBF6]  p-2  rounded-lg ' type='submit' onClick={()=>submitComment(comment)}  >Submit</button>
</div>

    )
    :
   ""
      
    
    }

<div className='bg-[#eee] m-2 rounded-md w-[90vw] flex flex-col'>

        
     <div>
        {comments==""?<div className='text-black flex justify-center  w-[100%] p-2 font-bold opacity-30 text-xl'>no comments yet be the first one</div>:
       comments.map((comment)=>{
        return(

            <div className=' flex items-center   border-[1px]  border-b-2' >
            <img className=' rounded-[20vw] w-[3vw] aspect-[4/4] m-2'
                src={comment.user.avatar}

                onError={e => e.target.src =image }
                
                />
            <h3 className='font-bold'>{comment.user.name} :</h3>
            <p className='border-b-[2px]'>{comment.text}</p>
          </div>

        )
       })
        
        }
     



     </div>

</div>

        </div>



          
        </div>
    );
}

export default SingleBlog;
