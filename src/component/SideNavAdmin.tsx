import React, { useEffect, useState } from 'react'
import { MdHome, MdLogout} from 'react-icons/md';
import { NavLink } from 'react-router-dom'
import { userAuth } from '../pages/context/AuthContext';
import { LuChartNoAxesCombined, LuUsers } from 'react-icons/lu';
import { BsQuestionCircle, BsShop } from 'react-icons/bs';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { RxEnvelopeClosed } from 'react-icons/rx';
import { BiHome } from 'react-icons/bi';
import { PiNewspaperClippingLight } from 'react-icons/pi';
import ButtonPreloader from './ButtonPreloader';
import { toast } from 'react-toastify';
import { FaProductHunt, FaRegUser } from 'react-icons/fa';


interface MenuItem {
    title: string;
    link?: string;
    icon : JSX.Element;
  }
  
  const menuItems: MenuItem[] = [
    {
      title: 'overview',
      link: '/admin/admin-dashboard',
      icon : <LuChartNoAxesCombined />
    },
    {
      title: 'homepage',
      link: '/admin/home-page',
      icon : <BiHome />
    },
    {
      title: 'product',
      link: '/admin/admin-shop',
      icon : <FaProductHunt />
    },
    {
      title: 'team',
      link: '/admin/team',
      icon : <FaRegUser />
    },
    {
      title: 'consultation',
      link: '/admin/admin-consult',
      icon : <LuUsers />
    },
    {
      title: 'about us',
      link: '/admin/about-us',
      icon : <PiNewspaperClippingLight />
    }
    
   
  ];


interface SideNavProps {
    open: boolean;
    setOpen: (open: boolean) => void;
  }
  


  const SideNavAdmin = () => {

    const {adminLoading, logout} = userAuth(); 
  

  return (
    <>

<div className='sidebar'>

{/* sidebar__inner start */}
<div className="sidebar_inner">

  
    <ul className="sidebar_menu">
{/* -------------------------------- */}

{menuItems.map((menuItem, index) => (
        <li key={index} className='sidebar-menu-item'>
      
            <NavLink to={menuItem.link!} className={({ isActive }) =>
              `flex-center gap-20 nav-link sidebar-parent ${isActive ? 'active-nav' : ''}`
            }>

              
              <div className="menuIcon">
                {menuItem.icon}
              </div> 
              <div className="menu-title">{menuItem.title}</div> 
            </NavLink>

           



            
        </li>
      ))}

{/* ------------------------------------- */}
      
   </ul>

<div className="nav-bottom">


{
  adminLoading ? (
    <div className="logout-con" onClick={() => logout()}> 
          <ButtonPreloader />
    </div> 
  ) : (
    <div className="logout-con" onClick={() => logout()}> 
          <NavLink to="#" className="delete">
          <MdLogout />
        <p>log out</p> 
        </NavLink>
    </div> 
  )
}


</div>

</div> 
{/* sidebar__inner end */}


</div>
</>
  )
}

export default SideNavAdmin
