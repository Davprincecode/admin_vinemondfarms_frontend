import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import invImg from '../../../assets/images/inventoryImg.png'
import { CiSearch } from 'react-icons/ci';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdDelete, MdOutlineArrowDropDownCircle, MdOutlineDelete } from 'react-icons/md';
import PendingOrder from './PendingOrder';
import ConfirmOrder from './ConfirmOrder';
import CancelledOrder from './CancelledOrder';
import DeliveredOrder from './DeliveredOrder';
import ShippedOrder from './ShippedOrder';



const headers = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

function Orders() {
    const [activeTab, setActiveTab] = useState('pending');
  const [isActive, setIsActive] = useState(false);
  
    return (
      <div>
         <div className="admin-shop-transactions">
            <div className="admin-shop-header">
                            <div className="admin-header-list flex-center gap-10">
                                 {headers.map((label) => (
                                        <div
                                        key={label}
                                        className={`header-list ${activeTab === label ? 'header-list-active' : ''}`}
                                        onClick={() => setActiveTab(label)}
                                        >
                                        {label}
                                        </div>
                                    ))}
            
                                   
                            </div>
            </div>
           {
            activeTab == "confirmed" ? (
               <ConfirmOrder/>
            ) : activeTab == "shipped" ? (
                <ShippedOrder/>
            ) : activeTab == "delivered" ? (
                  <DeliveredOrder/>
            ) : activeTab ==  "cancelled" ? (
                 <CancelledOrder/>
            ) : (
               <PendingOrder/>
            )

           }
                 
         </div>
  
      </div>
    )
}

export default Orders