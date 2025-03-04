import React from 'react'
import profile from '../assets/Images/profile.png'; 
import Vector from '../assets/Images/Vector.png'
import '../assets/SectionStyles/Sidebar.scss'

const Sidebar = () => {
  return (
   <>
   <div className="sidebar-container">
    <div className="logo">
    <img src={Vector} alt="" />
    </div>
    <div className="user-profile">
     <img src={profile} alt="" />
    </div>
   </div>
   </>
  )
}

export default Sidebar ; 
