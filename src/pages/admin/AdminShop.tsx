import React, { useState } from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'

import ShopTransaction from './component/ShopTransaction'
import Banners from './component/Banners';
import AllProduct from './component/AllProduct';
import AddProduct from './component/AddProduct';
import Orders from './component/Orders';
import AddPayment from './component/AddPayment';
import { useParams } from 'react-router-dom';
import Settings from './component/Settings';


const headers = ['all product', 'add product'];

function AdminShop() {
    
    const { param } = useParams();
   const [activeTab, setActiveTab] = useState('all product'); 
   const [paymentActive, setPaymentActive] = useState<boolean>(false);

   const paymentFunction = () => {
    setPaymentActive(!paymentActive);
   }

 const toggleToDefault = () => {
   setActiveTab('all product');
  }
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
                        
                        activeTab == 'add product' ? (
                            <AddProduct toggleToDefault={toggleToDefault}/>
                            
                        ) : (
                            <AllProduct /> 
                        ) 
                    }
                   
                </div>

           </div>


         </div>
        

    </div>
  )
}

export default AdminShop