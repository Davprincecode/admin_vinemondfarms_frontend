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
import AddPayment from './AddPayment';
import { IoSettingsOutline } from 'react-icons/io5';
import ChangePassword from './ChangePassword';



interface PaymentInterface {
  paymentFunction: () => void;
}

const headers = ['password', 'payment'];

const Settings : React.FC<PaymentInterface> = ({ paymentFunction }) =>{
    const [activeTab, setActiveTab] = useState('password');
  const [isActive, setIsActive] = useState(false);
  
    return (
      <div>


         <div className="admin-shop-transactions">

        <div className="admin-shop-header">
        <div className="admin-header-form flex-center gap-10 justification-between">
          <div className="back-con flex-center gap-10" onClick={paymentFunction}>
            <div className="back-left-arrow">
              <IoIosArrowBack />
            </div>
            <p>back</p>
          </div>
          <IoSettingsOutline className="setting-icon" onClick={paymentFunction} />
        </div>
      </div>

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
            activeTab == "password" ? (
               <ChangePassword/>
            )  : (
               <AddPayment/>
            )

           }
                 
         </div>
  
      </div>
    )
}

export default Settings