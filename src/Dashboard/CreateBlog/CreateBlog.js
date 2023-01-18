import React,{useState,useRef} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';
import image from '../../uploads/BlogImage.jpg'

const cookies = new Cookies();


const CreateBlog = () => {

    const [title,setTitle]=useState("")
    const [img,setImg]=useState("")


    const[content,setContent]=useState("")
   

    const token=cookies.get('ut')
    const editorRef = useRef(null);
    const navigate=useNavigate()

  

   

  

    const createBlog=()=>{
        fetch('http://localhost:4000/blog/write',{
            method:'POST',
            headers: { 'Content-Type': 'application/json', auth: `ut ${token}`  },
            body : JSON.stringify({
              title: title,
              content: (editorRef.current.getContent()),  
              imgurl: img}) 
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              navigate(`/Allblogs`);
            })
            .catch((error) => {
              console.error('Error:', error);
            });

        
       

    }


    return (
        <div className="  w-[100% ]shadow-lg  border-2  md:w-[90%]"  >
            <div className='shadow-lg shadow-[#ccc] p-4  text-center  w-[70vw]  mt-4 mx-auto text-3xl'>
            <h1 className="capitalize" >createblog</h1>
            </div>
            <div  className="p-10    shadow-lg border-[1px]  rounded-lg my-9  w-[60%]  mx-auto ">

                <input type="text"  value={title}  onChange={(e)=>setTitle(e.target.value)} className='w-full p-3  border-[1px]  my-2 rounded-sm  outline-none text-left'  placeholder='title' />
                
                <input   value={img}  onChange={(e)=>setImg(e.target.value)} className='w-full p-3  border-[1px]  my-2 rounded-sm  outline-none text-left'  placeholder='www.example.com' />
       

                <Editor
                onInit={(evt, editor) => editorRef.current = editor}
       
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />

   

    <button  className='bg-blue-500 text-[15px] p-3 text-white w-[200px]  block mx-auto my-4 rounded-xl'  onClick={createBlog} >Create</button>



               
            </div>

         
        </div  >
    );
}

export default CreateBlog;
