import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'


interface NavBarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}



export default function NavBar({isCollapsed, onToggle} : NavBarProps) {
  return (
    <>
      {!isCollapsed && <nav className='nav-bar'>
        <div className='logo-collapse-btn-container'>
          <Link to='/'>
            <img></img>
          </Link>
          <button onClick={onToggle}></button>
        </div>
        <Link to='/private/home'>Home</Link>
        <Link to='/private/patients'>Patients</Link>
        <Link to='/private/settings'>Settings</Link>
      </nav>}

      {isCollapsed && (
        <nav className='nav-bar-collapsed'>
          <div className='logo-collapse-btn-container'>
            <button onClick={onToggle}></button>
          </div>
          <Link to='/private/home'>home</Link>
          <Link to='/private/patients'>patients</Link>
          <Link to='/private/settings'>settings</Link>
        </nav>)
      }
    </>

  )
}
