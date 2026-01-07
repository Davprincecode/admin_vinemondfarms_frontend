import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import Header from '../component/Header';
import  blogImage from '../assets/images/blog-details1.jpg';
import blogImage1 from '../assets/images/blog-details2.jpg';
import latestblog1 from '../assets/images/lblog1.jpg';
import latestblog2 from '../assets/images/lblog2.jpg';
import latestblog3 from '../assets/images/lblog3.jpg';
import commentImage from '../assets/images/commentImage.jpg';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { FiMessageSquare } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { LuArrowUpRight } from 'react-icons/lu';

function BlogDetails() {
  const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
  return (
    <div className="blog-details pageNav">
      <Header/> 
      <div className="blog-details-con">

        <div className="back-header">
          <NavLink to="#">
            <FaArrowLeft /> 
            <div className="back-title">back</div>
          </NavLink>
        </div>
         
         <div className="blog-details-wrapper">

          <p className='blog-details-header1'>
            image consulting
          </p>
          
          <div className="blog-details-info">
            <h1>The Impact of Technology on the Workplace: How Technology is Changing</h1>

            <div className="flex-center gap-20">
              <div className="flex-center gap-10">
                <FaUserCircle />
                <p>Tracey wilson</p>
              </div>
              <div className="blog-details-date">
                August 20 2025
              </div>
            </div>

            <div className="blog-details-image">
              <img src={blogImage} />
            </div>
             
             <div className="blog-details-content">
                <p>
                  Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.

                   One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.
                </p>
             </div>
 

             <div className="commentCon">

                <div className="flex-center gap-10 commentInputWrapper ">
                  <div className="commentUser">
                    <img src={commentImage} />
                  </div>
                  <div className="commentInputCon flex-center">
                    <div className="commentInput">
                      <input type="text" placeholder='Leave a Comment'/>
                    </div>
                    <div className="post">
                      post
                    </div>
                  </div>
                </div>

                <div className="comment">
                  <div className="commentName flex-center justification-between">
                    <h4>Olivia Booth</h4>
                    <p>Aug 12 2025</p>
                  </div>
                  <div className="commentDetails">
                    In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultricies nibh tristique. 
                  </div>
                  <div className="flex justification-end gap-10 commentControl">
                     <p>Reply</p>
                     <p><AiOutlineLike /> <span>5</span></p>
                     <p><FiMessageSquare /> <span>1</span></p>
                  </div>
                </div>

                <div className="comment anotherComment">
                  <div className="commentName flex-center justification-between">
                    <h4>Olivia Booth</h4>
                    <p>Aug 12 2025</p>
                  </div>
                  <div className="commentDetails">
                    In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultricies nibh tristique. 
                  </div>
                  <div className="flex justification-end gap-10 commentControl">
                     <p>Reply</p>
                     <p><AiOutlineLike /> <span>5</span></p>
                     <p><FiMessageSquare /> <span>1</span></p>
                  </div>
                </div>


                <div className="comment">
                  <div className="commentName flex-center justification-between">
                    <h4>Olivia Booth</h4>
                    <p>Aug 12 2025</p>
                  </div>
                  <div className="commentDetails">
                    In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultricies nibh tristique. 
                  </div>
                  <div className="flex justification-end gap-10 commentControl">
                     <p>Reply</p>
                     <p><AiOutlineLike /> <span>5</span></p>
                     <p><FiMessageSquare /> <span>1</span></p>
                  </div>
                </div>



             </div>
          </div>
         </div>
         
         <div className="blog-details-related">
            <div className="our-latest-blog">

                <div className="our-latest-header flex-center justification-between">
                        <div className="our-latest-title">
                            <h1>Related <span>Topics</span> </h1>
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

      </div>


      <div className="blog-details-pagination">
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
       


    </div>
  )
}

export default BlogDetails