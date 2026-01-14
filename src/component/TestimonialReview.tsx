import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward, IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';



interface GalleryInterface {  
  galleryCategory : string;
  galleryTitle : string;
  id: number;
  image : string;
  status : string;
}

interface Props {
  src: GalleryInterface;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const TestimonialReview : React.FC<Props> = ({
  src,
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



  const formatImagePath = (fullPath: string): string => {
        const keyword = "images/";
        const startIndex = fullPath.indexOf(keyword);
        if (startIndex === -1) return "Invalid path";
        const sliceStart = startIndex + keyword.length;
        const shortSegment = fullPath.slice(sliceStart);
        return `${shortSegment}`;
   };

  return (
    <div className="modalOverlay">
      <div className="modalContent">

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
     <div className="positionCenter">
      <div className="testimonyPrevCon flex gap-10">

              <div className="testimonyPrevBody text-sm text-gray-800 mb-3">
                <div className="prevImg">
                <p>{formatImagePath(src.image)}</p>
                <img src={src.image} className="previewImage" />
                </div>
              </div>

             

              <div className="testimonyPrevTitle font-semibold">{src.galleryTitle}</div>

           
                <div className="testimonyPrevPosition text-xs text-gray-500">{src.galleryCategory}</div>
           

            
           </div>
     </div>
           


      {/* ------------------------------- */}
        
        

      </div>
    </div>
  );
};

export default TestimonialReview;
