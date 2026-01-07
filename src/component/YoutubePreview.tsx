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

const YoutubePreview : React.FC<Props> = ({
  data,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  


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

      <div className="modalContent youtubeContent">

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

                

                <div className="youtubeImage">
                  <iframe
                    width="560"
                    height="500"
                    src={`https://www.youtube.com/embed/${data.videoUrl?.split('/').pop()?.split('?')[0] ?? ''}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
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

export default YoutubePreview;
