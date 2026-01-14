import React, { useEffect, useState } from 'react'
import { IoIosStar } from 'react-icons/io'
import { IoEyeOutline } from 'react-icons/io5'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { userAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import ButtonPreloader from '../../../component/ButtonPreloader';
import DeletePopup from './DeletePopUp';
import TestimonialReview from '../../../component/TestimonialReview';
import { FaFileArrowUp } from 'react-icons/fa6';

interface TestimonialForm {
fullName: string;
title: string;
testimonial: string;
rating: number;
status : string;
}

interface TestimonialInterface {
  id: number;
  fullname: string;
  position: string;
  testimonial: string;
  rating: number;
  status : string;
}
interface GalleryInterface {  
  galleryCategory : string;
  galleryTitle : string;
  id: number;
  image : string;
  status : string;
}
interface categoryInterface {
id: number;
categoryName: string;
}


const Gallery = () => {

const [formData, setFormData] = useState<TestimonialForm>({
fullName: "",
title: "",
testimonial: "",
rating: 0,
status : "active"
});

const {baseUrl, token} = userAuth();
const [loading, setLoading] = useState<boolean>(false);
const { fullName, testimonial, title, rating } = formData;
const [showPopup, setShowPopup] = useState(false);
const [selectedId, setSelectedId] = useState<number | null>(null);
const [currentIndex, setCurrentIndex] = useState<number | null>(null);

const [gallery, setGallery] = useState<GalleryInterface[]>([]);
const [category, setCategory] = useState<categoryInterface[]>([]);
const [galleryTitle, steGalleryTitle] = useState<string>('');
const [galleryCategory, steGalleryCategory] = useState<string>('');
const [galleryImage, setGalleryImage] = useState<File | null>(null);

useEffect(() => {
  getReview();
  getCategory();
}, [])


const validateForm = () => {

if (!galleryTitle.trim()) {
toast.error("You need to fill the title");
return false;
}
if (!galleryCategory.trim()) {
toast.error("You need to fill the category");
return false;
}

return true;
};

const handleReview = async () => {
    if(!validateForm()){
        return;
      }
      setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
         const formData = new FormData();
         if(galleryImage){
          formData.append("image", galleryImage);
         }
        formData.append("category", galleryCategory);
        formData.append("title", galleryTitle);

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: formData,
            redirect: "follow"
        };
        try {
            const response = await fetch(`${baseUrl}/gallery`, requestOptions);
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json();  
             steGalleryTitle('');
             steGalleryCategory('');
             setGalleryImage(null);
             setGallery(data => [...data, result.data]);
             setLoading(false);
            
            toast.success("Data Upload Successfully");       
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
        const response = await fetch(`${baseUrl}/gallery`, requestOptions);
        if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
        }
        const result = await response.json(); 
        setGallery(result.data);
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
const getCategory = async () => {
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
        const response = await fetch(`${baseUrl}/gallery-category`, requestOptions);
        if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
        }
        const result = await response.json();
        setCategory(result.data);
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

                setGalleryImage(file); 
                URL.revokeObjectURL(objectUrl);
            };

            image.onerror = () => {
                toast.error("Failed to load image");
                URL.revokeObjectURL(objectUrl);
            };
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
      const response = await fetch(`${baseUrl}/gallery/${id}`, requestOptions);
      
      if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
      }

      const result = await response.json();

      setGallery(prev => prev.filter(item => item.id !== id));
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

<div>
<h2>add new gallery</h2>

<div className="admin-testimonial-form">
<div className="admin-input">
<label>Gallery Title</label>
<input
  type="text"
  value={galleryTitle}
  onChange={(e) => steGalleryTitle(e.target.value)}
  placeholder="Enter Gallery Title"
/>
</div>

<div className="admin-input">
<label>Category</label>
<select 
   value={galleryCategory}
   onChange={(e) => steGalleryCategory(e.target.value)}
  >
<option value="">Enter Category</option>
{
  category.map((item, index)=>(
     <option key={index} value={item.categoryName}> {item.categoryName}</option>
  ))
}

</select>

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
                {galleryImage && (
                <img
                src={URL.createObjectURL(galleryImage)}
                alt="Preview"
                style={{ width: '150px', height: 'auto', marginTop: '10px' }}
                />
                )}
             </div>



{
loading ? (
    <div className="admin-input">
        <button className='inActive'><ButtonPreloader/></button>
    </div>
) : (
    <div className="admin-input" onClick={handleReview}>
        <button>Apply & Save</button>
    </div>
)
}


<div className="mainGallery flex-center">
{gallery.map((value, index) => (
<div className="flex-center gap-10" key={value.id}>
<IoEyeOutline className="eye" onClick={()=> openModal(index)}/>
<p>{value.galleryTitle}</p>
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
        <TestimonialReview
        src={gallery[currentIndex]}
        onClose={closeModal}
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={(currentIndex + 1) > 0}
        hasNext={currentIndex < (gallery.length - 1)}
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

export default Gallery