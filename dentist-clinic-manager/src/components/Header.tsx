import React from 'react'
import './Header.css'

interface HeaderProps {
  onSignOut: () => void;
}

export default function Header({onSignOut} : HeaderProps) {
  return (
    <>
        <div className="header-container">
          <div className="search-noti-container">
            <input type="search" placeholder="Search by Name or Email"></input>
            <div>Bell Logo</div>
          </div>
          <div className="profile-container">
            <div>Profile Pic</div>
            <button type="submit" onClick={onSignOut}>Log Out</button>
          </div>
        </div>
    </>
  )
}
