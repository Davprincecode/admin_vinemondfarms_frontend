import { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png';
import {toast } from 'react-toastify';
import {NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../pages/context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RxCross2, RxDividerVertical } from 'react-icons/rx';
import { IoIosStar, IoIosStarOutline, IoMdCheckmark } from 'react-icons/io';
import product3sub4 from '../assets/images/product3sub4.png';
import { MdArrowOutward, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { IoLocationOutline } from 'react-icons/io5';
import { TbTruckDelivery } from 'react-icons/tb';
import { CiCircleQuestion } from 'react-icons/ci';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ButtonPreloader from './ButtonPreloader';


interface authComponentInterface {
    authAction : boolean,
    setAuthAction: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComposeMessage : React.FC<authComponentInterface> = ({authAction, setAuthAction}) =>{


const {baseUrl, token} = userAuth();
  const [subject, setSubject] = useState<string>('');
  const [copyEmail, setCopyEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<File | null>(null);



 const handleContact = async() => {
   if (!validateForm()) {
    return
   }
    setLoading(true);
    const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    const formData = new FormData();
  formData.append("subject", subject);
  formData.append("name", "admin");
  formData.append("email", email);
  formData.append("address", address);
  formData.append("phoneNumber", phoneNumber);
  formData.append("message", message);

  if (attachment) {
    formData.append("attachment", attachment);
  }

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: formData
    };

    try {
      const response = await fetch(`${baseUrl}/message`, requestOptions);    
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
        }
        const result = await response.json(); 
        setSubject('');
        setName('');
        setEmail('');
        setAddress('');
        setPhoneNumber('');
        setMessage('');     
        setAttachment(null);  
        toast.success("Sent successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  
 }

    const validateForm = () => {
      if (!subject.trim()) {
        toast.error("You need to fill the subject");
        return false;
      }
     
      if (!email.trim()) {
        toast.error("You need to fill the email");
        return false;
      }
      
      if (!message.trim()) {
        toast.error("You need to fill the message");
        return false;
      }
      return true;
    };


  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ align: [] }],
      ['image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'align',
    'image'
  ];

   const navigate = useNavigate();
  const { pathname } = useLocation();
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);


  return (
    <div className="track-con" style={{display : authAction ? "flex" : "none"}}>

      <div className="track-body">
         
         <div className="track-cancel-con flex-center justification-between">

             <div className="track-header flex-center gap-10">
                 <h1>New Message</h1>
             </div>

            <div className="track-cancel">
                <div className="cancel"  onClick={() => setAuthAction(!authAction)}>
                <RxCross2 />
                </div>
            </div>

         </div>

         <div className="message-body">
            <div className="admin-input">
                <label>To:</label>
                <input  type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            {/* <div className="admin-input">
                <label>Cc/Bcc:</label>
                <input  type="text" placeholder="Enter Email" value={copyEmail}  onChange={(e) => setCopyEmail(e.target.value)}/>
            </div> */}

            <div className="admin-input">
                <label>Subject:</label>
                <input  type="text" placeholder="Enter Subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
            </div>

            <div className="admin-input messageBody">
                <label>Message Body:</label>

               <ReactQuill
                  value={message}
                  onChange={setMessage}
                  modules={modules}
                  formats={formats}
                  placeholder="Compose your message..."
                  style={{ height: '200px' }}
                />

            </div>

            <div className="admin-input">
  <label>Attachment:</label>
  <input 
    type="file" 
    onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)} 
  />
</div>


             <div className="btn-flex-con messageBtn">
                    {
                      loading ? (
                        <div className="enterBtn">
                            <ButtonPreloader/>
                        </div>
                      ) : (
                      <div className="enterBtn" onClick={handleContact}>
                          send message
                      </div>
                      )
                    }
                    
            </div>

         </div>

       
        


         

         

         

          

        
      </div>

    </div>
  )
}

export default ComposeMessage


