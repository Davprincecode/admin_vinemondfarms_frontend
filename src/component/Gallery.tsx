import React, { useEffect, useRef, useState } from 'react'
import gallery1 from '../assets/images/gallery1.png'
import gallery2 from '../assets/images/gallery2.png'
import gallery3 from '../assets/images/gallery3.png'
import gallery4 from '../assets/images/gallery4.png'
import gallery5 from '../assets/images/gallery5.png'
import gallery6 from '../assets/images/gallery6.png'
import gallery7 from '../assets/images/gallery7.png'
import gallery8 from '../assets/images/gallery8.png'
import gallery9 from '../assets/images/gallery9.png'
import ImagePreviewModal from './ImagePreviewModal'
import { LiaEyeSolid } from 'react-icons/lia'
import { userAuth } from '../pages/context/AuthContext'
import ButtonPreloader from './ButtonPreloader'
import { toast } from 'react-toastify'



function Gallery() {

   const allImages = [
    gallery1
  ];

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [images, setImages] = useState(allImages);
  const [fade, setFade] = useState(true); 
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  const {baseUrl} = userAuth();
       const [loading, setLoading] = useState<boolean>(false);
      //  const [data, setData] = useState<vlogIntern[]>([]); 
       
        useEffect(() => {
                getData()
                }, []);
       
           const getData = async () => {
               setLoading(true);
                   const myHeaders = new Headers();
                   myHeaders.append("Content-Type", "application/json");
                   const requestOptions: RequestInit = {
                       method: "GET",
                       headers: myHeaders,
                       redirect: "follow"
                   };
                   try {
                       const response = await fetch(`${baseUrl}/page-gallery`, requestOptions);
                       if (!response.ok) {
                       const errorResponse = await response.json();
                       throw new Error(errorResponse.message);
                       }
                       const result = await response.json(); 
                     
                       
                          const updatedImages = [...allImages];

                          result.data.forEach((item: { image: string }, index: number) => {
                          // if (item.image && index < updatedImages.length) {
                          updatedImages[index] = item.image;
                          // }
                          });
                        //  console.log(updatedImages);
                         
                          setImages(updatedImages);
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

  const openModal = (index: number) =>{
   setCurrentIndex(index); 
   stopInterval();
  } 

  const closeModal = () =>{
   setCurrentIndex(null); 
   startInterval();
  } 

  const goPrev = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goNext = () => {
    if (currentIndex !== null && currentIndex < 17) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const startInterval = () => {
    if (intervalRef.current) return; // already running
    intervalRef.current = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setImages((prev) => shuffleArray(prev));
        setFade(true); // fade in after shuffle
      }, 500);
    }, 5000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };


// Fisher-Yates shuffle
  const shuffleArray = (array: string[]) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, []);
  

  return (
    <div className="gallery">
        <div className="galleryHeader">
            <h1>Gallery</h1>
            <p>jobs, features, masterclasses & picture portfolio</p>
        </div>
            {
            loading && (
            <div className="cart-prealoader">
              <ButtonPreloader/>
            </div>

            ) 
            }
            
        <div className= {`galleryWrapper  flex gap-10 galleryContainer ${fade ? "fade-in" : "fade-out"}`}>

            <div className="galleryCon">
               <div className="gallery1 galleryImg">
                <img src={images[0]} />
                <div className="preview" onClick={() => openModal(0)}><LiaEyeSolid /></div>
              </div>
               <div className="flex justification-between gap-10">
                <div className="gallerycons">
                    <div className="gallery2 galleryImg">
                        <img src={images[1]} />
                    <div className="preview" onClick={() => openModal(1)}><LiaEyeSolid /></div>
                    </div>
                    <div className="gallery3 galleryImg">
                        <img src={images[2]} />
                        <div className="preview" onClick={() => openModal(2)}><LiaEyeSolid /></div>
                    </div>
                </div>
                <div className="gallery4 galleryImg">
                    <img src={images[3]} />
                    <div className="preview" onClick={() => openModal(3)}><LiaEyeSolid /></div>
                    </div>
               </div>
            </div>

            <div className="galleryCon">
                 <div className="flex justification-between gap-10">
                    <div className="gallery5 galleryImg">
                        <img src={images[4]}/>
                        <div className="preview" onClick={() => openModal(4)}><LiaEyeSolid /></div>
                    </div>
                    <div className="gallery6 galleryImg">
                        <img src={images[5]}/>
                        <div className="preview" onClick={() => openModal(5)}><LiaEyeSolid /></div>
                    </div>
                 </div>
                 <div className="gallery7 galleryImg">
                    <img src={images[6]}/>
                    <div className="preview" onClick={() => openModal(6)}><LiaEyeSolid /></div>
                </div>
                 <div className="flex justification-between gap-10">
                    <div className="gallery8 galleryImg">
                        <img src={images[7]}/>
                        <div className="preview" onClick={() => openModal(7)}><LiaEyeSolid /></div>
                    </div>
                    <div className="gallery9 galleryImg">
                        <img src={images[8]}/>
                        <div className="preview" onClick={() => openModal(8)}><LiaEyeSolid /></div>
                    </div>
                 </div>
            </div>
        </div>

        <div className={`galleryMobileWrapper galleryContainer ${fade ? "fade-in" : "fade-out"}`}>

            <div className="mobileGalleryCon flex justification-between">
                 <div className="mobileConWrapper">
                        <div className="flex mobileGa">
                           <div className="mobileGallery1">
                            <img src={images[0]} />
                            <div className="preview" onClick={() => openModal(0)}><LiaEyeSolid /></div>
                            </div>
                           <div className="mobileGallery2">
                            <img src={images[1]} />
                            <div className="preview" onClick={() => openModal(1)}><LiaEyeSolid /></div>
                            </div> 
                        </div>
                        <div className="mobileGallery3">
                            <img src={images[2]} />
                            <div className="preview" onClick={() => openModal(2)}><LiaEyeSolid /></div>
                        </div>
                 </div>
                <div className="mobileGallery4">
                    <img src={images[3]} />
                    <div className="preview" onClick={() => openModal(3)}><LiaEyeSolid /></div>
                    </div>
            </div>


            <div className="mobileGalleryCon gap-10 flex justification-between">

                  <div className="mobile1wrap flex-center justification-between">
                    <div className="mobile1">
                        <div className="mobileGallery5">
                            <img src={images[4]} />
                            <div className="preview" onClick={() => openModal(4)}><LiaEyeSolid /></div>
                            </div>
                        <div className="mobileGallery6">
                            <img src={images[5]} />
                            <div className="preview" onClick={() => openModal(5)}><LiaEyeSolid /></div>
                            </div>
                    </div> 

                   <div className="mobileGallery7">
                    <img src={images[6]} />
                    <div className="preview" onClick={() => openModal(6)}><LiaEyeSolid /></div>
                    </div>
                  </div>
                    
                   

                   <div className="mobile2">
                        <div className="mobileGallery8">
                            <img src={images[7]} />
                            <div className="preview" onClick={() => openModal(7)}><LiaEyeSolid /></div>
                            </div>
                        <div className="mobileGallery9">
                            <img src={images[8]} />
                            <div className="preview" onClick={() => openModal(8)}><LiaEyeSolid /></div>
                            </div>
                   </div>

            </div>


        </div>
        
        <div className="flex-center justification-center galleryview">
            <div className="galleryBottom" onClick={() => openModal(0)}>view more</div>
        </div>


        {currentIndex !== null && (
        <ImagePreviewModal
          src={images[currentIndex]}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < images.length - 1}
        />
      )}
        
    </div>
  )
}

export default Gallery