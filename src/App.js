
import WebLayOut from './Components/WebLayOut/WebLayOut';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import HomePage from './Components/HomePage/HomePage';
import Allblogs from './Components/Allblogs/Allblogs';
import SingleBlog from './Components/SingleBlog/SingleBlog';
import Allusers from './Components/Allusers/Allusers'
import SingleUser from './Components/SingleUser/Singleuser';



import DashBoardLayOut from './Dashboard/DashBoardLayOut/DashBoardLayOut';
import Home from './Dashboard/Home/Home';
import Blogs from './Dashboard/Blogs/Blogs'
import Createblog from './Dashboard/CreateBlog/CreateBlog'
import Editblog from './Dashboard/EditBlog/EditBlog'
import Profile from './Dashboard/Profile/Profile'
import Editprofile from './Dashboard/EditProfile/EditProfile';


import {Route ,Routes} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Routes>
    <Route path="/" element={<WebLayOut/>}>
    <Route path="" element={<HomePage/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="register" element={<Signup/>}/>
    <Route path='allUsers' element={<Allusers/>}/>
    <Route path='singleUser/:id'element={<SingleUser/>}/>
    <Route path='allblogs' element={<Allblogs/>} />
    <Route path='singleblog/:id' element={<SingleBlog/>} />

      


    </Route>

    <Route path="/dashboard" element={<DashBoardLayOut/>}>
          <Route path='' element={<Home/>} />
          <Route path='blogs' element={<Blogs/> } />
          <Route path='createblog' element={<Createblog/>} />
          <Route path='editblog/:id' element={<Editblog/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='editprofile' element={<Editprofile/>} />

       
      

    
     
    </Route>
    <Route path='*' element={<h1>notfound</h1>}/>
  </Routes>
  
  
   
  );
}

export default App;
