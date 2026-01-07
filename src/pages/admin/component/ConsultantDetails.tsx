import React, { useState } from 'react'
import { FaArrowLeftLong, FaRegCalendarDays } from 'react-icons/fa6'
import { TiWorld } from 'react-icons/ti'
import { FaCalendarAlt } from 'react-icons/fa'
import { CiClock1 } from 'react-icons/ci'
import { IoIosArrowBack, IoMdPricetags } from 'react-icons/io'
import { toast } from 'react-toastify'
import { userAuth } from '../../context/AuthContext'
import ButtonPreloader from '../../../component/ButtonPreloader'


  type TimeSlot = {
    bookingId: string;
    date: string;
    startTime: string;
    endTime: string;
    interval: string;
    currency: string;
    price: number;
    bookingStatus: string;
    bookingDescription : string;
    maxDayBeforeBooking : string;
    maxTimeBeforeBooking : string;
  };

  interface consultantInterface{
  scheduleFunction : () => void;
  bookTime : TimeSlot[];
  }


const ConsultantDetails  = ({bookTime,  scheduleFunction }: consultantInterface) =>  {

  const [loading, setLoading] = useState<boolean>(false)
  const {baseUrl, token} = userAuth();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [orderNote, setOrderNote] = useState<string>('');
  const singleBooking = bookTime[0];

  const url = window.location.origin;
  const fetchData = async () => {
        setLoading(true);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", token);
          const raw = JSON.stringify({
              "email" : email,
              "name" : name,
              "phoneNumber" : phoneNumber,
              "orderNote" : orderNote,
              "service_type" : "booking",
              "currency" : singleBooking?.currency,
              "amount" : singleBooking?.price,
              "bookingId" : singleBooking?.bookingId,
              "bookingDate" : singleBooking?.date,
              "bookingStartTime" : singleBooking?.startTime,
              "bookingEndTime" : singleBooking?.endTime,
              "callBackUrl" : `${url}/payment/booking/callback`
          });
          const requestOptions: RequestInit = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
          };
          try {
            const response = await fetch(`${baseUrl}/payment`, requestOptions);  
            if (!response.ok) {
              const errorResponse = await response.json();  
              throw new Error(errorResponse.message);
            }
              const result = await response.json();  
              setLoading(false);
              window.location.href = result.authorization_url;
          } catch (error) {
              setLoading(false);
                if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                  toast.error(error.message);
                } else {
                  toast.error('An unknown error occurred.');
                }          
              setLoading(false);
                if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                  toast.error(error.message);
                } else {
                  toast.error('An unknown error occurred.');
                }
          }
      
      };
  
  return (
  
            <div className="consultant">
              <div className="mobile-back" onClick={scheduleFunction}><IoIosArrowBack /> <p>back</p></div>
                <div className="consultant-detail">
                    <div className="consultant-icon"><FaCalendarAlt /></div>
                    <p className='schedule-name'>schedule a</p>
                    <h2 className='consultant-name'>consultation</h2>
                    <div className="clock flex-center"><CiClock1 /> <h2>{singleBooking?.interval}</h2></div>
                    <div className="consultant-bod">
                      {singleBooking?.bookingDescription}
                    </div>
                </div>

                <div className="consultant-form">
                  <div className="consultant-back"  onClick={scheduleFunction}><FaArrowLeftLong /> <p>back</p></div>
                    <div className="consultant-header">confirm your booking</div>
                    <div className="consultant-details">
                        <div className="flex-center consultant-date gap-10">
                            <FaRegCalendarDays />
                            <p>{singleBooking?.date}</p>
                        </div>
                        <div className="time">{singleBooking?.startTime} - {singleBooking?.endTime}</div>
                        <div className="price-currency flex-center gap-10"><IoMdPricetags /> {singleBooking?.currency}  {singleBooking?.price}</div>
                        {/* <div className="flex-center consultant-time gap-10">
                            <TiWorld />
                            <p>time zone europe</p>
                        </div> */}
                    </div>

                    <div className="form-cons">
                        <div className="admin-input">
                    <label >name </label>
                    <input type="text" placeholder='full name' value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                        <div className="admin-input">
                    <label >email</label>
                    <input type="text"  placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                        <div className="admin-input">
                    <label >phone no</label>
                    <input type="text"  placeholder='phone no'  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  />
                      </div>
                    <div className="admin-input">
                    <label >note <span>(optional)</span></label>
                     <textarea name="" id="" cols={30} rows={10}  value={orderNote} onChange={(e) => setOrderNote(e.target.value)} ></textarea>
                      </div>
                    </div>

                    <div className="admin-input">
                      {
                        loading ? (
                          <ButtonPreloader/>
                        ) : (
                          <button onClick={fetchData}>
                           Confirm
                          </button>
                        )
                      }
                        
                    </div>

                </div>

            </div>
   
  )
}

export default ConsultantDetails