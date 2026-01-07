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
   

    const [headerText, setHeaderText] = useState<string>('');
    const [subHeadLine, setSubHeadLine] = useState<string>('');
    const [buttonText, setButtonText] = useState<string>('');


    const [buttonLink, setButtonLink] = useState('');
  const [buttonExternalLink, setButtonExternalLink] = useState('');

    const validateForm = () => {
        // New fields
        if (!bannerImage) {
            toast.error("You need to upload a banner image");
            return false;
        }
        if (!headerText.trim()) {
            toast.error("You need to fill the header text");
            return false;
        }
        if (!subHeadLine.trim()) {
            toast.error("You need to fill the subheadline");
            return false;
        }
        if (!buttonText.trim()) {
            toast.error("You need to fill the button text");
            return false;
        }
        if (!buttonLink.trim() && !buttonExternalLink.trim()) {
            toast.error("You need to provide a button link or external link");
            return false;
        }

        return true;
        };


        const charCount = headerText.replace(/\s/g, '').length;
        const subHeadLineCount = subHeadLine.replace(/\s/g, '').length;
        const buttonCount = buttonText.replace(/\s/g, '').length;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            const nonSpaceCount = input.replace(/\s/g, '').length;
            if (nonSpaceCount <= 45) {
            setHeaderText(input);
            }
        };

        const handleSubHeadLine = (e: { target: { value: any; }; }) => {
            const input = e.target.value;
            const nonSpaceCount = input.replace(/\s/g, '').length;
            if (nonSpaceCount <= 120) {
            setSubHeadLine(input);
            }
        };
        const handleButtonText = (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            const nonSpaceCount = input.replace(/\s/g, '').length;
            if (nonSpaceCount <= 16) {
            setButtonText(input);
            }
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
            if (image.width > 1440 || image.height > 802) {
            toast.error(`Image "${file.name}" exceeds 1500x1500`);
            URL.revokeObjectURL(objectUrl);
            return;
            }

            setBannerImage(file); 
            URL.revokeObjectURL(objectUrl);
        };

        image.onerror = () => {
            toast.error("Failed to load image");
            URL.revokeObjectURL(objectUrl);
        };
        };
         const handleLinkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
                    const selected = e.target.value;
                    setButtonLink(selected);

                    if (selected !== 'custom') {
                    setButtonExternalLink('');
                    }
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
                formdata.append('headingText', headerText);
                formdata.append('subheadingText', subHeadLine);
                formdata.append('buttonText', buttonText);
                formdata.append('buttonLink', buttonLink);
                formdata.append('buttonExternalLink', buttonExternalLink);

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
                    setHeaderText('');
                    setSubHeadLine('');
                    setButtonText('');
                    setButtonLink('');
                    setButtonExternalLink('');
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
                <p className='size'>1440 x 802 px</p>  
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

                <div className="admin-input">
                    <div className="input-header-flex flex-center justification-between">
                    <label >Headline Text</label>
                    <div className="input-header">{charCount}/45 character</div>
                    </div>
                    <input type="text" placeholder="Headline Text"  value={headerText} onChange={handleChange}/>
                </div>

                <div className="admin-input">
                    <div className="input-header-flex flex-center justification-between">
                    <label >Sub Headline</label>
                    <div className="input-header">{subHeadLineCount}/120 character</div>
                    </div>
                <textarea cols={10} rows={5} 
                placeholder="Sub Headline" value={subHeadLine}
                 onChange={handleSubHeadLine}></textarea>
                </div>

                <div className="admin-input">
                     <div className="input-header-flex flex-center justification-between">
                    <label >Button Text</label>
                    <div className="input-header">{buttonCount}/16 character</div>
                    </div>
                    
                    <input type="text" placeholder="Button Text" value={buttonText} onChange={handleButtonText}/>
                </div>

                <div className="admin-input">
                    
                    <div className="input-header-flex flex-center justification-between">
                    <label >Button Link</label>
                    </div>
                    <select name="" id="" value={buttonLink} onChange={handleLinkChange}>
                         <option value="">Select Link</option>
                        <option value="product">Shop Now</option>
                        <option value="consultant">Book Consultation</option>
                        <option value="master-course">Buy Course</option>
                        <option value="custom">External Link</option>
                    </select>
                </div>

                {buttonLink === 'custom' && (
                <div className="admin-input">
                    <div className="input-header">External Link</div>
                    <input
                    type="text"
                    placeholder="Enter External Link"
                    value={buttonExternalLink}
                    onChange={(e) => setButtonExternalLink(e.target.value)}
                    />
                </div>
                )}
            
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