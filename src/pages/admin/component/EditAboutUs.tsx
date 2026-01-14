import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { userAuth } from '../../context/AuthContext';
import ButtonPreloader from '../../../component/ButtonPreloader';
import { IoIosArrowBack } from 'react-icons/io';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';





interface HeroInterface {
  heroFunction: () => void;
  editId : string;
  setEditId : (id : string) => void;
}

const EditAboutUs : React.FC<HeroInterface> = ({ heroFunction, editId, setEditId }) => {     
      const {baseUrl, token} = userAuth();
     
         const [loading, setLoading] = useState<boolean>(false);
     
     


        const [message, setMessage] = useState<string>('');
                
         const modules = {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline'],
              [{ align: [] }],
              // ['image'],
              ['clean']
            ]
          };
        
          const formats = [
            'header',
            'bold', 'italic', 'underline',
            'align',
            'image'
          ];
         

      useEffect(() => {
        getBlog();
      }, []);
       const getBlog = async () => {
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
            const response = await fetch(`${baseUrl}/about-us/${editId}`, requestOptions);
          
             if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                }
              const result = await response.json(); 
              setMessage(result.data.content);
              
          } catch (error: any) {
            toast.error(error.message || "Error fetching data");
          } finally {
            setLoading(false);
          }
        };


       const handleBlog = async () => {
         setLoading(true);
               const myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                 const formdata = new FormData();
                formdata.append("content", message);
                const requestOptions: RequestInit = {
                    method: "POST",
                    headers: myHeaders,
                    body: formdata,
                    redirect: "follow"
                };
                try {
                    const response = await fetch(`${baseUrl}/about-us/${editId}`, requestOptions); 
                    if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message);
                    }
                    const result = await response.json();   
                        setLoading(false); 
                        toast.success("Data Updated Successfully");  
                        backFunction();     
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


        <div className='admin-hero-con'>
          <div className="wrap-blog ">

          <div className="blog-1">
          

          <div className="admin-input messageBody">
                <label>Edit About Us</label>

               <ReactQuill
                  value={message}
                  onChange={setMessage}
                  modules={modules}
                  formats={formats}
                  placeholder="Compose your message..."
                  style={{ height: '200px' }}
                />

            </div>
        

        

          </div>


        

          </div>
          {
                      loading ? (
                      <div className="admin-input">
                              <div className='inActive' style={{marginTop : "60px"}}><ButtonPreloader/></div>
                      </div>
                      ) : (
                      
                      <div className="admin-input">
                      <div className="btn" onClick={handleBlog} style={{marginTop : "60px"}}>Submit</div>
                      </div> 
                      
                      //       <div className="admin-input inActive">
                      //         <div className="btn inActive">Submit</div>
                      //       </div> 
                      
                      
              )}
           
          
          </div>


    </div>
  )
}

export default EditAboutUs