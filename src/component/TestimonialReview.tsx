import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward, IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';



interface TestimonialInterface {
  id: number;
  fullname: string;
  position: string;
  testimonial: string;
  rating: number;
  status : string;
}

interface Props {
  src: TestimonialInterface;
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
  
  console.log(src);
  
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
              <div className="testimonyPrevBody text-sm text-gray-800 mb-3">{src.testimonial}</div>

              <div className="reviewsStar flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < src.rating  ? (
                        <IoIosStar className="starFilled" />
                      ) : (
                        <IoIosStarOutline className="star" />
                      )}
                    </span>
                  ))}
              </div>

              <div className="testimonyPrevTitle font-semibold">{src.fullname}</div>

              {src.position && (
                <div className="testimonyPrevPosition text-xs text-gray-500">{src.position}</div>
              )}

            
           </div>
     </div>
           


      {/* ------------------------------- */}
        
        

      </div>
    </div>
  );
};

export default TestimonialReview;
