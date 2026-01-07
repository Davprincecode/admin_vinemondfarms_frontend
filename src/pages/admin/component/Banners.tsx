import React, { useEffect, useState } from 'react'
import { IoEyeOutline } from 'react-icons/io5'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { userAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import ButtonPreloader from '../../../component/ButtonPreloader'
import DeletePopup from './DeletePopUp'
import ImagePreviewModal from '../../../component/ImagePreviewModal'

interface galleryInterface{
id : number,
image :  string,
galleryType : string,
status :  string,
}

const Banner = () => {

    const {baseUrl, token} = userAuth();
    const[galleryDesktopImg, setGalleryDesktopImg] = useState<galleryInterface[]>([]);
    const[galleryDesktopSideImg, setGallerydesktopSideImg] = useState<galleryInterface[]>([]);
    const[galleryMobileImg, setGalleryMobileImg] = useState<galleryInterface[]>([]);
    const[galleryImg, setGalleryImg] = useState<galleryInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);    
    const [confirmDelete, setConfirmDelete] = useState<string>('');

   useEffect(() => {
     getImage()
   }, [])
   
 const [dragActive, setDragActive] = useState(false);
 
 const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
   e.preventDefault();
   e.stopPropagation();
   if (e.type === "dragenter" || e.type === "dragover") {
     setDragActive(true);
   } else if (e.type === "dragleave") {
     setDragActive(false);
   }
 };
 
 const handleDrop = (e: React.DragEvent<HTMLDivElement>, galleryType: string) => {
   e.preventDefault();
   e.stopPropagation();
   setDragActive(false);
   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
     handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>, galleryType);
     e.dataTransfer.clearData();
   }
 };

  const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  galleryType: string
) => {
  setLoading(true);
  const imagefile = event.target.files?.[0] || null;

  if (!imagefile) {
    toast.error("No image selected");
    setLoading(false);
    return;
  }

  const image = new Image();
  const objectUrl = URL.createObjectURL(imagefile);
  image.src = objectUrl;

  image.onload = async () => {
    const { width, height } = image;

    const isValid =
      (galleryType === "desktopHeroBanner" && width >= 1260 && height >= 265) ||
      (galleryType === "desktopSideBanner" && width >= 268 && height >= 400) ||
      (galleryType === "mobileHeroBanner" && width >= 330 && height >= 233);

    URL.revokeObjectURL(objectUrl);

    if (!isValid) {
      toast.error(
        `Invalid dimensions for "${galleryType}". Expected size: ${
          galleryType === "desktopHeroBanner"
            ? "1260 x 265" : galleryType === "mobileHeroBanner" ? "330 x 233"
            : "268 x 650"
        }, but got ${width}x${height}`
      );
      setLoading(false);
      return;
    }

    const formdata = new FormData();
    formdata.append("image", imagefile);
    formdata.append("galleryType", galleryType);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${baseUrl}/banner`, requestOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      const result = await response.json();

      if (galleryType === "desktopHeroBanner") {
        setGalleryDesktopImg((prev) => [...prev, result.data]);
      }
      if (galleryType === "desktopSideBanner") {
        setGallerydesktopSideImg((prev) => [...prev, result.data]);
      }
      if (galleryType === "mobileHeroBanner") {
        setGalleryMobileImg((prev) => [...prev, result.data]);
      }

      toast.success("Data Upload Successfully");
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }

    setLoading(false);
  };

  image.onerror = () => {
    toast.error("Failed to load image");
    URL.revokeObjectURL(objectUrl);
    setLoading(false);
  };
};


  const getImage = async () => {
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
                const response = await fetch(`${baseUrl}/banner`, requestOptions);
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result: { data: galleryInterface[] } = await response.json();

                  const desktopHeroBanners = result.data.filter(item => item.galleryType === "desktopHeroBanner");
                  const desktopSideBanners = result.data.filter(item => item.galleryType === "desktopSideBanner");
                  const mobileHeroBanners = result.data.filter(item => item.galleryType === "mobileHeroBanner"); 
                 setGalleryDesktopImg(desktopHeroBanners);
                 setGalleryMobileImg(desktopSideBanners);
                 setGallerydesktopSideImg(mobileHeroBanners);
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

  const formatImagePath = (fullPath: string): string => {
    
    
        const keyword = "images/";
        const startIndex = fullPath.indexOf(keyword);
        
        if (startIndex === -1) return "Invalid path";
        const sliceStart = startIndex + keyword.length;
        const shortSegment = fullPath.slice(sliceStart, sliceStart + 7);
        return `${shortSegment}....`;
   };


 const openModal = (index: number, galleryType : string) =>{
   setCurrentIndex(index);
   setConfirmDelete(galleryType); 
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

   const handleDeleteClick = (id: number, galleryType : string) => {
    setSelectedId(id);
    setShowPopup(true);
    setConfirmDelete(galleryType); 
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
                const response = await fetch(`${baseUrl}/banner/${id}`, requestOptions);
                
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }

                const result = await response.json();
                 if(confirmDelete == "desktopHeroBanner"){ 
                    setGalleryDesktopImg(prev => prev.filter(item => item.id !== id));
                }
                if(confirmDelete == "desktopSideBanner"){
                    setGallerydesktopSideImg(prev => prev.filter(item => item.id !== id));
                }
                if(confirmDelete == "mobileHeroBanner"){
                  setGalleryMobileImg(prev => prev.filter(item => item.id !== id));
                }
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

  return (
  <div>

    <div className="gallery-container-wrapper">

      <div className="gallery-top">
                    <h2>Desktop Hero Banner</h2>
                      <div className="uploadGallery">
                         <div className={`uploadWrapper ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={(e) => handleDrop(e, "desktopHeroBanner")}
                            >
                             {
                                loading ? (
                                    <ButtonPreloader/>
                                ) : (
                                    <>
                                    <label htmlFor="file-input">Add Files</label>
                                        <input id="file-input" type="file" onChange={(e) => handleFileChange(e, "desktopHeroBanner")} />
                                    <p>or drag and drop files</p> 
                                    <p className='size'>1260 x 265 px</p>
                                    </>
                                )
                             }
                         </div>

                          <div className="flex-center justification-between">
                             <div className="imgCounter">
                                {/* 0/10 */}
                             </div>
                             
                          </div>
                      </div>

                      <div className="mainGallery  flex-center">

                        {
                            galleryDesktopImg.map((value, index) => (
                                <div className="image-list-con flex-center gap-10" key={index}>
                                    <IoEyeOutline className='eye' onClick={() => openModal(index,  "desktopHeroBanner")}/>
                                    <p>{formatImagePath(value.image)}</p>
                                <RiDeleteBin6Line className='delete' onClick={() => handleDeleteClick(value.id,  "desktopHeroBanner")}/>
                            </div>
                            ))
                        }
                        
                      </div>

                    

                   

       </div>

         <div className="gallery-container-second-wrapper">

                  {/* ------------------------------------------------ */}
                <div className="gallery-bottom-1">
                            
                              <div className="uploadGallery">
                                <h2>Desktop Side Banner </h2>
                                <div className={`uploadWrapper ${dragActive ? 'drag-active' : ''}`}
                                      onDragEnter={handleDrag}
                                      onDragOver={handleDrag}
                                      onDragLeave={handleDrag}
                                      onDrop={(e) => handleDrop(e, "desktopSideBanner")}
                                   >
                                    {
                                        loading ? (
                                            <ButtonPreloader/>
                                        ) : (
                                            <>
                                            <label htmlFor="file-desktop-side-input">Add Files</label>
                                                <input id="file-desktop-side-input" type="file" onChange={(e) => handleFileChange(e, "desktopSideBanner")} />
                                            <p>or drag and drop files</p> 
                                            <p className='size'>268 x 500 px</p>
                                            </>
                                            
                                        )
                                    }
                                </div>

                                  <div className="flex-center justification-end">
                                    <div className="imgCounter">
                                        {/* 0/10 */}
                                    </div>
                                  </div>
                               </div>

                              <div className="mainGallery  flex-center">

                                {
                                    galleryDesktopSideImg.map((value, index) => (
                                        <div className="image-list-con flex-center gap-10" key={index}>
                                            <IoEyeOutline className='eye' onClick={() => openModal(index, "desktopSideBanner")}/>
                                            <p>{formatImagePath(value.image)}</p>
                                        <RiDeleteBin6Line className='delete' onClick={() => handleDeleteClick(value.id, "desktopSideBanner")}/>
                                    </div>
                                    ))
                                }
                                
                              </div>

                </div>
              {/* ------------------------------------------------ */}

              {/* =========================================== */}
                <div className="gallery-bottom-2">
                    <h2>Mobile Hero Banner</h2>
                      <div className="uploadGallery">
                         <div className={`uploadWrapper ${dragActive ? 'drag-active' : ''}`}
                                      onDragEnter={handleDrag}
                                      onDragOver={handleDrag}
                                      onDragLeave={handleDrag}
                                      onDrop={(e) => handleDrop(e, "mobileHeroBanner")}
                                      >
                             {
                                loading ? (
                                    <ButtonPreloader/>
                                ) : (
                                    <>
                                    <label htmlFor="file-mobile-input">Add Files</label>
                                        <input id="file-mobile-input" type="file" onChange={(e) => handleFileChange(e, "mobileHeroBanner")} />
                                    <p>or drag and drop files</p> 
                                    <p className='size'>330 x 233 px</p>
                                    </>
                                )
                             }
                         </div>

                          <div className="flex-center justification-between">
                             <div className="imgCounter">
                                {/* 0/10 */}
                             </div>
                             
                          </div>
                      </div>

                      <div className="mainGallery  flex-center">

                        {
                            galleryMobileImg.map((value, index) => (
                                <div className="image-list-con flex-center gap-10" key={index}>
                                    <IoEyeOutline className='eye' onClick={() => openModal(index,  "mobileHeroBanner")}/>
                                    <p>{formatImagePath(value.image)}</p>
                                <RiDeleteBin6Line className='delete' onClick={() => handleDeleteClick(value.id,  "mobileHeroBanner")}/>
                            </div>
                            ))
                        }
                        
                      </div>

                    

       </div>
       {/* =========================================================== */}


         </div>

    </div>

     {currentIndex !== null && (
                    <ImagePreviewModal
                    src={    
                      confirmDelete == "desktopHeroBanner" ? 
                      galleryDesktopImg[currentIndex].image :
                     confirmDelete == "desktopSideBanner" ? 
                    galleryDesktopSideImg[currentIndex].image  :
                    galleryMobileImg[currentIndex].image
                }
                    onClose={closeModal}
                    onPrev={goPrev}
                    onNext={goNext}
                    hasPrev={(currentIndex + 1) > 0}
                    hasNext={currentIndex < ( confirmDelete == "desktopHeroBanner" ? 
                      galleryDesktopImg.length - 1 :
                     confirmDelete == "desktopSideBanner" ? 
                    galleryDesktopSideImg.length- 1  :
                    galleryMobileImg.length - 1) }
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

export default Banner