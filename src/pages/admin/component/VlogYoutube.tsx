import React, { useEffect, useState } from 'react'
import { IoIosStar } from 'react-icons/io'
import { IoEyeOutline } from 'react-icons/io5'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { userAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import ButtonPreloader from '../../../component/ButtonPreloader';
import DeletePopup from './DeletePopUp';
import TestimonialReview from '../../../component/TestimonialReview';
import InstagramPreview from '../../../component/InstagramPreview';
import YoutubePreview from '../../../component/YoutubePreview';



interface instagramInterface {
    id: number;
    title : string;
    videoUrl : string;
    status : string;
}


const VlogYoutube = () => {

        const {baseUrl, token} = userAuth();
        const [loading, setLoading] = useState<boolean>(false);
        const [showPopup, setShowPopup] = useState(false);
        const [selectedId, setSelectedId] = useState<number | null>(null);
        const [currentIndex, setCurrentIndex] = useState<number | null>(null);
        const [instagram, setInstagram] = useState<instagramInterface[]>([]);
        const [vlogTitle, setVlogTitle] = useState<string>('');
        const [videoLink, setVideoLink] = useState<string>('');

      useEffect(() => {
           getReview()
         }, [])

           
        const handleReview = async () => {
                  setLoading(true);
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", token);
                    myHeaders.append("Content-Type", "application/json");
                    const raw = JSON.stringify({
                        'title' : vlogTitle,
                        'videoUrl' : videoLink, 
                    });
                    
                    const requestOptions: RequestInit = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };
                    try {
                        const response = await fetch(`${baseUrl}/youtube`, requestOptions);
                        
                        if (!response.ok) {
                        const errorResponse = await response.json();
                        throw new Error(errorResponse.message);
                        }
                        const result = await response.json();    
                        setInstagram(prev => [...prev, result.data]);
                        setLoading(false); 
                        setVlogTitle("");
                        setVideoLink("");
                        toast.success("Data Upload Successfully");       
                    } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                    }
        }

        const getReview = async () => {
            setLoading(true);
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", token);
                const requestOptions: RequestInit = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };
                try {
                    const response = await fetch(`${baseUrl}/youtube`, requestOptions);
                    if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message);
                    }
                    const result = await response.json(); 
                    setInstagram(result.data);
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


  const handleDeleteClick = (id: number) => {
      setSelectedId(id);
      setShowPopup(true);
    };
  
    const handleDeleteConfirm = async(id: number | string) => {
       setLoading(true);
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Authorization", token);
              const requestOptions: RequestInit = {
                  method: "DELETE",
                  headers: myHeaders,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/youtube/${id}`, requestOptions);  
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
  
                  const result = await response.json();
  
                   setInstagram(prev => prev.filter(item => item.id !== id));

                  setShowPopup(false);
                  setSelectedId(null);
                  setLoading(false);
  
                  toast.error("delete successfully");
  
              } catch (error) {
                  setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
              }
    };


    const openModal = (index: number) =>{
      setCurrentIndex(index); 
    } 

    const closeModal = () =>{
    setCurrentIndex(null); 
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


  return (
    <div style={{marginTop : "40px"}}>
        <h2 className='vlog-instagram'>youtube</h2>
        <div className="admin-testimonial-form">

      <div className="admin-input">
        <label>Title</label>
        <input
          type="text"
          value={vlogTitle}
          onChange={(e) => setVlogTitle(e.target.value)}
          placeholder="Enter Vlog Title"
        />
      </div>

      <div className="admin-input">
        <label>Video Link</label>
        <input
          type="text"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          placeholder="Enter Title"
        />
      </div>

     


        {
            loading ? (
                <div className="admin-input">
                    <button className='inActive'><ButtonPreloader/></button>
                </div>
            ) : (
                <div className="admin-input" onClick={handleReview}>
                    <button>Publish</button>
                </div>
            )
        }
      

      <div className="mainGallery flex-center">
            {instagram.map((value, index) => (
            <div className="flex-center gap-10" key={value.id}>
                <IoEyeOutline className="eye" onClick={()=> openModal(index)}/>
                <p>{value.title}</p>
                <RiDeleteBin6Line
                className="delete"
                onClick={() => handleDeleteClick(value.id)}
                style={{ cursor: "pointer" }}
                />
            </div>
            ))}
      </div>
    </div>


                  {currentIndex !== null && (
                    <YoutubePreview
                    data={instagram[currentIndex]}
                    onClose={closeModal}
                    onPrev={goPrev}
                    onNext={goNext}
                    hasPrev={(currentIndex + 1) > 0}
                    hasNext={currentIndex < (instagram.length - 1)}
                    />
                    )} 

                    <DeletePopup
                        isOpen={showPopup}
                        itemId={selectedId ?? ""}
                        onCancel={() => setShowPopup(false)}
                        onDelete={handleDeleteConfirm}
                    />

    </div>
  )
}

export default VlogYoutube