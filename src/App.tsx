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
import Register from "./pages/Auth/Register";
import ConfirmEmail from "./pages/ConfirmEmail";
import RedirectForm from "./pages/Auth/RedirectForm";
// import ForgetPassword from "./pages/Auth/ForgetPassword";
// import ChangePassword from "./pages/Auth/ChangePassword";
// import VerifyOtp from "./pages/Auth/VerifyOtp";
import LandingPage from "./pages/LandingPage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import OurServices from "./pages/OurServices";
import Notification from "./component/Notification";

import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import AnimatedShuffleList from "./pages/AnimatedShuffleList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Consultant from "./pages/Consultant";
import ConsultantDetails from "./pages/ConsultantDetails";
import VerifyPayment from "./pages/payment/VerifyPayment";
import Homepage from "./pages/admin/Homepage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Profile from "./pages/user/Profile";
import AdminShop from "./pages/admin/AdminShop";
import Vlog from "./pages/admin/Vlog";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminConsultant from "./pages/admin/AdminConsultant";
import BookingCalendars from "./pages/BookingCalendars";
import MasterCourse from "./pages/MasterCourse";
import MasterCourseDetail from "./pages/MasterCourseDetail";
import MasterCoursePayment from "./pages/MasterCoursePayment";
import MessageComponent from "./pages/admin/component/MessageComponent";
import VerifyCoursePayment from "./pages/payment/VerifyCoursePayment";
import Shops from "./pages/Shops";
import RichEditorTest from "./pages/admin/RichEditorTest";
import RichEditorTest2 from "./pages/admin/RichEditorTest2";
import TextEditor from "./pages/admin/TextEditor";
import TextEditor2 from "./pages/admin/TextEditor2";




function App() {
 

const {baseUrl} = userAuth();

 const location = useLocation();

const scheduleToggle = () => {
         
    }
 
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
         
         {/* <Route path="blog-test-editor" element={<RichEditorTest/>} />

         <Route path="blog-test" element={<RichEditorTest2/>} />
         <Route path="new-blog-test" element={<TextEditor/>} />
         <Route path="new-blog-test2" element={<TextEditor2/>} /> */}


         <Route path="home-page" element={<Homepage/>} />
         <Route path="vlog-page" element={<Vlog/>} />
         <Route path="admin-shop" element={<AdminShop />} />
         <Route path="admin-shop/:param" element={<AdminShop />} />
         <Route path="admin-blog" element={< AdminBlog />} />
         {/* <Route path="admin-blogs" element={< BlogEditor />} /> */}
         <Route path="admin-message" element={<MessageComponent />} />
         <Route path="admin-consult" element={<AdminConsultant />} />
         {/* <Route path="admin-schedule" element={<AddSchedule scheduleToggle={scheduleToggle}/> } /> */}
      </Route>
      {/* ===================== admin end =================== */}



      </Routes>

  </div>
  )
}

export default App
