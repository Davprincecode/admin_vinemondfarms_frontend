import { useState } from 'react';

import image1 from "../assets/images/IMG_8350.jpg";
import subImage1 from "../assets/images/IMG_8350.jpg";
import image2 from "../assets/images/IMG_8352.jpg";
import subImage2 from "../assets/images/IMG_8352.jpg";
import image3 from "../assets/images/IMG_8354.jpg";
import subImage3 from "../assets/images/IMG_8354.jpg";

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    { src: image1, subSrc: subImage1 },
    { src: image2, subSrc: subImage2 },
    { src: image3, subSrc: subImage3 },
  ];

  const handleNext = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
    <div className="owl-carousel owl-theme">
      <div className="owl-inner">
        {images.map((image, index) => (
          <div key={index} className="owl-item">
            <img src={image.src} alt="carousel image" />
            <img
              src={image.subSrc}
              alt="sub image"
              className="sub-image"
            />
          </div>
        ))}
      </div>
      <button onClick={handlePrev} className="owl-prev">
        &#10094;
      </button>
      <button onClick={handleNext} className="owl-next">
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;