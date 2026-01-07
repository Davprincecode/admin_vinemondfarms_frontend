import React, { useState, useEffect} from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import Courses from './component/Courses';
import Schedule from './component/Schedule';
import AllBlog from './component/AllBlog';
import BlogEditor from './component/BlogEditor';
import AddBlog from './component/AddBlog';
import EditBlog from './component/EditBlog';
// import GoogleDocsEditor from './component/GoogleDocsEditor';


const headers = ['all blog posts', 'add blog post'];
function AdminConsultant() {
      const [activeTab, setActiveTab] = useState('all blog posts'); 
      const [editHero, setEditHero] = useState<boolean>(false);
      const [editId, setEditId] = useState<string>('');

      const heroFunction = () => {
      setEditHero(!editHero);
      }

  const toggleToDefault = () => {
   setActiveTab('all blog posts');
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
                        activeTab == 'all blog posts' ? (
                             editHero ? (
                                    <EditBlog heroFunction={heroFunction} editId={editId} setEditId={setEditId}/>
                                ) : (
                                  <AllBlog   heroFunction={heroFunction} setEditId={setEditId}/>
                              )

                        ) : (
                          <AddBlog  toggleToDefault={toggleToDefault}/>
                        )
                    }
                   
                </div>


           </div>
           </div>
           
           </div>
    
  )
}

export default AdminConsultant