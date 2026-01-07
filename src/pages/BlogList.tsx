import React, { useEffect } from 'react'
import { LuArrowUpRight } from 'react-icons/lu'
import { NavLink, useLocation } from 'react-router-dom'
import blogHeader from '../assets/images/blogHeader.png'
import mobileBlogHeader from '../assets/images/mobileBlogHeader.png'
import blog1 from '../assets/images/blog1.jpg'
import blog2 from '../assets/images/blog2.jpg'
import blog3 from '../assets/images/blog3.jpg'
import latestblog1 from '../assets/images/lblog1.jpg'
import latestblog2 from '../assets/images/lblog2.jpg'
import latestblog3 from '../assets/images/lblog3.jpg'
import Header from '../component/Header'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { CiSearch } from 'react-icons/ci'
import { IoSearchOutline } from 'react-icons/io5'
import Footer from '../component/Footer'

function BlogList() {
    const { pathname } = useLocation();
      
      useEffect(() => {
          window.scrollTo(0, 0);
        }, [pathname]);
  return (
    <div className="our-blog pageNav">
        <Header />
        <div className="our-blog-container">

            <div className="our-blog-header" style={{backgroundImage : `url(${blogHeader})`}}>
                {/* <div className="our-blog-header-content">
                    <h1>Check out Articles <br /> we’ve written for you.</h1>

                    <div className="conScroll">
                        <h4>Scroll to explore</h4>
                    </div>
                    
                </div> */}
            </div>

            <div className="our-mobile-header" style={{backgroundImage : `url(${mobileBlogHeader})`}}></div>

            <div className="our-blog-sub-wrapper">

            <div className="our-blog-top-con">

                <div className="our-blog-top-header flex-center justification-between">
                    <div className="our-blog-top-title">
                        <h1>our <span>articles</span> </h1>
                    </div>
                    <div className="our-blog-search">
                        <IoSearchOutline />
                        <input type="text" placeholder='Search Blog'/>
                        <div className="search-blog">search</div>
                    </div>  
                </div>
                

            <div className="our-blog-top flex">

                    <div className="our-blog-main-con">
                        <div className="our-blog-main-image">
                        <img src={blog1} />
                        </div>
                        <div className="our-blog-content">
                            <div className="our-blog-time"><p>10 Min</p></div>
                            <div className="our-blog-title"><h1>Top Trends Shaping Real Estate in 2024</h1></div>
                            <div className="our-blog-body"><p>Stay ahead of the curve! Explore the latest trends influencing the real estate market this year.</p></div>
                            <div className="our-blog-button"><NavLink to="#">Read more <LuArrowUpRight /> </NavLink></div>
                        </div>
                    </div>

                    <div className="our-blog-sub-flex">

                        <div className="our-blog-sub-con flex gap-20">
                            <div className="our-blog-sub-image">
                                <img src={blog2} />
                            </div>
                            <div className="our-blog-content">
                                <div className="our-blog-time"><p>8 Min</p></div>
                                <div className="our-blog-title"><h1>Top Trends Shaping Real Estate in 2024</h1></div>
                                <div className="our-blog-body"><p>Stay ahead of the curve! Explore the latest trends influencing the real estate market this year.</p></div>
                                <div className="our-blog-button"><NavLink to="#">Read More <LuArrowUpRight /> </NavLink></div>
                            </div>
                        </div>

                        <div className="our-blog-sub-con flex gap-20">
                            <div className="our-blog-sub-image">
                                <img src={blog3} />
                            </div>
                            <div className="our-blog-content">
                                <div className="our-blog-time"><p>8 Min</p></div>
                                <div className="our-blog-title"><h1>Top Trends Shaping Real Estate in 2024</h1></div>
                                <div className="our-blog-body"><p>Stay ahead of the curve! Explore the latest trends influencing the real estate market this year.</p></div>
                                <div className="our-blog-button"><NavLink to="#">Read More <LuArrowUpRight /> </NavLink></div>
                            </div>
                        </div>

                    </div>
            </div>  
            </div>

            
            <div className="our-latest-blog">

                <div className="our-latest-header flex-center justification-between">
                        <div className="our-latest-title">
                            <h1>latest <span>blog</span> </h1>
                        </div>
                        <div className="our-latest-arrow flex-center gap-20">
                            <div className="latest-left-arrow">
                                <IoIosArrowBack />
                            </div>
                            <div className="latest-right-arrow">
                                <IoIosArrowForward />
                            </div>
                        </div> 
                </div>

                <div className="our-latest-blog-containers flex gap-20">

                    <div className="our-latest-blog-con">
                        <div className="our-latest-blog-image">
                            <img src={latestblog1} />
                        </div>
                        <div className="our-blog-content">
                            <div className="our-blog-time"><p>10 Min</p></div>
                            <div className="our-blog-title"><h1>Top Trends Shaping Real Estate in 2024</h1></div>
                            <div className="our-blog-body"><p>Stay ahead of the curve! Explore the latest trends influencing the real estate market this year.</p></div>
                            <div className="our-blog-button"><NavLink to="#">Read more <LuArrowUpRight /> </NavLink></div>
                        </div>
                    </div>
                    <div className="our-latest-blog-con">
                        <div className="our-latest-blog-image">
                            <img src={latestblog2} />
                        </div>
                        <div className="our-blog-content">
                            <div className="our-blog-time"><p>10 Min</p></div>
                            <div className="our-blog-title"><h1>Top Trends Shaping Real Estate in 2024</h1></div>
                            <div className="our-blog-body"><p>Stay ahead of the curve! Explore the latest trends influencing the real estate market this year.</p></div>
                            <div className="our-blog-button"><NavLink to="#">Read more <LuArrowUpRight /> </NavLink></div>
                        </div>
                    </div>
                    <div className="our-latest-blog-con">
                        <div className="our-latest-blog-image">
                            <img src={latestblog3} />
                        </div>
                        <div className="our-blog-content">
                            <div className="our-blog-time"><p>10 Min</p></div>
                            <div className="our-blog-title"><h1>Top Trends Shaping Real Estate in 2024</h1></div>
                            <div className="our-blog-body"><p>Stay ahead of the curve! Explore the latest trends influencing the real estate market this year.</p></div>
                            <div className="our-blog-button"><NavLink to="#">Read more <LuArrowUpRight /> </NavLink></div>
                        </div>
                    </div>

                </div>

            </div>
            </div>


            <div className="paginationCon">
                <div className="paginationFlex flex-center gap-10">
                    <div className="paginationArrow">
                        <IoIosArrowBack />
                    </div>
                    <div className="paginationNumber flex-center gap-10">
                        <div className="paginationActive pagination">
                            1
                        </div>
                        <div className="paginationNext pagination">
                            2
                        </div>
                        <div className="pagination">
                            3
                        </div>
                        <div className="pagination">
                            4
                        </div>
                    </div>
                    <div className="paginationArrow">
                        <IoIosArrowForward />
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default BlogList