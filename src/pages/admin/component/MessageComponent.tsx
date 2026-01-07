import React, { useEffect, useState } from 'react'
import { userAuth } from '../../context/AuthContext';
import AddCourse from './AddCourse';
import PurchaseCourse from './PurchaseCourse';
import AllCourse from './AllCourse';
import AdminTopHeader from '../../../component/AdminTopHeader';
import SideNavAdmin from '../../../component/SideNavAdmin';
import ComposeMessage from '../../../component/ComposeMessage';
import MessageInbox from './MessageInbox';
import MessageFavourite from './MessageFavourite';
import MessageUnread from './MessageUnread';
import MessageSent from './MessageSent';
import { FaEnvelope, FaPlus, FaTv } from 'react-icons/fa';
import { HiOutlineEnvelope, HiOutlinePaperAirplane, HiOutlineStar } from 'react-icons/hi2';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import BroadCastMessage from '../../../component/BroadCastMessage';
import MessageDetails from './MessageDetails';
import { PiFileArchiveFill } from 'react-icons/pi';
import MessageArchive from './MessageArchive';




const headers = [
  { label: 'inbox', icon: <FaEnvelope /> },
  { label: 'unread', icon: <HiOutlineEnvelope /> },
  { label: 'sent', icon: <HiOutlinePaperAirplane /> },
  { label: 'favourite', icon: <HiOutlineStar /> },
  {label : 'archive', icon: <PiFileArchiveFill />}
];


  interface messageIntern {
  id : string;
  address : string;
  email : string;
  is_favorite : boolean;
  is_read : boolean;
  message : string;
   attachment : string;
  name : string;
  createdAt : string;
  phoneNumber : string;
  subject : string;
  onGoing : boolean;
  }


function MessageComponent() {
      
      const [activeTab, setActiveTab] = useState('inbox');
      const [isActive, setIsActive] = useState(false);
      const handleToggle = () => {
        setIsActive(!isActive);
      };   
      const [authAction, setAuthAction] = useState<boolean>(false);   
      const [broadCast, setBroadCast] = useState<boolean>(false);   
      const [msgDetail, setMsgDetail] = useState<boolean>(false);  
      const [messageData, setMessageData] = useState<messageIntern[]>([]); 
      
  return (
    <div  className='admin-dashboard'>

        <AdminTopHeader />

        <div className="flex mainWrapper">
           <SideNavAdmin/> 

    <div className="mainBody">
        {
            msgDetail ? (
                  <MessageDetails setMsgDetail={setMsgDetail} messageData={messageData}/>
            ) : (
              <>
             <div className="admin-shop-header message-shop-header">
                  
                  <div className="composewrapper flex-center gap-10">
                      <div className="create-compose" onClick={() => setAuthAction(!authAction)}>
                        <FiPlus />
                        compose
                    </div>
                    <div className="broadcast flex-center gap-10"  onClick={() => setBroadCast(!broadCast)}>
                        <FaTv />
                        <p>Message <br/> Broadcast List</p>
                    </div>
                  </div>
                

                <div className="message-header-list admin-header-list flex-center gap-10">
                    {headers.map((label, index) => (
                            <div className={`label-flex ${activeTab === label.label ? 'header-list-active' : ''}`}>

                              <div className="label-icon">
                                  {label.icon}
                              </div>

                                <div
                                key={index}
                                className={`header-list`}
                                onClick={() => setActiveTab(label.label)}
                                >
                                {label.label}
                                </div>
                            
                            </div>
                        ))}
                </div>
           </div>

        <div className="course-container">
                {
                 
                    activeTab == 'unread' ? (
                        <MessageUnread   setMsgDetail={setMsgDetail} setMessageData={setMessageData}/>
                    ) : activeTab == 'sent' ? (
                        <MessageSent   setMsgDetail={setMsgDetail} setMessageData={setMessageData}/>
                    ) : activeTab == 'favourite' ? (
                        <MessageFavourite   setMsgDetail={setMsgDetail} setMessageData={setMessageData}/>
                    ) : activeTab == 'archive' ? (
                        <MessageArchive  setMsgDetail={setMsgDetail} setMessageData={setMessageData}/>
                    ) : (
                        <MessageInbox  setMsgDetail={setMsgDetail} setMessageData={setMessageData}/>
                    )
                }
        </div>
        
           </>
            )
        }
         

   </div>


<ComposeMessage  authAction={authAction} setAuthAction={setAuthAction}/>

<BroadCastMessage  broadCast={broadCast} setBroadCast={setBroadCast}/>
           
</div>
</div>
  )
}

export default MessageComponent