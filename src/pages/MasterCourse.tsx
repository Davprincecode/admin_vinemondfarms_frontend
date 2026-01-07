import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import img1 from '../assets/images/masterclass1.jpg'
import img2 from '../assets/images/masterclass2.jpg'
import { NavLink } from 'react-router-dom'
import Footer from '../component/Footer'
import service from '../assets/images/coursebck.png'
import { FaArrowLeft } from 'react-icons/fa'
import { userAuth } from './context/AuthContext'
import Pagination from '../component/Pagination'
import ButtonPreloader from '../component/ButtonPreloader'
import { toast } from 'react-toastify'
import AuthComponent from '../component/AuthComponent'


interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

interface CourseIntern {
      courseDescription: string;
      courseId: string;
      courseImage: string;
      coursePrice: number;
      courseTitle: string;
      courseType: string;
      discountPrice: string;
      earlyBirdEndDate: string;
      earlyBirdPrice: string;
      earlyBirdStartDate: string;
      endDate: string;
      startDate: string;
      pin : boolean;
      status: string;
}

function MasterCourse() {

        const [courses, setCourses] = useState<CourseIntern[]>([]);
        const [page, setPage] = useState<number>(1);
        const [meta, setMeta] = useState<Meta | null>(null);
         const [authAction, setAuthAction] = useState<boolean>(false);
        const [subNav, setSubNav] = useState<boolean>(false);
        const {baseUrl, signin, token} = userAuth();
        const[loading, setLoading] = useState<boolean>(false);


        // course
        useEffect(() => {
            getData(page)
            }, [page]);
    
      const getData = async (pageNumber : number) => {
          setLoading(true);
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Authorization", token);
              const requestOptions: RequestInit = {
                  method: "GET",
                  headers: myHeaders,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/page-active-course?page=${pageNumber}`, requestOptions);
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();  
                 
                 
                 setCourses(result.data);
                  setMeta(result.meta);
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
          <div className="master-container">

            <div className="ourServicesHeader master-header" style={{backgroundImage : `url(${service})`}}>
            <NavLink to="#" className="backCon">
                <FaArrowLeft />
                <p>back</p>
            </NavLink >

            <div className="ourServiceHeaderCon">
                <div className="ourServiceHeader">
                <h1>Courses & Masterclasses</h1> 
                <div className="dotLineServices"></div>
                </div>

                <div className="ourServiceHeaderDetails">
                     {/* <p>
                     Explore tailored solutions crafted to elevate your style, image, and lifestyle. <span className="desktop-break"></span>
                     Our services are designed to meet your unique needs with precision and creativity.
                    </p>  */}

                    <p>
                        Unlock your potential with interactive courses and masterclasses designed to refine your style, image, and lifestyle. Learn from expert guidance, gain practical skills, and transform your vision into reality.
                    </p>
                </div>

            </div>

          </div>

             <div className="master-body">

                 {
                    loading && (
                        <div className="cart-prealoader">
                            <ButtonPreloader/>
                        </div>

                    ) 
                    }
                    
                     {
                        courses.map((item, index)=> (
                           (index + 1) % 2 === 0 ? (
                                <div className="master-body-flex master2 flex">

                                <div className="master-body-text">
                                    <div className="master-body-title">
                                        {item.courseTitle}
                                    </div>
                                    <div className="master-body-detail">
                                        <p>
                                            {item.courseDescription.split(' ').length > 50
                                            ? item.courseDescription.split(' ').slice(0, 49).join(' ') + '...' + ' '
                                            : item.courseDescription + '...' + ' '}

                                            <NavLink to={`/master-course-details/${item.courseId}`}> 
                                               Read more..
                                            </NavLink>
                                        </p>
                                    </div>

                                    <div className="master-body-footer">

                                        <div className="master-body-date flex-center">
                                            <div className="master-date">date:</div>

                                            <div className="master-date-title flex-center">
                                                <p>{item.startDate}</p>
                                                <span className='dateSpace'>-</span>
                                                <p>{item.endDate}</p>
                                            </div>
                                            
                                        </div>

                                        <div className="master-body-date flex-center">
                                            <div className="master-date">venue:</div>
                                            <div className="master-date-title flex-center">
                                                <p>{item.courseType}</p>
                                            </div>
                                        </div>

                                         {(() => {
                                                    const now = new Date();
                                                    const earlyBirdEnd = new Date(item.earlyBirdEndDate);
                                                    // Calculate difference in milliseconds
                                                    const diffTime = earlyBirdEnd.getTime() - now.getTime();

                                                    // Convert to days
                                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                                    // Result
                                                    const daysLeftText = diffDays > 0 ? `${diffDays} day${diffDays > 1 ? 's' : ''} left` : 'Early bird ended';

                                                    const discount = parseFloat(item.discountPrice);
                                                    const course = item.coursePrice;
                                                    const earlyBird = parseFloat(item.earlyBirdPrice);
                                                      
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
                                                        <NavLink to={`/master-course-payment/${item.courseId}`} className="master-btn">
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

                                    <div className="master-body-image">
                                        <img src={item.courseImage} />
                                </div>

                                </div>
                           )   : (
                                <div className="master-body-flex master1 flex">

                                <div className="master-body-image">
                                        <img src={item.courseImage} />
                                </div>

                                <div className="master-body-text">
                                    <div className="master-body-title">
                                        {item.courseTitle}
                                    </div>
                                    <div className="master-body-detail">
                                        <p>
                                            {item.courseDescription.split(' ').length > 50
                                            ? item.courseDescription.split(' ').slice(0, 49).join(' ') + '...' + ' '
                                            : item.courseDescription + '...' + ' '}

                                            <NavLink to={`/master-course-details/${item.courseId}`}> 
                                               Read more..
                                            </NavLink>
                                        </p>
                                    </div>
                                    <div className="master-body-footer">

                                        <div className="master-body-date flex-center">
                                            <div className="master-date">date:</div>

                                            <div className="master-date-title flex-center">
                                                <p>{item.startDate}</p>
                                                <span className='dateSpace'>-</span>
                                                <p>{item.endDate}</p>
                                            </div>
                                            
                                        </div>

                                        <div className="master-body-date flex-center">
                                            <div className="master-date">venue:</div>
                                            <div className="master-date-title flex-center">
                                                <p>{item.courseType}</p>
                                            </div>
                                        </div>
                                        
                                              {(() => {
                                                    const now = new Date();
                                                    const earlyBirdEnd = new Date(item.earlyBirdEndDate);
                                                    // Calculate difference in milliseconds
                                                    const diffTime = earlyBirdEnd.getTime() - now.getTime();

                                                    // Convert to days
                                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                                    // Result
                                                    const daysLeftText = diffDays > 0 ? `${diffDays} day${diffDays > 1 ? 's' : ''} left` : 'Early bird ended';

                                                    const discount = parseFloat(item.discountPrice);
                                                    const course = item.coursePrice;
                                                    const earlyBird = parseFloat(item.earlyBirdPrice);
                                                      
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
                                                        <NavLink to={`/master-course-payment/${item.courseId}`} className="master-btn">
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

                                </div>
                           )
                        )) 
                     }
                 

            <div className="shop-pagination">
                {meta && <Pagination meta={meta} onPageChange={setPage} />}
            </div>

             </div>


            {
                !signin && (
                    <AuthComponent authAction={authAction} setAuthAction={setAuthAction} setSubNav={setSubNav}/>
                )
            } 

          </div>
          <Footer />
    </div>
  )
}

export default MasterCourse