import React from 'react'
import { NavLink } from 'react-router-dom'

function HeroContext() {
  return (
    <div className='aboutUsLandingPage'>
      <div className="aboutUsLandingPageHeader">
        <h1>about us</h1>
      </div>
      <div className="aboutUsLandingPageBody">
        <p>
      Loveafrik is a style-forward fashion, lifestyle, and image consulting company dedicated to helping individuals and brands express their most authentic and elevated selves. Rooted in a deep understanding of personality, preferences, and perception, we guide our clients in curating a powerful and polished image that aligns with how they wish to be seen.
      We specialize in uncovering and refining each client’s unique style identity—<span className="hr">whether the goal is confident, elegant, playful, luxurious, or effortlessly classy—while staying true to their originality. Our signature services include:
          <br />
          • Colour and style consultation
          <br />
          • Personal styling (for both men and women) 
      </span>


<span><NavLink to='/about-us'>Read more</NavLink></span> 
        </p>
      </div>
     
    </div>
  )
}

export default HeroContext