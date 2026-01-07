import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CiYoutube } from 'react-icons/ci'
import { userAuth } from '../pages/context/AuthContext';
import ButtonPreloader from './ButtonPreloader';
import { toast } from 'react-toastify';


    interface vlogIntern {
    'title' :  string;
    'videoUrl':  string;
    'status':  string;
    }


function Youtube() {


     const {baseUrl} = userAuth();
     const [loading, setLoading] = useState<boolean>(false);
     const [data, setData] = useState<vlogIntern[]>([]); 
   useEffect(() => {
           getData()
           }, []);
     
         const getData = async () => {
             setLoading(true);
                 const myHeaders = new Headers();
                 myHeaders.append("Content-Type", "application/json");
                 const requestOptions: RequestInit = {
                     method: "GET",
                     headers: myHeaders,
                     redirect: "follow"
                 };
                 try {
                     const response = await fetch(`${baseUrl}/page-youtube`, requestOptions);
                     if (!response.ok) {
                     const errorResponse = await response.json();
                     throw new Error(errorResponse.message);
                     }
                     const result = await response.json(); 
                     setData(result.data); 
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
  return (
   <div className='vlog'>
        
           <div className="vlogLogoTitle flex-center gap-10">
                <div className="vlogoIcon">
                <CiYoutube /> 
                </div>
                <div className="vlogTitle">
                    <h1>Youtube Video</h1>
                </div>
           </div>

            {
            loading && (
            <div className="cart-prealoader">
              <ButtonPreloader/>
            </div>

            ) 
            }

          <div className="vlogConFlex flex gap-10">

            {
              data.map((item, index)=>(
                  <div className="vlogCon" key={index}>
               <div className="youtubeImage">
                  <iframe
                    width="560"
                    height="500"
                    src={`https://www.youtube.com/embed/${item.videoUrl?.split('/').pop()?.split('?')[0] ?? ''}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
               </div>



                <div className="vlogContent">
                    <div className="vlogHeading">
                        {item.title}
                    </div>                   
                </div>
              </div>
              
              ))
            }

              {/* <div className="vlogCon">

                <div className="youtubeImage">
                      <iframe
                            width="560"
                            height="500"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                </div>

                <div className="vlogContent">
                    <div className="vlogHeading">
                        Make your Dream a Reality
                    </div>                   
                </div>
              </div>
              
              <div className="vlogCon">
                <div className="youtubeImage">
                <iframe
                    width="560"
                    height="500"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                </div>
  
                <div className="vlogContent">
                    <div className="vlogHeading">
                       Tacky is not a Vibe
                    </div>
                    
                </div>
              </div>

              <div className="vlogCon">
                <div className="youtubeImage">
                   <iframe
                        width="560"
                        height="500"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="vlogContent">
                    <div className="vlogHeading">
                       I am African Fashion
                    </div>
                   
                </div>
              </div> */}
              

          </div>
          
          <div className="vlogBottom">
               <NavLink to="#">VIEW MORE</NavLink> 
             </div>
    </div>
  )
}

export default Youtube