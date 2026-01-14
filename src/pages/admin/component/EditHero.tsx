import React, { useEffect, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import envelop from '../../../assets/images/envelop.png'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaFileArrowUp } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { userAuth } from '../../context/AuthContext';
import ButtonPreloader from '../../../component/ButtonPreloader';
import { IoIosArrowBack } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';

interface HeroInterface {
  heroFunction: () => void;
  editId : string;
  setEditId : (id : string) => void;
}

const EditHero : React.FC<HeroInterface> = ({ heroFunction, editId, setEditId }) => {     
        const {baseUrl, token} = userAuth();
        const [loading, setLoading] = useState<boolean>(false);
        const [bannerImage, setBannerImage] = useState<File | null>(null);
        const [existingImages, setExistingImages] = useState<string>(); 
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
                    
             const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                     const file = e.target.files?.[0];
                     if (!file) {
                         toast.error("No image selected");
                         return;
                     }
             
                     const image = new Image();
                     const objectUrl = URL.createObjectURL(file);
                     image.src = objectUrl;
             
                     image.onload = () => {
                        //  if (image.width > 1440 || image.height > 802) {
                        //  toast.error(`Image "${file.name}" exceeds 1440 x 802`);
                        //  URL.revokeObjectURL(objectUrl);
                        //  return;
                        //  }
             
                         setBannerImage(file);
                         setExistingImages('');
                         URL.revokeObjectURL(objectUrl);
                     };
             
                     image.onerror = () => {
                         toast.error("Failed to load image");
                         URL.revokeObjectURL(objectUrl);
                     };
                     };
    
            const handleHeroBanner = async() => {
                    setLoading(true);
                    const formdata = new FormData();
                       if (bannerImage) {
                        formdata.append('image', bannerImage);
                        }
                   const myHeaders = new Headers();
                   myHeaders.append("Authorization", token);
                    const requestOptions: RequestInit = {
                        method: "POST",
                        headers: myHeaders,
                        body: formdata,
                        redirect: "follow"
                    };
                    try {
                        const response = await fetch(`${baseUrl}/hero-section/${editId}`, requestOptions);
                       
                        if (!response.ok) {
                        const errorResponse = await response.json();
                        throw new Error(errorResponse.message);
                        }
                        const result = await response.json();     
                        setLoading(false); 
                        toast.success("Data Updated Successfully");  
                        heroFunction();     
                    } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                        setLoading(false); 
                    }
            }


      useEffect(() => {
        getBanner();
      }, []);

       const getBanner = async () => {
          setLoading(true);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", token);
          const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
      
          try {
            const response = await fetch(`${baseUrl}/hero-section/${editId}`, requestOptions);
             if (!response.ok) {
                        const errorResponse = await response.json();
                        throw new Error(errorResponse.message);
                }
              const result = await response.json();
              setExistingImages(result.data.image);
          } catch (error: any) {
            toast.error(error.message || "Error fetching data");
          } finally {
            setLoading(false);
          }
        };

    const backFunction = () => {
        setEditId("");
        heroFunction();
    }
  return (
    <div>
        
        <div className="admin-shop-header">
                <div className="admin-header-form flex-center gap-10 justification-between">
                  <div className="back-con flex-center gap-10" onClick={backFunction}>
                    <div className="back-left-arrow" >
                      <IoIosArrowBack />
                    </div>
                    <p>back</p>
                  </div>
                  {/* <IoSettingsOutline className="setting-icon"  onClick={backFunction}/> */}
                </div>
        </div>

       <div className="admin-hero-con">
                {
                        loading && (
                            <div className="cart-prealoader">
                                <ButtonPreloader/>
                            </div>

                        ) 
                }

            <div className="admin-hero-header flex-center justification-between">
                <h4>Edit Hero Banner</h4>
            </div>
            <div 
                     className={`admin-hero-img ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
            >
                <label htmlFor="file-input"><FaFileArrowUp /></label>
                <input id="file-input" type="file" onChange={handleFileChange} />
                <p>Drop your image here,</p> 
                <p>or browse</p>
               
            </div>

             <div className="previewImage">
                {
                  existingImages && (
                      <img
                      src={existingImages}
                      alt="Preview"
                      style={{ width: '150px', height: 'auto', marginTop: '10px' }}
                    />
                  )
                }
                {bannerImage && (
                <img
                src={URL.createObjectURL(bannerImage)}
                alt="Preview"
                style={{ width: '150px', height: 'auto', marginTop: '10px' }}
                />
                )}
             </div>

            <div className="admin-hero-form">

                

                
            
                {
                loading ? (
                    <div className="admin-input">
                        <div className='inActive'><ButtonPreloader/></div>
                    </div>
                ) : (
                    
                    <div className="admin-input" onClick={handleHeroBanner}>
                    <button>Apply & Save</button>
                    </div>  
                    
                    
                )}

            </div>

        </div>


    </div>
  )
}

export default EditHero