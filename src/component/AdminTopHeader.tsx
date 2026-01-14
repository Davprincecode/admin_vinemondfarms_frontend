import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png'


import { toast } from 'react-toastify';
import { IoSearchOutline } from 'react-icons/io5';
import { GoBell } from 'react-icons/go';
import { NavLink } from 'react-router-dom';

const AdminTopHeader = () => {

  return (
    <div>

      <div className="topCon">
        
          <div className="flex-center justification-between adminTopNav">

            <div className="flex-center adminLogoCon">
              
              <NavLink to="">
                <div className="adminTopLogo">
                    <img src={logo} alt="" />
                </div>
              </NavLink>

              
            </div>

          
          

          </div>

      </div>
     
   
    </div>
  )
}

export default AdminTopHeader
