import React ,{useState,useEffect}from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const token = cookies.get('ut')



const Header = () => {
    const[nav,setNav]=useState(false)
    const [loading,setLoading]=useState(false)
    const [curenuUser,setCurentUser]=useState({})
    const navigate=useNavigate()




    

    const fetchMe=()=>{
      fetch('http://localhost:4000/user/me',{
        method:'POST',
        headers: { 
          'Content-Type': 'application/json',
          auth: `ut ${token}` 
        },
        body :'{}',
      })
      .then(response => response.json())
      .then(data => {
      
       
        console.log(data)
        setCurentUser(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error);
      })
       


    }

    useEffect(()=>{
        if(token){
            console.log("token",token)
            fetchMe()
            console.log(111)
          

        }
        else{
            setLoading(true)
        }
       

    },[])

  


    

    const clickHandler=()=>{
        setNav(!nav)
    }

   
    return (
        <>
        <div  className='p-3  md:shadow-md  '>
           <div className="container  mx-auto bg-white">
            <div  className='flex items-center justify-between'>
                <div className='text-2xl w-[40%]'>
                    <span  className='text-[#e78429]  text-2xl'>b</span>

                     loger
                   
                </div>
                <nav  className='text-[#777]  w-[60%]  md:flex md:justify-end  hidden'>
                    <Link to="/allUsers"  className='mx-5 text-xl capitalize' >Users</Link>
                    <Link to="/allblogs" className='mx-5  text-xl capitalize'>AllBlogs</Link>

                    {token ?
                        <Link to="dashboard"    className='mx-5  text-xl  capitalize  '>{curenuUser.name}</Link>
                        :
                        <Link to="login" className='mx-5  text-xl  capitalize'>Login/Singup</Link>
   
                       
                    }
                    
                 
                   

                </nav>

                <div  onClick={clickHandler} className='md:hidden flex items-center justify-center  w-[40px]  h-[40px] rounded-[50%]  bg-[#eee]  hover:bg-[#e78429]   hover:text-white transition duration-200 relative  '>
                    {nav? <AiOutlineClose  className='text-xl'/>:<AiOutlineMenu  className='text-xl'/>}

                </div>
              
            </div>


           </div>

           
          
        </div>

<nav  className={nav?'text-[#777]   md:hidden  border-t-[1px] mt-4  block border-[#c6c6c6]  w-[100%] ':'hidden'}>
<Link to="/allUsers" className='mx-5 text-base  block  rounded-lg border-[1px]  p-2 bg-[#f7f7f7]  w-[530px] border-[#c6c6c6]  mt-4' >Users</Link>
<Link  to="/allblogs" className='mx-5  text-base block  rounded-lg border-[1px]  p-2 bg-[#f7f7f7]  w-[530px] border-[#c6c6c6] my-2'>AllBlogs</Link>

{token?  
    <Link  to="dashboard"  className='mx-5  text-base   block  rounded-lg border-[1px]  p-2 bg-[#f7f7f7]  w-[530px] border-[#c6c6c6]'>{curenuUser.name}</Link>
:
<Link className='mx-5  text-base   block  rounded-lg border-[1px]  p-2 bg-[#f7f7f7]  w-[530px] border-[#c6c6c6]'>Login/Singup</Link>


}

</nav>
</>
    );
}

export default Header;
