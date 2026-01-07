import React, { useState } from 'react'
import bookingText from '../assets/images/booktexture.png'
import courseImg from '../assets/images/courseImg.jpg'
import course2 from '../assets/images/blogpic2.png'
import { NavLink } from 'react-router-dom'
import ComingSoon from './ComingSoon';
import Carousel from 'react-multi-carousel';


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

 interface dataProp {
  course : courseIntern[]
 }

const CourseSection : React.FC<dataProp> = ({course}) => {


    const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
    <div className="courseSection">
            <div className="courseHeader">
                courses & masterclasses
            </div>
            <Carousel 
                  responsive={responsive}
                  autoPlay={false}
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  infinite={true}
                  partialVisible={false}
                  autoPlaySpeed={10000}
                  customTransition="all .5"
                  transitionDuration={500}
                 >

        {/* <div className='bookingSection'>
            <div className="rightBooking">
                <img src={courseImg} />
            </div>
        
            <div className="leftBooking" style={{backgroundImage :  `url(${bookingText})`}}>
                <div className="bookingHeader">
                    <h1> <span className='bookSpace'>Style & Colour Masterclass </span></h1>
                </div>
                <div className="bookingBody">
                <h4>Transform Your Style with Expert Guidance</h4>
                    <p>
                    Book a personalized consultation and get tailored advice on fashion,
                    lifestyle, and image enhancement. Whether you need a wardrobe revamp, 
                    personal styling tips, or a complete image makeover, 
                    we’ll help you define a look that reflects confidence,
                    sophistication, and your unique personality. 
                    </p>
                </div>
                <div className="schedule">
                    <NavLink to="/consultant">enroll now</NavLink>  
                </div>
                <div className="allCourses">
                  <NavLink to="#">all courses/masterclasses</NavLink>  
                </div>
            </div>

        
        </div>

        <div className='bookingSection'>
            <div className="rightBooking">
                <img src={course2} />
            </div>
        
            <div className="leftBooking" style={{backgroundImage :  `url(${bookingText})`}}>
                <div className="bookingHeader">
                    <h1> <span className='bookSpace'>Style & Colour Masterclass </span></h1>
                </div>
                <div className="bookingBody">
                <h4>Transform Your Style with Expert Guidance</h4>
                    <p>
                    Book a personalized consultation and get tailored advice on fashion,
                    lifestyle, and image enhancement. Whether you need a wardrobe revamp, 
                    personal styling tips, or a complete image makeover, 
                    we’ll help you define a look that reflects confidence,
                    sophistication, and your unique personality. 
                    </p>
                </div>
                <div className="schedule">
                    <NavLink to="/consultant">enroll now</NavLink>  
                </div>
                <div className="allCourses">
                  <NavLink to="#">all courses/masterclasses</NavLink>  
                </div>
            </div>

        
        </div> */}

        {
          course.map((item, index)=>(
            <div className='bookingSection' key={index}>
            <div className="rightBooking">
                <img src={item.courseImage} />
            </div>
        
            <div className="leftBooking" style={{backgroundImage :  `url(${bookingText})`}}>
                <div className="bookingHeader">
                    <h1> <span className='bookSpace'>{item.courseTitle} </span></h1>
                </div>
                <div className="bookingBody">
                {/* <h4>Transform Your Style with Expert Guidance</h4> */}
                    <p>
                       {item.courseDescription.split(' ').length > 50
                        ? item.courseDescription.split(' ').slice(0, 49).join(' ') + '...' + ' '
                        : item.courseDescription + '...' + ' '}

                        <NavLink to={`/master-course-details/${item.courseId}`}> 
                            Read more..
                        </NavLink>
                    </p>
                </div>
                <div className="schedule">
                    <NavLink to={`/master-course-payment/${item.courseId}`}>enroll now</NavLink>  
                </div>
                <div className="allCourses">
                  <NavLink to="/master-course">all courses/masterclasses</NavLink>  
                </div>
            </div>

        
        </div>
          ))
        }
        
        </Carousel>

    </div>
  )
}

export default CourseSection