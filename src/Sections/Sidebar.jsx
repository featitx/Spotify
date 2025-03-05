import React from 'react'
import profile from "@assets/Images/profile.png";
import Vector from '@assets/Images/Vector.png'
import '../assets/SectionStyles/Sidebar.scss'

const Sidebar = () => {
  return (
   <>
   <div className="sidebar-container">
    <div className="logo">
    <img src={Vector} alt="logo" />
    </div>
    <div className="user-profile">
     <img src={profile} alt="user" />
    </div>
   </div>
   </>
  )
}

export default Sidebar ; 
