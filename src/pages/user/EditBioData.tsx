import React, { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import mark  from '../../assets/images/mark.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import { userAuth } from '../context/AuthContext';
import ButtonPreloader from '../../component/ButtonPreloader';


interface bioIntern{
  bioFunction : () => void;
 }
const EditBioData : React.FC<bioIntern> = ({bioFunction}) => {
    const [loading, setLoading] = useState<boolean>(false);

 const {baseUrl, userId, token, name, setName, email, setEmail, phoneNumber1, setPhoneNumber1, phoneNumber2, setPhoneNumber2,
   address1, setAddress1,  address2, setAddress2, state, setState,  city, setCity,  postalCode, setPostalCode, image, setImage} = userAuth();
     
          const fetchUserData = async () => {
             setLoading(true);
             const myHeaders = new Headers();
             myHeaders.append("Content-Type", "application/json");
             myHeaders.append("Authorization", token);
                  const raw = JSON.stringify({
                      'name' : name,
                      'phone_number1' : phoneNumber1,
                      'phone_number2' : phoneNumber2,
                      'address1' : address1,
                      'address2' : address2,
                      'state' : state,
                      'city' : city,
                      'postal_code' : postalCode
                  });
             const requestOptions: RequestInit = {
               method: 'PATCH',
               headers: myHeaders,
               body: raw,
               redirect: 'follow'
             };
            try {
              const response = await fetch(`${baseUrl}/auth/updateuser/${userId}`, requestOptions); 
               if (!response.ok) {
                 const errorResponse = await response.json();
                 throw new Error(errorResponse.message);
               }

               const result = await response.json(); 
               toast.success("profile updated successfully");
                setLoading(false);
                bioFunction();
                
                
            } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
              console.error('Error fetching user data:', error);
            }
          };
      
        
       

       
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

                    <div className="formInput">
                    <label>name <span>(First name and Last name)</span></label>
                    <input type="text"  placeholder="full name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="formInputFlex">
                    <div className="formInputItem">
                        <label>phone no</label>
                        <input type="text" name="phone1" placeholder="Enter Phone No" value={phoneNumber1} onChange={(e) => setPhoneNumber1(e.target.value)} />
                    </div>
                    <div className="formInputItem">
                        <label>phone no 2 (optional)</label>
                        <input type="text" name="phone2" placeholder="Enter Phone No" value={phoneNumber2} onChange={(e) => setPhoneNumber2(e.target.value)} />
                    </div>
                    </div>

                    

                    <div className="formInput">
                    <label>address</label>
                    <input type="text" name="address1" placeholder="Enter Address" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                    </div>

                    <div className="formInput">
                    <label>address 2 (optional)</label>
                    <input type="text" name="address2" placeholder="Enter Address" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                    </div>

                   

                    <div className="formInputFlex">
                    
                    <div className="formInputItem">
                        <label>state</label>
                        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    </div>

                    <div className="formInputFlex">
                    <div className="formInputItem">
                        <label>city/town</label>
                        <input type="text" name="city" placeholder="Enter City/Town" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="formInputItem">
                        <label>postal code</label>
                        <input type="text" name="postalCode" placeholder="Enter Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                    </div>
                   
                   {
                    loading ? (
                      <div className="formInputBtn">
                        <ButtonPreloader/>
                      </div>  
                    ) : (
                      <div className="formInputBtn" onClick={fetchUserData}>
                          save
                      </div>
                    )
                   }
                    
                </div>

                </div>
               
    </div>
  )
}

export default EditBioData