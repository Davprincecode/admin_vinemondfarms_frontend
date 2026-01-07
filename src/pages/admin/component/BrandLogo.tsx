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
status :  string,
}

function BrandLogo() {


        const {baseUrl, token} = userAuth();
        const[galleryImg, setGalleryImg] = useState<galleryInterface[]>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [image, setImage] = useState<File | null>(null);
        const [showPopup, setShowPopup] = useState(false);
        const [selectedId, setSelectedId] = useState<number | null>(null);
        const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    



    useEffect(() => {
       getImage()
     }, []);

    //  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    //         setLoading(true);
    //       const imagefile = event.target.files?.[0] || null;
  
  
    //               if (!imagefile) {
    //                   console.error("No image selected");
    //                   return;
    //               }
    //           const formdata = new FormData();
    //           formdata.append('image', imagefile);
  
    //           const myHeaders = new Headers();
    //           myHeaders.append("Authorization", token);
    //           const requestOptions: RequestInit = {
    //               method: "POST",
    //               headers: myHeaders,
    //               body: formdata,
    //               redirect: "follow"
    //           };
    //           try {
    //               const response = await fetch(`${baseUrl}/brand-logo`, requestOptions);
    //               if (!response.ok) {
    //               const errorResponse = await response.json();
    //               throw new Error(errorResponse.message);
    //               }
    //               const result = await response.json();    
    //                 setGalleryImg(prev => [...prev, result.data]);
    //                setLoading(false); 
    //                toast.success("Data Upload Successfully");       
    //           } catch (error) {
    //                     setLoading(false);
    //                     if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
    //                     toast.error(error.message);
    //                     } else {
    //                     toast.error('An unknown error occurred.');
    //                     }
    //               setLoading(false); 
    //           }
    // }
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
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
      e.dataTransfer.clearData();
    }
  };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = event.target.files;
    
    if (!files || files.length === 0) {
      toast.error("No images selected");
      setLoading(false);
      return;
    }
    
    const validImages: File[] = [];
    
    for (const file of Array.from(files)) {
      const image = new Image();
      const objectUrl = URL.createObjectURL(file);
    
      image.src = objectUrl;
    
      await new Promise<void>((resolve) => {
        image.onload = () => {
          if (image.width > 1500 || image.height > 1500) {
            // toast.error(`Image "${file.name}" exceeds 1500x1500`);
            validImages.push(file);
          } else {
            validImages.push(file);
          }
          URL.revokeObjectURL(objectUrl);
          resolve();
        };
      });
    }
    
    for (const imageFile of validImages) {
      const formData = new FormData();
      formData.append("image", imageFile);
    
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
    
      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      };
    
      try {
        const response = await fetch(`${baseUrl}/brand-logo`, requestOptions);
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
        const result = await response.json();
        setGalleryImg((prev) => [...prev, result.data]);
        toast.success(`"${imageFile.name}" uploaded successfully`);
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
    }
    
    setLoading(false);
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
                  const response = await fetch(`${baseUrl}/brand-logo`, requestOptions);
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();   
                   setGalleryImg(result.data);
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
          const shortSegment = fullPath.slice(sliceStart, sliceStart + 15);
          return `${shortSegment}....`;
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
                  const response = await fetch(`${baseUrl}/brand-logo/${id}`, requestOptions);
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
  
                  const result = await response.json();
  
                   setGalleryImg(prev => prev.filter(item => item.id !== id));
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
    <h2>brands we have worked with</h2>
    <div className="uploadGallery">
        <div className={`uploadWrapper ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                        >
                 {
                                loading ? (
                                    <ButtonPreloader/>
                                ) : (
                                    <>
                                    <label htmlFor="file-input">Add Files</label>
                                        {/* <input id="file-input" type="file" onChange={handleFileChange} /> */}
                                        <input
                                            id="file-input"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileChange}
                                          />
                                    <p>or drag and drop files</p> 
                                    </>
                                )
                }
        </div>

        <div className="flex-center justification-between">
            <div className="imgCounter">
            {/* 50/100 */}
            </div>
            <div className='view' onClick={() => openModal(0)}>view all</div>
        </div>
    </div>



    <div className="mainGallery  flex-center">
    {
                                galleryImg.map((value, index) => (
                                    <div className="flex-center gap-10" key={index}>
                                        <IoEyeOutline className='eye' onClick={() => openModal(index)}/>
                                        <p>{formatImagePath(value.image)}</p>
                                    <RiDeleteBin6Line className='delete' onClick={() => handleDeleteClick(value.id)}/>
                                </div>
                                ))
                            }
    </div>

            {currentIndex !== null && (
            <ImagePreviewModal
            src={galleryImg[currentIndex].image}
            onClose={closeModal}
            onPrev={goPrev}
            onNext={goNext}
            hasPrev={(currentIndex + 1) > 0}
            hasNext={currentIndex < (galleryImg.length - 1)}
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

export default BrandLogo