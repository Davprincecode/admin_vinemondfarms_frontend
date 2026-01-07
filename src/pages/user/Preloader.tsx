import React from 'react'
import preloaderGif from '../../assets/images/provider.gif';

function Preloader() {
  return (
    <div className="preloaderWrap">
    <div className="preloaderImg">
        <img src={preloaderGif} alt="" />
    </div>
  </div>
  )
}

export default Preloader
