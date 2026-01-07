import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { NavLink, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import img from '../assets/images/consultingimages.png'
import { userAuth } from './context/AuthContext'
import ButtonPreloader from '../component/ButtonPreloader'
import { toast } from 'react-toastify'
import AuthComponent from '../component/AuthComponent'



function MasterCourseDetail() {
    const[courseDescription, setCourseDescription] = useState<string>('');
    const[courseId, setCourseId] = useState<string>('');
    const[courseImage, setCourseImage] = useState<string>('');
    const[coursePrice, setCoursePrice] = useState<number>(0);
    const[courseTitle, setCourseTitle] = useState<string>('');
    const[courseType, setCourseType] = useState<string>('');
    const[discountPrice, setDiscountPrice] = useState<string>('');
    const[earlyBirdEndDate, setEarlyBirdEndDate] = useState<string>('');
    const[earlyBirdPrice, setEarlyBirdPrice] = useState<string>('');
    const[earlyBirdStartDate, setEarlyBirdStartDate] = useState<string>('');
    const[endDate, setEndDate] = useState<string>('');
    const[startDate, setStartDate] = useState<string>('');
    const[pin , setPin] = useState<boolean>(false);
    const[status, setStatus] = useState<string>('');
    const [authAction, setAuthAction] = useState<boolean>(false);
    const [subNav, setSubNav] = useState<boolean>(false);


const {baseUrl, signin,  token} = userAuth();
const[loading, setLoading] = useState<boolean>(false);

const { id } = useParams<{ id: string }>();

 useEffect(() => {
            getData()
            }, [id]);
    
      const getData = async () => {
          setLoading(true);
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
            //   myHeaders.append("Authorization", token);
              const requestOptions: RequestInit = {
                  method: "GET",
                  headers: myHeaders,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/page-course/${id}`, requestOptions);
               
                  
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json(); 
              
                     
                    setCourseDescription(result.data.courseDescription);
                    setCourseId(result.data.courseId);
                    setCourseImage(result.data.courseImage);
                    setCoursePrice(result.data.coursePrice);
                    setCourseTitle(result.data.courseTitle);
                    setCourseType(result.data.courseType);
                    setDiscountPrice(result.data.discountPrice);
                    setEarlyBirdEndDate(result.data.earlyBirdEndDate);
                    setEarlyBirdPrice(result.data.earlyBirdPrice);
                    setEarlyBirdStartDate(result.data.earlyBirdStartDate);
                    setEndDate(result.data.endDate);
                    setStartDate(result.data.startDate);
                    setPin(result.data.pin);
                    setStatus(result.data.status);
                  setLoading(false);
              } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                  
              }
      }


       const authFunction = () => {
        setAuthAction(true);
      }
      
  return (
    <div className='master-con-wrapper pageNav'>
          <Header/>

          <div className="master-container master-container-details">
            
            <div className="master-back-header">
                    <div className="back-header">
                            <NavLink to="/master-course">
                                <FaArrowLeft /> 
                                <div className="back-title">back</div>
                            </NavLink>
                    </div>
            </div>

            <div className="master-details">  

                  {
                    loading && (
                        <div className="cart-prealoader">
                            <ButtonPreloader/>
                        </div>

                    ) 
                    }
                    
                <div className="master-details-title">
                    {courseTitle}
                </div> 
                
                <div className="master-image-flex">
                    <div className="master-details-image">
                    <img src={courseImage} alt="" />
                    </div>
                </div>
                

                <div className="master-details-body">
                    <p>
                      {courseDescription}
                    </p>
                </div>

                <div className="master-body-footer">
                
                            <div className="master-body-date flex-center">
                                <div className="master-date">date:</div>

                                <div className="master-date-title flex-center">
                                    <p>{startDate}</p>
                                    <span className='dateSpace'>-</span>
                                    <p>{endDate}</p>
                                </div>
                                
                            </div>
                
                                                <div className="master-body-date flex-center">
                                                    <div className="master-date">venue:</div>
                                                    <div className="master-date-title flex-center">
                                                        <p>{courseType}</p>
                                                    </div>
                                                </div>
                
                                                 {(() => {
                                                    const now = new Date();
                                                    const earlyBirdEnd = new Date(earlyBirdEndDate);
                                                    // Calculate difference in milliseconds
                                                    const diffTime = earlyBirdEnd.getTime() - now.getTime();

                                                    // Convert to days
                                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                                    // Result
                                                    const daysLeftText = diffDays > 0 ? `${diffDays} day${diffDays > 1 ? 's' : ''} left` : 'Early bird ended';

                                                    const discount = parseFloat(discountPrice);
                                                    const course = coursePrice;
                                                    const earlyBird = parseFloat(earlyBirdPrice);
                                                      
                                                    if (now <= earlyBirdEnd) {
                                                    return (
                                                                <div className="master-body-date  date-data flex">
                                                                    <div className="early-bird">
                                                                    <h1 className='early-bird-title'>
                                                                    early bird : 
                                                                    <div className="day-left">{daysLeftText}</div>  
                                                                    </h1>
                                                                    <h1>₦{earlyBird.toLocaleString()}</h1>
                                                                    </div>
                                                                    <div className="course-price">
                                                                    <p>course price</p>
                                                                    <h1>₦{course.toLocaleString()}</h1>
                                                                    </div>
                                                                </div>
                                                    );
                                                    } else if (!isNaN(discount) && discount !== 0) {
                                                    return (
                                                        <div className="master-body-date date-data flex-center">
                                                            <div className="discount-offer">
                                                            <p>
                                                            discount offer
                                                            </p>
                                                            <h1>₦{discount.toLocaleString()}</h1>
                                                            </div>
                                                            <div className="course-price line-through">
                                                            <p>course price</p>
                                                            <h1>₦{course.toLocaleString()}</h1>
                                                            </div>
                                                        </div>
                                                    );
                                                    } else {

                                                    return (
                                                        <div className="master-body-date date-data flex-center">
                                                            <div className="normal-course-price">
                                                            <p>course price</p>
                                                            <h1>₦{course.toLocaleString()}</h1>
                                                            </div>
                                                        </div>
                                                    );

                                                    }
                                                })()}
                
                                               

                                            {
                                            signin ? ( 
                                                <NavLink to={`/master-course-payment/${courseId}`} className="master-btn">
                                            enrol now
                                            </NavLink>
                                            ) : (
                                                <div className="master-btn" 
                                                onClick={authFunction} >
                                                    enrol now
                                                </div>
                                            )
                                            }

                
                </div>

            </div>   

            {
                !signin && (
                    <AuthComponent authAction={authAction} setAuthAction={setAuthAction} setSubNav={setSubNav}/>
                )
            } 


             </div>
    </div>
  )
}

export default MasterCourseDetail