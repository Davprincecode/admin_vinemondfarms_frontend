import React, { useEffect, useRef, useState } from "react";
import ButtonPreloader from "../../../component/ButtonPreloader";
import { userAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


type popType = {
  toggleToDefault : () => void;
}

 const  AddConsulting = ({toggleToDefault} : popType) => {

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
            const response = await fetch(`${baseUrl}/consulting`, requestOptions);      
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json();       
              setLoading(false); 
              toast.success("Data Upload Successfully");   
              setMessage("");
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
    };



        return ( 

          <div>
          <div className="wrap-blog ">

          <div className="blog-1">
          

          <div className="admin-input messageBody">
                <label>Create Consulting</label>

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

        );
}


export default AddConsulting