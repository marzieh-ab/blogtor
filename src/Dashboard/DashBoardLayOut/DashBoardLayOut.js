import React from 'react';
import { Outlet} from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'

const DashBoardLayOut = () => {
    return (
        <div  className="md:flex md:flex-row-reverse  ">

            <Sidebar/>
            <Outlet  />

           

            
            
        </div>
    );
}

export default DashBoardLayOut;
