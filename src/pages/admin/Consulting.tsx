import React, { useState, useEffect} from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import AllBlog from './component/AllBlog';
import EditBlog from './component/EditBlog';
import AddAboutUs from './component/AddAboutUs';
import EditAboutUs from './component/EditAboutUs';
import AllAboutUs from './component/AllAboutUs';
import EditConsulting from './component/EditConsulting';
import AllConsulting from './component/AllConsulting';
import AddConsulting from './component/AddConsulting';
// import GoogleDocsEditor from './component/GoogleDocsEditor';


const headers = ['consulting', 'create consulting'];

function Consulting() {
      const [activeTab, setActiveTab] = useState('consulting'); 
      const [editHero, setEditHero] = useState<boolean>(false);
      const [editId, setEditId] = useState<string>('');

      const heroFunction = () => {
      setEditHero(!editHero);
      }

  const toggleToDefault = () => {
   setActiveTab('consulting');
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
                        activeTab == 'consulting' ? (
                             editHero ? (
                                    <EditConsulting heroFunction={heroFunction} editId={editId} setEditId={setEditId}/>
                                ) : (
                                  <AllConsulting  heroFunction={heroFunction} setEditId={setEditId}/>
                              )

                        ) : (
                          < AddConsulting  toggleToDefault={toggleToDefault}/>
                        )
                    }
                   
                </div>


           </div>
           </div>
           
           </div>
    
  )
}

export default Consulting