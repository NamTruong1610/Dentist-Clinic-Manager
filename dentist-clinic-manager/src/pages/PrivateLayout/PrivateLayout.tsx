import React, { useEffect, useState } from 'react'
import './PrivateLayout.css'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header';
import { Outlet, useNavigate } from 'react-router';
import type { User } from 'firebase/auth';

interface PrivateLayOutProps {
  user: User | null;
  onSignOut: () => void;
}

export default function PrivateLayout({user, onSignOut} : PrivateLayOutProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);


  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!user) return null;

  return (
    <>
      <div className="private-layout-container">

        <NavBar isCollapsed={isCollapsed} onToggle={handleToggle} />
        <div className='page-header-container'>
          <Header onSignOut={onSignOut}/>
          <Outlet />
        </div>

      </div>
    </>
  )
}

