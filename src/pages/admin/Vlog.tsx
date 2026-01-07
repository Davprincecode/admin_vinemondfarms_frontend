import React, { useState } from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import Hero from './component/Hero'
import Testimonial from './component/Testimonial'
import Gallery from './component/Gallery'
import BrandLogo from './component/BrandLogo'
import VlogInstagram from './component/VlogInstagram'
import VlogYoutube from './component/VlogYoutube'



function Vlog() {

  return (
    <div className='admin-dashboard'>
        <AdminTopHeader />

         <div className="flex mainWrapper">
           <SideNavAdmin/> 

           <div className="mainBody">

                <div className="mainBodyDetails vlog-con">
                    <h2 className='vlog-title'>featured vlogs</h2>
                    <VlogInstagram/>
                    <VlogYoutube/>
                </div>
           </div>


         </div>
        

    </div>
  )
}

export default Vlog