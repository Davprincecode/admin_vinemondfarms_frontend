import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Header from '../component/Header'
import HeroSection from '../component/HeroSection'
import HeroContext from '../component/HeroContext'
import Services from '../component/Services'
import Product from '../component/Product'
import Partner from '../component/Partner'
import Testimonies from '../component/Testimonies'
import BookingSection from '../component/BookingSection'
import Blog from '../component/Blog'
import Footer from '../component/Footer'
import Vlog from '../component/Vlog'
import Gallery from '../component/Gallery'
import Youtube from '../component/Youtube'
import { userAuth } from './context/AuthContext'
import { toast } from 'react-toastify'
import CourseSection from '../component/CourseSection'
import ButtonPreloader from '../component/ButtonPreloader'


 interface courseIntern {
    courseDescription : string;
    courseId : string;
    courseImage : string;
    coursePrice : string;
    courseTitle : string;
    courseType : string;
    discountPrice : string;
    earlyBirdEndDate : string;
    earlyBirdPrice : string;
    earlyBirdStartDate : string;
    endDate : string;
    startDate : string;
    status : string;
 }
 interface heroIntern {
      buttonExternalLink : string;
      buttonLink : string;
      buttonText : string;
      headingText : string;
      id : number;
      image : string;
      status : string;
      subheadingText : string;
 }

const LandingPage  = () => {
  const location = useLocation();
  const[hero, setHero] = useState<heroIntern[]>([]);
  const[course, setCourse] = useState<courseIntern[]>([]);
  const {baseUrl, loginAuth, setToken, logInUser}  = userAuth(); 
  const [loading, setLoading] = useState<boolean>(false);
  

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    // console.log(token);
    
    if (token) {
        handleLogin(token);
    }else{
      const error = queryParams.get('error');
      toast.error(error);
    }

  });
      
const handleLogin = async (token : string) => {
localStorage.setItem('myToken', token);
setToken(token);
logInUser();
toast.success("Logged in successfully!");
}

useEffect(() => {
  getData()
  }, []);

const getData = async () => {
    setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        try {
            const response = await fetch(`${baseUrl}/page-api`, requestOptions);
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json(); 
            setHero(result.data.heroSection);
            setCourse(result.data.courseSection);
            setLoading(false);
        } catch (error) {
            
        }
}

return(
<div>
{
  loading && (
      <div className="cart-prealoader">
          <ButtonPreloader/>
      </div>

  ) 
}
  <Header/>
  <HeroSection hero={hero}/>
  <HeroContext/>
  <Services/>
  <CourseSection course={course}/>
  <Product/>
  <Gallery/>
  <Partner/>
  <Testimonies/>
  <BookingSection/>
  <Blog/>
  <Vlog/>
  <Youtube />
  <Footer/>
</div>
)}

export default LandingPage
