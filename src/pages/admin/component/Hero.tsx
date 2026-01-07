import React, { useEffect, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import envelop from '../../../assets/images/envelop.png'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaFileArrowUp } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { userAuth } from '../../context/AuthContext';
import CreateHero from './CreateHero';
import AllHero from './AllHero';
import EditHero from './EditHero';




interface galleryInterface{
id : number,
image :  string,
status :  string,
}


const headers = ['all', 'create banner'];

function Hero() {

  const [activeTab, setActiveTab] = useState('all');
  const [isActive, setIsActive] = useState(false);
   
  const toggleToDefault = () => {
   setActiveTab("all");
  }

  const handleToggle = () => {
    setIsActive(!isActive);
  };

    const {baseUrl, token} = userAuth();
    const[galleryImg, setGalleryImg] = useState<galleryInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const [editHero, setEditHero] = useState<boolean>(false);
    const [editId, setEditId] = useState<string>('');
      
      const heroFunction = () => {
        setEditHero(!editHero);
      }

     useEffect(() => {
       getImage()
     }, [])
     
     const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
            setLoading(true);
          const imagefile = event.target.files?.[0] || null;
  
  
                  if (!imagefile) {
                      console.error("No image selected");
                      return;
                  }
              const formdata = new FormData();
              formdata.append('image', imagefile);
  
              const myHeaders = new Headers();
              myHeaders.append("Authorization", token);
              const requestOptions: RequestInit = {
                  method: "POST",
                  headers: myHeaders,
                  body: formdata,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/gallery`, requestOptions);
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();    
                    setGalleryImg(prev => [...prev, result.data]);
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
                  const response = await fetch(`${baseUrl}/gallery`, requestOptions);
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
                  setLoading(false); 
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
      console.log("Deleting item with ID:", id);
      // Call your delete API or logic here

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
                 setLoading(false);  
              }
    };

  return (
    <div>
      
        <h2>website hero slidder images,captions & call to actions</h2>

        <div className="admin-shop-header">
                        <div className="admin-header-list flex-center gap-10">
                            {headers.map((label) => (
                                    <div
                                    key={label}
                                    className={`header-list ${activeTab === label ? 'header-list-active' : ''}`}
                                    onClick={() => setActiveTab(label)}
                                    >
                                    {label}
                                    </div>
                                ))}
                        </div>
        </div>



    <div className="hero-container">

      {
        activeTab == 'all' ? (
          editHero ? (
              <EditHero heroFunction={heroFunction} editId={editId} setEditId={setEditId}/>
          ) : (
             <AllHero heroFunction={heroFunction} setEditId={setEditId}/>
          )
          
        ) : (
          <CreateHero toggleToDefault={toggleToDefault}/>
        )
      }
       
    </div>



    </div>
  )
}

export default Hero