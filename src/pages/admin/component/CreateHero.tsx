import React, { useEffect, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import envelop from '../../../assets/images/envelop.png'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaFileArrowUp } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { userAuth } from '../../context/AuthContext';
import ButtonPreloader from '../../../component/ButtonPreloader';
import { useNavigate } from 'react-router-dom';


type popType = {
    toggleToDefault : () => void;
}


const CreateHero = ({toggleToDefault}:popType) => {

    const [isActive, setIsActive] = useState(false);
    
      const handleToggle = () => {
        setIsActive(!isActive);
      };
    const {baseUrl, token} = userAuth();
   
    const [loading, setLoading] = useState<boolean>(false);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
   
    const validateForm = () => {
        // New fields
        if (!bannerImage) {
            toast.error("You need to upload a banner image");
            return false;
        }


        return true;
        };


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
                // if (image.width > 1440 || image.height > 802) {
                // toast.error(`Image "${file.name}" exceeds 1500x1500`);
                // URL.revokeObjectURL(objectUrl);
                // return;
                // }

                setBannerImage(file); 
                URL.revokeObjectURL(objectUrl);
            };

            image.onerror = () => {
                toast.error("Failed to load image");
                URL.revokeObjectURL(objectUrl);
            };
        };
        

        const handleHeroBanner = async() => {
              if(!validateForm()){  
                return;
              }
                setLoading(true);

                if (!bannerImage) {
                    console.error("No image selected");
                    return;
                }
                const formdata = new FormData();
                formdata.append('image', bannerImage);
               
                const myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                const requestOptions: RequestInit = {
                    method: "POST",
                    headers: myHeaders,
                    body: formdata,
                    redirect: "follow"
                };
                try {
                    const response = await fetch(`${baseUrl}/hero-section`, requestOptions);
                    if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message);
                    }
                    const result = await response.json();    
                    setBannerImage(null);
                    setLoading(false); 
                    toast.success("Data Upload Successfully");  
                    toggleToDefault();
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
      
  return (
    <div className="admin-hero-wrap">

        <div className="admin-hero-con">
            <div className="admin-hero-header flex-center justification-between">
                <h4>Create Hero Banner</h4>
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
                    // bannerImage !== null && headerText !== '' && subHeadLine !== '' && buttonText !== '' && buttonLink !== ''  ? (
                      <div className="admin-input" onClick={handleHeroBanner}>
                    <button>Apply & Save</button>
                    </div>  
                    // ) :(
                    //     <div className="admin-input">
                    //         <button className='inActive'>Apply & Save</button>
                    //     </div>
                    // )
                    
                )}

            </div>

        </div>
    </div>
  )
}

export default CreateHero