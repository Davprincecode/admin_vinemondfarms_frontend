import React, { useState } from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { NavLink, useNavigate } from 'react-router-dom'
import { userAuth } from '../pages/context/AuthContext'
import { toast } from 'react-toastify'
import ButtonPreloader from './ButtonPreloader'


interface dataIntern {
  "id":string,
  "subject": string,
  "message": string,
  "path": string,
  "createdAt" : string,
  "status": string
}

interface notifyIntern {
  notifications : boolean,
  setNotifications :  React.Dispatch<React.SetStateAction<boolean>>,
  notificationData : dataIntern[],
  setNotificationData: React.Dispatch<React.SetStateAction<dataIntern[]>>
}

const Notification : React.FC<notifyIntern> = ({notifications, setNotifications, notificationData, setNotificationData}) => {
    const navigate = useNavigate();
   const [loading, setLoading] = useState<boolean>(false);
   const {baseUrl, token, setNotification} = userAuth();

  const readNotification = async (id : string, path : string) => {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
            const requestOptions: RequestInit = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            try {
              const response = await fetch(`${baseUrl}/notification/${id}`, requestOptions);   
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json();
                setNotification(result.data.notification_count);
                setNotificationData(result.data.notification);
                setLoading(false);
                setNotifications(false);
                navigate(path);
            } catch (error) {
                          setLoading(false);
                          if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                          toast.error(error.message);
                          } else {
                          toast.error('An unknown error occurred.');
                          }
              
                setLoading(false);
                if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                  // toast.error(error.message);
                } else {
                  toast.error('An unknown error occurred.');
                }
              }
          
        };

  return (
    <div   className={`notification-con ${notifications ? 'open' : ''}`} >

      <div className="notification-shaddow" onClick={() => setNotifications(!notifications)}></div>

        <div className="notification-body">

             <div className="notification-flex">
              <div className="notification-cancel" onClick={() => setNotifications(!notifications)}>
                      <RxCross2 />
                </div>
             </div>

             <div className="notification-header">
                <div className="notification-header-title"><h1>notifications</h1></div>
                <div className="notification-count flex-center gap-5">
                    <div className="coutn">{notificationData.length}</div>
                    <p>NEW</p>
                </div>
             </div>

             <div className="notification-wrapper">


              {/* <div className="notification-container notification-inactive">
                  
                  <div className="notification-header">
                    <div className="notification-bell">
                      <IoIosNotificationsOutline />
                    </div>
                    <div className="notification-label">New Blog Post <span>10 min ago</span></div>
                    <div className="notification-cancel">
                      <RxCross2 />
                    </div>
                  </div> 

                      
                  <div className="notification-content">
                    
                      <div className="notification-title"><h2>blog post title</h2></div>
                      <div className="notification-details">Lorem Ipsum is simply dummy text of the printing and typesetting indu ...</div>
                      <div className="notification-more"><NavLink to="#">view</NavLink></div>
                  </div>
                  
              </div>  */}


                {
                  notificationData.length > 0 ? (
                  notificationData.map((data, index)=>(

                       <div key={index}>
                      {data.path == "booking" && (
                            <div className="notification-container" >

                              <div className="notification-header">
                                <div className="notification-bell">
                                    <IoIosNotificationsOutline />
                                  </div>
                                  <div className="notification-label"> Booking <span>{data.createdAt}</span>
                                  </div>
                                   <div className="notification-cancel">
                                    <RxCross2 />
                                  </div>
                              </div>
                                  
                                  <div className="notification-content">
                                      <div className="notification-title"><h2>new booking</h2></div>
                                      <div className="notification-details">You have new booking</div>
                                      <div className="notification-more">
                                        {
                                          loading ? (
                                             <ButtonPreloader/>
                                          ) : (
                                              <div className='notifyView' onClick={() => readNotification(data.id, "/admin/admin-consult")}>view</div>
                                          )
                                        }
                                        
                                        </div>
                                  </div>
                                 
                            </div>
                            )}

                      { data.path == "course" && (
                            <div className="notification-container" >

                              <div className="notification-header">
                                <div className="notification-bell">
                                    <IoIosNotificationsOutline />
                                  </div>
                                  <div className="notification-label"> Master Course <span>{data.createdAt}</span>
                                  </div>
                                   <div className="notification-cancel">
                                    <RxCross2 />
                                  </div>
                              </div>

                                  
                                  <div className="notification-content">
                                      <div className="notification-title"><h2>New course purchase</h2></div>
                                      <div className="notification-details">you have new course purchase</div>
                                      <div className="notification-more">  
                                        {
                                          loading ? (
                                             <ButtonPreloader/>
                                          ) : (
                                              <div className='notifyView' onClick={() => readNotification(data.id, "/admin/admin-consult")}>view</div>
                                          )
                                        }
                                      </div>
                                  </div>
                            </div>
                            )}

                      { data.path == "contact" && (
                            <div className="notification-container" >

                              <div className="notification-header">
                                <div className="notification-bell">
                                    <IoIosNotificationsOutline />
                                  </div>
                                  <div className="notification-label"> Support <span>{data.createdAt}</span>
                                  </div>
                                   <div className="notification-cancel">
                                    <RxCross2 />
                                  </div>
                              </div>

                                  
                                  <div className="notification-content">
                                      <div className="notification-title"><h2>{data.subject}</h2></div>
                                      <div className="notification-details">you have a new message. check your message page</div>
                                      <div className="notification-more">  
                                        {
                                          loading ? (
                                             <ButtonPreloader/>
                                          ) : (
                                              <div className='notifyView' onClick={() => readNotification(data.id, "/admin/admin-message")}>view</div>
                                          )
                                        }
                                      </div>
                                  </div>
                            </div>
                            )}

                        { data.path == "shop" && (
                                <div className="notification-container" >

                                  <div className="notification-header">
                                <div className="notification-bell">
                                    <IoIosNotificationsOutline />
                                  </div>
                                  <div className="notification-label"> Shop <span>{data.createdAt}</span>
                                  </div>
                                   <div className="notification-cancel">
                                    <RxCross2 />
                                  </div>
                              </div>
                                     
                                      <div className="notification-content">
                                        
                                          <div className="notification-title"><h2>New order</h2></div>
                                          <div className="notification-details">You have order pending</div>
                                          <div className="notification-more">
                                              {
                                                  loading ? (
                                                    <ButtonPreloader/>
                                                  ) : (
                                                      <div className='notifyView' onClick={() => readNotification(data.id, "/admin/admin-shop")}>view</div>
                                                  )
                                              }
                                          </div>
                                      </div>
                                   
                                </div>
                                )}
                            
                            </div>



                  ))
                  ) : (
                    <p>no notification</p>
                  )
                }

                {
               /* <div className="notification-container notification-inactive">
                      <div className="notification-bell">
                        <IoIosNotificationsOutline />
                      </div>
                      <div className="notification-content">
                        <div className="notification-label">New Blog Post <span>10 min ago</span></div>
                         <div className="notification-title"><h2>blog post title</h2></div>
                         <div className="notification-details">Lorem Ipsum is simply dummy text of the printing and typesetting indu ...</div>
                         <div className="notification-more"><NavLink to="#">view</NavLink></div>
                      </div>
                      <div className="notification-cancel">
                        <RxCross2 />
                      </div>
                </div> */}

             </div>

        </div>
    </div>
  )
}

export default Notification