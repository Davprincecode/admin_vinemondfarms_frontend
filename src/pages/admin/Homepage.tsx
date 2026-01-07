import React, { useState } from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import Hero from './component/Hero'
import Testimonial from './component/Testimonial'
import ShopTransaction from './component/ShopTransaction'
import Gallery from './component/Gallery'
import BrandLogo from './component/BrandLogo'

const headers = ['hero sliders', 'gallery', 'brand logos', 'testimonials'];

function Homepage() {

   const [activeTab, setActiveTab] = useState('hero sliders'); 
    
    
  return (
    <div className='admin-dashboard'>
        <AdminTopHeader />

         <div className="flex mainWrapper">
           <SideNavAdmin/> 

           <div className="mainBody">

                <div className="mainHeader flex-center justification-center">
                    <div className="mainHeaderRouteCon flex-center justification-between">
                        {headers.map((label) => (
                            <div
                            key={label}
                            className={`mainHeaderRoute ${activeTab === label ? 'mainHeaderActive' : ''}`}
                            onClick={() => setActiveTab(label)}
                            >
                            {label}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mainBodyDetails">
                    {
                        activeTab == 'gallery' ? (
                              <Gallery />
                        ) : activeTab == 'brand logos' ? (
                             <BrandLogo/>
                        ) : activeTab == 'testimonials' ? (
                            <Testimonial/>
                        ) : (
                            <Hero />
                        )
                    }
                   
                </div>

           </div>


         </div>
        

    </div>
  )
}

export default Homepage