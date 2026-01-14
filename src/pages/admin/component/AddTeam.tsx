import React, { useEffect, useRef, useState } from "react";
import ButtonPreloader from "../../../component/ButtonPreloader";
import { userAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


type popType = {
  toggleToDefault : () => void;
}

 const  AddTeam = ({toggleToDefault} : popType) => {

    const {baseUrl, token} = userAuth();
  
    const [loading, setLoading] = useState<boolean>(false);
    const [staffName, setStaffName] = useState<string>('');
    const [staffPosition, setStaffPosition] = useState<string>('');
    const [staffProfile, setStaffProfile] = useState<string>('');
    const [staffQuanlification, setStaffQuanlification] = useState<string>('');
    const [staffImg, setStaffImg]= useState<File | null>(null);

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
                //    if (image.width > 1080 || image.height > 1080) {
                //    toast.error(`Image "${file.name}" exceeds 1500x1500`);
                //    URL.revokeObjectURL(objectUrl);
                //    return;
                //    }
                   setStaffImg(file); 
                   URL.revokeObjectURL(objectUrl);
               };
       
               image.onerror = () => {
                   toast.error("Failed to load image");
                   URL.revokeObjectURL(objectUrl);
               };
               };
        
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
            if (!staffImg) {
                        toast.error("No team image");
                        setLoading(false);
                        return;
                    }
            const formdata = new FormData();
                formdata.append("staffName", staffName);
                formdata.append("staffQuanlification", staffQuanlification);
                formdata.append("staffPosition", staffPosition);
                formdata.append("staffProfile", staffProfile);
                formdata.append("staffImg", staffImg);
            const requestOptions: RequestInit = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/team`, requestOptions);      
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();       
                setLoading(false); 
                toast.success("Data Upload Successfully");
                setStaffName("");  
                setStaffPosition(""); 
                setStaffProfile("");
                setStaffQuanlification("");
                setStaffImg(null);
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

           <div className="admin-input">
              <label>staff name</label>
              <input  type="text" placeholder="Enter Staff Name" value={staffName} onChange={(e) => setStaffName(e.target.value)}/>
            </div>

           <div className="admin-input">
              <label>staff positon</label>
              <input  type="text" placeholder="Enter Staff Position" value={staffPosition} onChange={(e) => setStaffPosition(e.target.value)}/>
            </div>

           <div className="admin-input">
              <label>staff Quanlification</label>
              <input  type="text" placeholder="Enter Staff Position" value={staffQuanlification} onChange={(e) => setStaffQuanlification(e.target.value)}/>
            </div>

          <div className="blog-1">
            <div className="admin-input messageBody">
                    <label>Staff Profile</label>

                <ReactQuill
                    value={staffProfile}
                    onChange={setStaffProfile}
                    modules={modules}
                    formats={formats}
                    placeholder="Compose your message..."
                    style={{ height: '200px' }}
                    />
            </div>
          </div>


          {/* <div className="admin-prd-form"> */}
                    <div className="admin-prod-title" style={{marginTop : "60px"}}>profile image</div>
                    <div  className={`uploadWrapper ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                            
                            >
                    <label htmlFor="file-input">Add Files</label>
                    <input id="file-input" type="file" onChange={handleFileChange} />
                    <p>or drag and drop files</p>
                    </div>
                    {/* </div> */}

                    <div className="previewImage">
                      {staffImg && (
                      <img
                      src={URL.createObjectURL(staffImg)}
                      alt="Preview"
                      style={{ width: '150px', height: 'auto', marginTop: '10px' }}
                      />
                      )}
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
                         
                      
              )}
           
          
          </div>

        );
}


export default AddTeam