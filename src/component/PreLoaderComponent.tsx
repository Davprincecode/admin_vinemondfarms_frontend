import React from 'react'
import preloaderGif from '../assets/images/provider.gif';

function PreLoaderComponent() {
  return (
    <div className="preloaderWrap">
    <div className="preloaderImg">
        <img src={preloaderGif} alt="" />
    </div>
  </div>
  )
}

export default PreLoaderComponent