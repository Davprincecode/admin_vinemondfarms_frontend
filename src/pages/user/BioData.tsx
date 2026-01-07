import React, { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import mark  from '../../assets/images/mark.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import imgProfile from '../../assets/images/commentImage.jpg'
import { userAuth } from '../context/AuthContext';

 interface bioIntern{
  bioFunction : () => void;
 }

 const  BioData : React.FC<bioIntern> = ({bioFunction}) => {
    const [loading, setLoading] = useState<boolean>(false);
    

      const {baseUrl, token, name, email, phoneNumber1, phoneNumber2, address1, address2, state, city, postalCode, image} = userAuth();
      
  
  return (
    <div>
       
                <div className="user-profile-main flex justification-between">

                    <div className="profile-image-con">
                        <div className="profile-image-form">
                            <div className="profile-image">
                                <img src={mark} alt="" />
                            </div>
                            <div className="profile-btn-flex">
                                <div className="profile-btn">upload picture</div>
                            </div>
                        </div>
                    </div>

                <div className="profile-form form-con">
                    <div className="form-title">Basic Info</div>

                     <div className="profileImageCon flex-center gap-10">
                          <div className="profileImage"><img src={imgProfile} alt="" /></div>
                          <div className="profileName">
                            <div className="name flex-center gap-5">
                              <p>{name}</p>
                            </div>
                            <div className="email">{email}</div>
                          </div>
                     </div>
                        
                      <div className="profile-section">

                          <div className="profile flex-center justification-between">
                                <div className="profile-first">phone1</div>
                                <div className="profile-second">{phoneNumber1}</div>
                          </div>
                          <div className="profile flex-center justification-between">
                                <div className="profile-first">phone2</div>
                                <div className="profile-second">{phoneNumber2}</div>
                          </div>
                          <div className="profile flex-center justification-between">
                                <div className="profile-first">address1</div>
                                <div className="profile-second">{address1}</div>
                          </div>
                          <div className="profile flex-center justification-between">
                                <div className="profile-first">address2</div>
                                <div className="profile-second">{address2}</div>
                          </div>
                          <div className="profile flex-center justification-between">
                                <div className="profile-first">state</div>
                                <div className="profile-second">{state}</div>
                          </div>
                     
                          <div className="profile flex-center justification-between">
                                <div className="profile-first">city</div>
                                <div className="profile-second">{city}</div>
                          </div>

                          <div className="profile flex-center justification-between">
                                <div className="profile-first">postal code</div>
                                <div className="profile-second">{postalCode}</div>
                          </div>
                     
                     </div>

                    <div className="profileEditBtn" onClick={bioFunction}>Edit profile</div>

                  </div>

                  

                </div>
               
    </div>
  )
}

export default BioData