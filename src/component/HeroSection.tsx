import React from 'react'
import hero1 from '../assets/images/hero1.png'
import hero2 from '../assets/images/hero2.png'
import hero3 from '../assets/images/hero3.png'
import hero4 from '../assets/images/hero4.png'
import mobileHero1 from '../assets/images/mobilehero1.png'
import mobileHero2 from '../assets/images/mobilehero2.png'
import mobileHero3 from '../assets/images/mobilehero3.png'
import mobileHero4 from '../assets/images/mobilehero4.png'
import Carousel from 'react-multi-carousel'
import { NavLink } from 'react-router-dom'

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

 interface dataProp{
   hero  : heroIntern[]
 }

const  HeroSection : React.FC<dataProp> = ({hero}) => {


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
    <div className='hero'>

<Carousel 
      responsive={responsive}
      autoPlay={true}
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      partialVisible={false}
      autoPlaySpeed={10000}
      customTransition="all .5"
      transitionDuration={500}
     >
     
     {
         hero.map((item, index)=>(

            <div className="heroImgCon" key={index}>
           <div className="heroImg">
            <img src={item.image} alt="" />
            <div className="gradientOverlay"></div>
           </div> 
           <div className="heroText">
              <div className="heroHeader"> <h1>{item.headingText}</h1></div>
              <div className="heroBody">{item.subheadingText}</div>
             {
               item.buttonExternalLink ? (
                 <div className="heroBtn">
<a href={`https://${item.buttonExternalLink}`} target="_blank" rel="noopener noreferrer">
  {item.buttonText}
</a>


</div>

               ) : (
                  <div className="heroBtn">
                  <NavLink to={`/${item.buttonLink}`}>{item.buttonText}</NavLink>
                  </div>

               )
             }
              
           </div>
        </div>

         ))
     }
      
        {/* <div className="heroImgCon">
           <div className="heroImg">
            <img src={hero1} alt="" />
            <div className="gradientOverlay"></div>
           </div> 
           <div className="heroText">
              <div className="heroHeader"> <h1>Refine your image.</h1></div>
              <div className="heroBody">Discover the power of intentional presence, because how you’re seen should reflect who you truly are</div>
              <div className="heroBtn"><NavLink to="#">book consultation</NavLink></div>
           </div>
        </div>
        <div className="heroImgCon">
           <div className="heroImg">
            <img src={hero2} alt="" />
            <div className="gradientOverlay"></div>
           </div> 
           <div className="heroText">
              <div className="heroHeader"><h1>Elevate your style.</h1></div>
              <div className="heroBody">Step into a look that speaks your language. Confident, effortless, and entirely you.</div>
              <div className="heroBtn"><NavLink to="#">book consultation</NavLink></div>
           </div>
        </div>
        <div className="heroImgCon">
           <div className="heroImg">
            <img src={hero3} alt="" />
            <div className="gradientOverlay"></div>
           </div> 
           <div className="heroText">
              <div className="heroHeader"><h1>Align your look with your vision.</h1></div>
              <div className="heroBody">Style with strategy. We help you dress for the life, brand, or role you’re building.</div>
              <div className="heroBtn"><NavLink to="#">book consultation</NavLink></div>
           </div>
        </div>
        <div className="heroImgCon">
           <div className="heroImg">
            <img src={hero4} alt="" />
            <div className="gradientOverlay"></div>
           </div> 
           <div className="heroText">
              <div className="heroHeader"><h1>Scent the mood. Live the luxury.</h1> </div>
              <div className="heroBody">Transform your space with rich, refined fragrances that awaken the senses and leave a lasting impression.</div>
              <div className="heroBtn"><NavLink to="#">shop now</NavLink></div>
           </div>
        </div> */}


        </Carousel>
    </div>
  )
}

export default HeroSection