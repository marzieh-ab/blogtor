import React,{useState,useRef,useEffect} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Cookies from 'universal-cookie'
import { useNavigate,useParams } from 'react-router-dom';
import image from '../../uploads/BlogImage.jpg'


const cookies = new Cookies();


const token = cookies.get("ut");


const EditBlog = () => {

    const[title,setTitle]=useState("")
    const[content,setContent]=useState("")
    const [file, setFile] = useState(null);
    const [img,setImg]=useState("")
    
    const[loading,setLoading]=useState(true)
    const editorRef = useRef(null);
    let params = useParams()
    let index=params.id
    const navigate=useNavigate()

  

    const fetchBlog = () => {
        fetch(`http://localhost:4000/blog/single-blog/${index}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          
          },
        
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setTitle(data.title)
            setContent(data.content)
           

    
           
    
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
    
      useEffect(() => {
        if (token) {
          console.log("token", token);
          fetchBlog();
        } else {
          setLoading(true);
        }
      }, []);

      const editBlog=()=>{
        console.log("edit")

        fetch('http://localhost:4000/blog/edit',{
            method:'POST',
            headers: { 'Content-Type': 'application/json', auth: `ut ${token}`  },
            body : JSON.stringify({
                blogId: index,
                data:{
                    title,
                    content,
                    imgurl:img
                }
             
            }) 
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
        <div className="shadow-lg  border-2  w-[90%]"  >
        <div className='shadow-lg shadow-[#ccc] p-4  text-center  w-[70vw]  mt-4 mx-auto text-3xl'>
        <h1 className="capitalize" >EDITBLOG</h1>
        </div>
        <div  className="p-10    shadow-lg border-[1px]  rounded-lg my-9  w-[60%]  mx-auto ">

            <input type="text"   value={title}   onChange={(e)=>setTitle(e.target.value)}className='w-full p-3  border-[1px]  my-2 rounded-sm  outline-none text-left'  placeholder='title' />
            
            <input    value={img}  onChange={(e)=>setImg(e.target.value)}   className='w-full p-3  border-[1px]  my-2 rounded-sm  outline-none text-left'  placeholder='www.example.com' />
   

            <Editor
            initialValue={content}
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



<button  className='bg-blue-500 text-[15px] p-3 text-white w-[200px]  block mx-auto my-4 rounded-xl'  onClick={editBlog}  >Edit</button>



           
        </div>

     
    </div  >
       
    );
}

export default EditBlog;
