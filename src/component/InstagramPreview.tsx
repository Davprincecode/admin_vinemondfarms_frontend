import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward, IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';



interface instagramInterface {
    id: number;
    title : string;
    videoUrl : string;
    status : string;
}

interface Props {
  data: instagramInterface;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const InstagramPreview : React.FC<Props> = ({
  data,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  

useEffect(() => {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    }, []);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasPrev, hasNext]);


  return (
    <div className="modalOverlay">

      <div className="modalContent instagramContent">

        <div className="closeBtn" onClick={onClose}>
          <RxCross1 />
        </div>

        <div className="navBtnFlex">
            {hasPrev && (
                    <div className="navBtn left" onClick={onPrev}>
                        <IoIosArrowBack />
                    </div>
                    )}

            {hasNext && (
            <div className="navBtn right" onClick={onNext}>
                <IoIosArrowForward />
            </div>
            )}
        </div>

     {/* ---------------------- */}
   

            
                    <div className="vlogCon">

                <div className="vlogImage">
                      <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={data.videoUrl}
                      data-instgrm-version="14"
                      style={{ width: '100%', margin: 'auto' }}
                      ></blockquote>
                </div>

                <div className="vlogContent">
                    <div className="vlogHeading">
                        {data.title}
                    </div>                   
                </div>
              </div>


              

       
      {/* ------------------------------- */}
        
        

      </div>
    </div>
  );
};

export default InstagramPreview;
