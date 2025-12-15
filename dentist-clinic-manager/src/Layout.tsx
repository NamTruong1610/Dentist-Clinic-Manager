import React, { useEffect, useState } from 'react'
import './Layout.css'
import NavBar from './components/NavBar'
import Header from './components/Header';
import { Outlet } from 'react-router';


export default function PrivateLayout(){
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);


  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <div className="private-layout-container">

        <NavBar isCollapsed={isCollapsed} onToggle={handleToggle} />
        <div className='page-header-container'>
          <Header />
          <Outlet />
        </div>

      </div>
    </>
  )
}

