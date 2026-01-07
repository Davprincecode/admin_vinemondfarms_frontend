import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { CiSearch } from 'react-icons/ci'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoIosArrowBack, IoIosStar } from 'react-icons/io'
import profile from '../../../assets/images/profile.png'
import { userAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import ButtonPreloader from '../../../component/ButtonPreloader'


    interface messageIntern {
      id : string;
      address : string;
      email : string;
      is_favorite : boolean;
      message : string;
      attachment : string;
      name : string;
      createdAt : string;
      phoneNumber : string;
      subject : string;
      onGoing : boolean;
    }
  
 interface msg{
    setMsgDetail: React.Dispatch<React.SetStateAction<boolean>>;
    messageData: messageIntern[]
 }
interface threadInterface {
  messageId : string;
  message : string;
}
const  MessageDetails = ({setMsgDetail, messageData} : msg) => {
 const messageId = messageData[0]?.id;
 const email = messageData[0]?.email;
 const subject = messageData[0]?.subject;
 const [onGoing, setOngoing] = useState<boolean>(messageData[0]?.onGoing);
 const [thread, setThread] = useState<threadInterface[]>([]);
 const [replyMessage, setReplyMessage] = useState<string>('');
const {baseUrl, token} = userAuth();
const [loading, setLoading] = useState<boolean>(false);  
const [message, setMessage] = useState<messageIntern[]>([]);
const [activeDropdown, setActiveDropdown] = useState<number | null>(null);


   useEffect(() => {
      handleEmail();
    }, []);

    const handleEmail = async() => {
      const id = messageData[0]?.id;
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
          const response = await fetch(`${baseUrl}/message-mark-read/${id}`, requestOptions);
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json(); 
            setThread(result.data);  
           
             
        } catch (error: any) {
          toast.error(error.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      
     }

  const handleReply = async() => {

     setLoading(true);
      const raw = JSON.stringify({
          'messageId' : messageId,
          'email' : email,
          'subject' : subject,
          'message' :  replyMessage,
          'onGoing' : onGoing
    });
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        const requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        try {
          const response = await fetch(`${baseUrl}/message-reply`, requestOptions); 
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json(); 
            setReplyMessage('');
            toast.success(result.message);
            setThread(prev => [...prev, result.data]);
        } catch (error: any) {
          toast.error(error.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      
     }

  return (
    <div className='admin-dashboard msg-container'>
<div className="back-con flex-center gap-10" onClick={() => setMsgDetail(false)}>
                    <div className="back-left-arrow" >
                      <IoIosArrowBack />
                    </div>
                    <p>back</p>
                  </div>
                  <p>{email}</p>
           <div className="msg-header flex-center justification-between">
                <div className="msg-header-support flex-center gap-10">
                    <h2>{messageData[0]?.subject}</h2>
                    <p>posted at {messageData[0]?.createdAt}</p>
                    </div> 
                    <div className="three-dot">
                        <BsThreeDotsVertical />
                    </div>
           </div>
           
           
           <div className="msg-body">
                {/* <div className="msg-body-header">
                    How to deposit money to my portal
                </div> */}

                <div className="msg-body-content">
                  <div dangerouslySetInnerHTML={{ __html: messageData[0]?.message }} />
                </div>
               
               {
                thread.map((item, index)=>(
                <div className="msg-reply-body">
                  <p>
                   {item.message}
                  </p>
                </div>
                ))
               }
                
                {
                    messageData[0]?.attachment && (
                      <div className="admin-message-attachment-details">
                        <img src={messageData[0]?.attachment}/>
                      </div>
                    )
                  }

                <div className="msg-reply">
                    <h4>reply</h4>

                    <div className="status">
                        <div className='status-name'>
                            status
                        </div>
                      <select value={onGoing.toString()} onChange={(e) => setOngoing(e.target.value === "true")}>
                        <option value="true">on-going</option>
                        <option value="false">concluded</option>
                      </select>
                    </div>

                    <div className="messageInput">
                           <div className='status-name'>
                              message body
                            </div>
                           <textarea cols={30} rows={10} placeholder='Enter Reply' value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)}>
                            
                           </textarea>
                    </div>
                    
                    <div className="senderFlex">
                        {
                            loading ? (
                               <ButtonPreloader/>
                            ) : (
                                <div className="senderReply" onClick={handleReply}>
                                    send reply
                                </div> 
                            )
                        }
                          
                    </div>
                    

                </div>
             
           </div>

    </div>
    
  )
}

export default MessageDetails