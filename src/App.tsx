import { Route, Routes, useLocation} from "react-router-dom";
import { Helmet } from "react-helmet";
import { userAuth } from "./pages/context/AuthContext";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './AppCustom.css'
import './Dashboard.css'
import 'react-multi-carousel/lib/styles.css';
import Login from "./pages/Auth/Login";
import Homepage from "./pages/admin/Homepage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminShop from "./pages/admin/AdminShop";
import Vlog from "./pages/admin/Vlog";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminConsultant from "./pages/admin/AdminConsultant";
import MessageComponent from "./pages/admin/component/MessageComponent";
import AboutUs from "./pages/admin/AboutUs";
import Consulting from "./pages/admin/Consulting";
import Team from "./pages/admin/Team";




function App() {
 
 
 return (

  <div className="app">
      <ToastContainer 
      position="top-right"
      autoClose={3000} 
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
      />
      <Routes>
        
          

          <Route path="/" element={<Login />} />
         


      {/* ====================== admin ================== */}
      
      <Route path="/admin">
         <Route path="admin-dashboard" element={<AdminDashboard/>} />
         
         <Route path="home-page" element={<Homepage/>} />
         <Route path="vlog-page" element={<Vlog/>} />
         <Route path="admin-shop" element={<AdminShop />} />

         <Route path="admin-blog" element={< AdminBlog />} />

         <Route path="about-us" element={< AboutUs />} />
        
         <Route path="admin-message" element={<MessageComponent />} />
         <Route path="admin-consult" element={<Consulting />} />

         <Route path="team" element={<Team />} />
       
      </Route>
      {/* ===================== admin end =================== */}



      </Routes>

  </div>
  )
}

export default App
