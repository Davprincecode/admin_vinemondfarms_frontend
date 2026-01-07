import React, { useEffect, useState } from 'react'
import blogImg from '../assets/images/blogpic.png'
import { NavLink } from 'react-router-dom'
import { FiInstagram } from 'react-icons/fi';
import { userAuth } from '../pages/context/AuthContext';
import ButtonPreloader from './ButtonPreloader';
import { toast } from 'react-toastify';


interface vlogIntern {
    'title' :  string;
    'videoUrl':  string;
    'status':  string;
    }

function Vlog() {

 useEffect(() => {
  const script = document.createElement('script');
  script.src = '//www.instagram.com/embed.js';
  script.async = true;
  script.onload = () => {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  };
  document.body.appendChild(script);
}, []);
 
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
                     const response = await fetch(`${baseUrl}/page-instagram`, requestOptions);
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
          <div className="vlogHeader">
             <h1>vlog</h1>
          </div>
            {
            loading && (
            <div className="cart-prealoader">
              <ButtonPreloader/>
            </div>

            ) 
            }
           
           <div className="vlogLogoTitle flex-center gap-10">
                           <div className="vlogoIcon">
                           <FiInstagram /> 
                           </div>
                           <div className="vlogTitle">
                               <h1>Instagram Reels</h1>
                           </div>
            </div>

          <div className="vlogConFlex flex gap-10">

            {
                data.map((item, index)=>(
                    <div className="vlogCon" key={index}>

                <div className="vlogImage">
                      <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={item.videoUrl}
                      data-instgrm-version="14"
                      style={{ width: '100%', margin: 'auto' }}
                      ></blockquote>
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

                <div className="vlogImage">
                      <blockquote
                      className="instagram-media"
                      data-instgrm-permalink="https://www.instagram.com/reel/DGh4dmdMqU1/"
                      data-instgrm-version="14"
                      style={{ width: '100%', margin: 'auto' }}
                      ></blockquote>
                </div>

                <div className="vlogContent">
                    <div className="vlogHeading">
                        Knowing the Right Neckline
                    </div>                   
                </div>
              </div>
              
              <div className="vlogCon">
                <div className="vlogImage">
                  <blockquote
                      className="instagram-media"
                      data-instgrm-permalink="https://www.instagram.com/reel/DGz3Ef4oZOV/"
                      data-instgrm-version="14"
                      style={{ width: '100%', margin: 'auto' }}
                    >
                    </blockquote>
                </div>
  
                <div className="vlogContent">
                    <div className="vlogHeading">
                      Skirt length best for you
                    </div>
                    
                </div>
              </div>

              <div className="vlogCon">
                <div className="vlogImage">
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink="https://www.instagram.com/reel/C4zx66eM-M4/"
                      data-instgrm-version="14"
                      style={{ width: '100%', margin: 'auto' }}
                    >
                    </blockquote>
                </div>
                <div className="vlogContent">
                    <div className="vlogHeading">
                       Personal or Fashion Stylist
                    </div>
                   
                </div>
              </div> */}
              

          </div>
          
          <div className="vlogBottom">
               <a href="https://www.instagram.com/temiloveafrik/?utm_source=ig_embed&ig_rid=63500371-fa37-4d0a-a491-46a4f509cd41&ig_mid=7BAD6E23-5A2C-473D-9ED4-BB17FACF703D" target='_blank'>VIEW MORE</a> 
             </div>
    </div>
  )
}

export default Vlog