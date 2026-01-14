import React, { useEffect, useState } from 'react'
import { IoIosStar } from 'react-icons/io'
import { IoEyeOutline } from 'react-icons/io5'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { userAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import ButtonPreloader from '../../../component/ButtonPreloader';
import DeletePopup from './DeletePopUp';
import TestimonialReview from '../../../component/TestimonialReview';

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


const Team = () => {

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
const [testimonials, setTestimonials] = useState<TestimonialInterface[]>([]);

useEffect(() => {
getReview()
}, [])

const handleInputChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
const { name, value } = e.target;
setFormData(prev => ({ ...prev, [name]: value }));
};

const handleRating = (index: number) => {
setFormData(prev => ({ ...prev, rating: index + 1 }));
};
const validateForm = () => {

if (!fullName.trim()) {
toast.error("You need to fill the full name");
return false;
}
if (!testimonial.trim()) {
toast.error("You need to fill the testimonial");
return false;
}
if (!title.trim()) {
toast.error("You need to fill the title");
return false;
}
if(rating < 1){
toast.error("You need to fill the rating");
return false;
}

return true;
};

const handleReview = async () => {
if(!validateForm()){
    return;
  }
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            'fullname' : fullName,
            'testimonial' : testimonial,
            'position' :  title,
            'rating' : rating
        });
        
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        try {
            const response = await fetch(`${baseUrl}/testimony`, requestOptions);
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json();    
            setTestimonials(prev => [...prev, result.data]);
            setFormData({
                fullName: "",
                title: "",
                testimonial: "",
                rating: 0,
                status : "active"
                });
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
        const response = await fetch(`${baseUrl}/testimony`, requestOptions);
        if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
        }
        const result = await response.json();
        console.log(result);
        
        setTestimonials(result.data);
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
      const response = await fetch(`${baseUrl}/testimony/${id}`, requestOptions);
      
      if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
      }

      const result = await response.json();

        setTestimonials(prev => prev.filter(item => item.id !== id));
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
<h2>add new testimonial</h2>

<div className="admin-testimonial-form">
<div className="admin-input">
<label>Full Name</label>
<input
type="text"
name="fullName"
value={formData.fullName}
onChange={handleInputChange}
placeholder="Enter Full Name"
/>
</div>

<div className="admin-input">
<label>Title/Position</label>
<input
type="text"
name="title"
value={formData.title}
onChange={handleInputChange}
placeholder="Enter Title"
/>
</div>

<div className="admin-input">
<label>Testimonial</label>
<textarea
name="testimonial"
value={formData.testimonial}
onChange={handleInputChange}
cols={30}
rows={10}
placeholder="Enter Testimonial"
/>
</div>

<div className="admin-input">
<label>Select Rating</label>
<div className="admin-star flex-center gap-5">
{[...Array(5)].map((_, index) => (
<IoIosStar
  key={index}
  onClick={() => handleRating(index)}
  style={{
    color: index < formData.rating ? "gold" : "#ccc",
    cursor: "pointer",
    fontSize: "24px",
  }}
/>
))}
</div>
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
{testimonials.map((value, index) => (
<div className="flex-center gap-10" key={value.id}>
<IoEyeOutline className="eye" onClick={()=> openModal(index)}/>
<p>{value.fullname}</p>
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
        src={testimonials[currentIndex]}
        onClose={closeModal}
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={(currentIndex + 1) > 0}
        hasNext={currentIndex < (testimonials.length - 1)}
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

export default Team