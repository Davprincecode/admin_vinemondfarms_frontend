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
      title: 'shop',
      link: '/admin/admin-shop',
      icon : <BsShop />
    },
    {
      title: 'consultation',
      link: '/admin/admin-consult',
      icon : <LuUsers />
    },
    {
      title: 'blog',
      link: '/admin/admin-blog',
      icon : <PiNewspaperClippingLight />
    },
    {
      title: 'vlog',
      link: '/admin/vlog-page',
      icon : <GoDeviceCameraVideo />
    },
    {
      title: 'message',
      link: '/admin/admin-message',
      icon : <RxEnvelopeClosed />
    },
   
  ];


interface SideNavProps {
    open: boolean;
    setOpen: (open: boolean) => void;
  }
  


  const SideNavAdmin = () => {

    const {baseUrl, token, role, adminLoading, logout} = userAuth(); 
    const[loading, setLoading] = useState<boolean>(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [shopActive, setShopActive] = useState<boolean>(false);

    useEffect(() => {
      handleStatus();
  }, [])

    const handleStatus = async () => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        try {
            const response = await fetch(`${baseUrl}/shop-status`, requestOptions);
           
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json(); 
            setShopActive(result.status == 'OPEN' ? true : false);
            
                setLoading(false);
        } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
            
        }

        };


    const handleStatusToggle = async (id: string) => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        try {
            const response = await fetch(`${baseUrl}/shop/${id}`, requestOptions);
            
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json(); 
              setShopActive(result.status == 'OPEN' ? true : false);
                setLoading(false);
                toast.success(result.message);
        } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
            
        }

        };

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

            {
              menuItem.title == "shop" && (
                 loading ? (
                    <div className="radio-group">
                      <ButtonPreloader/>
                    </div>
                 ) : (

                 
                  <div className="radio-group">
                      <label className="toggle-switch">
                      <input
                      type="checkbox"
                      checked={shopActive}
                      onChange={() => handleStatusToggle("1")}
                      />
                      <span className="slider"></span>
                      </label>
                  </div> 
                  )
              )
            }



            
        </li>
      ))}

{/* ------------------------------------- */}
      
   </ul>

<div className="nav-bottom">

<div className="help">
  <NavLink to="#" className={({ isActive }) =>
    `${isActive ? 'active-nav' : ''}`
  }>
    <div className="help-flex flex-center">
  <BsQuestionCircle />
  <p>help</p> 
    </div>

  <p className='circle-num'>8</p>
  </NavLink>
</div>
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
