import React from 'react';

import TopBlog from '../../Components/TopBlog/TopBlog'
import TopUser from '../../Components/TopUser/TopUser'


const HomePage = () => {
    return (
        <div  className=" md:flex md: justify-between  bg-[#eeeeee]  p-8"  >

            <TopBlog/>  
             <TopUser  />
          
          
        </div>
    );
}

export default HomePage;
