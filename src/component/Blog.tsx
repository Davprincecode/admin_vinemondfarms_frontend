import React, { useState } from 'react'
import blogImg1 from '../assets/images/blogpic1.png'
import blogImg2 from '../assets/images/blogpic2.png'
import blogImg3 from '../assets/images/blogpic3.png'
import { NavLink } from 'react-router-dom'
import ComingSoon from './ComingSoon'

function Blog() {
  
   const [popAction, setPopAction] = useState<boolean>(false);

  return (
    <div className='blog'>
       <ComingSoon popAction={popAction} setPopAction={setPopAction} />
          <div className="blogHeader">
             <h1>Blog</h1>
          </div>
           <div className="blogLatest"><h1>latest posts</h1></div>
          <div className="blogConFlex flex gap-10">

              <div className="blogCon">
                <div className="blogImage">
                    <img src={blogImg1}/>
                </div>
                <div className="blogContent">
                    <div className="blogHeading">
                        Make your Dream a Reality
                    </div>
                    <div className="blogParagh">
                        <p>A few months ago, the phrase “living the dream” felt distant, like it’s something ....</p>
                    </div>
                </div>
              </div>
              
              <div className="blogCon">
                <div className="blogImage">
                    <img src={blogImg2}/>
                </div>
                <div className="blogContent">
                    <div className="blogHeading">
                       Tacky is not a Vibe
                    </div>
                    <div className="blogParagh">
                        <p>As a Lover of Elegance and Defender of Good Taste, let’s talk about a word that ...</p>
                    </div>
                </div>
              </div>

              <div className="blogCon">
                <div className="blogImage">
                    <img src={blogImg3}/>
                </div>
                <div className="blogContent">
                    <div className="blogHeading">
                       I am African Fashion
                    </div>
                    <div className="blogParagh">
                        <p>For the longest time, whenever African fashion was mentioned in conversations or ...</p>
                    </div>
                </div>
              </div>
              


            
          </div>
          
          <div className="blogBottom"  onClick={() => setPopAction(!popAction)}>
               <NavLink to="#">GO TO BLOG</NavLink> 
             </div>
    </div>
  )
}

export default Blog