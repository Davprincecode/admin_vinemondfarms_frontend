import React from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import { MdDelete } from 'react-icons/md'
import { CiSearch } from 'react-icons/ci'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoIosStar } from 'react-icons/io'
import profile from '../../assets/images/profile.png'

function Message() {
  return (
    <div className='admin-dashboard'>

            <div className="admin-header-form  flex-center gap-10 justification-between">
    
                <div className="flex-center gap-10">
                    <div className="header-form-filter">
                        <select name="" id="">
                            <option value="">Filter</option>
                        </select>
                    </div>
                    <div className="header-form-input">
                        <input type="text" placeholder='Search' />
                        <CiSearch />
                    </div>
                </div>
                    <MdDelete className='delete'/>
            </div>

            <div className="admin-message-body">

              <div className="admin-message-con">

                 <div className="admin-message-header flex-center justification-between">
                    <h2>support</h2>
                    <p>posted at 12pm</p>
                 </div>

                 <div className="admin-message-body">
                    <div className="admin-message-icon flex justification-between">
                        <div className="admin-message-container">
                          <div className="admin-message-title">
                            How to deposit money to my portal?
                          </div>
                          <div className="admin-message">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, 
                          consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>
                        </div>
                        <BsThreeDotsVertical />
                    </div>
                 </div>

                 <div className="admin-message-footer flex-center justification-between">
                     <div className="admin-message-user flex-center gap-5">
                         <div className="admin-profile">
                           <img src={profile} alt="" />
                         </div>
                        <p>John Snow</p>
                     </div>

                     <div className="admin-star">
                      <IoIosStar />
                     </div>

                     {/* <div className="starFilled">
                      <IoIosStar />
                     </div> */}

                 </div>

              </div>

            </div>

    </div>
    
  )
}

export default Message