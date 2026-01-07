import React, { useState, useEffect} from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import Courses from './component/Courses';
import Schedule from './component/Schedule';
import AddSchedule from './component/AddSchedule';
import EditSchedule from './component/EditSchedule';


const headers = ['schedules', 'courses'];
function AdminConsultant() {

    const [activeTab, setActiveTab] = useState('schedules'); 

    const [createSchedule, setCreateSchedule] = useState('default'); 

    const [relBookingId, setRelBookingId] = useState<string>('');
      
    const scheduleToggle = (data : string) => {
         setCreateSchedule(data);
     }

const toggleToDefault = () => {
   setActiveTab('schedules');
//    setCreateSchedule(!createSchedule);
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
                        activeTab == 'courses' ? (
                              <Courses />
                        ) : (
                                
                            createSchedule == 'create' ? (
                                <AddSchedule scheduleToggle={scheduleToggle} toggleToDefault={toggleToDefault}/>
                            ) : createSchedule == 'edit' ? (
                                <EditSchedule scheduleToggle={scheduleToggle} toggleToDefault={toggleToDefault} relBookingId={relBookingId}/>
                            ) : (
                                <Schedule scheduleToggle={scheduleToggle} relBookingId={relBookingId} setRelBookingId={setRelBookingId}/>
                            )                        
                            
                        )
                    }
                   
                </div>


           </div>
           </div>
           
           </div>
    
  )
}

export default AdminConsultant