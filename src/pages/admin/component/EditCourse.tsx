import React, { useEffect, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import envelop from '../../../assets/images/envelop.png'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaFileArrowUp } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { userAuth } from '../../context/AuthContext';
import ButtonPreloader from '../../../component/ButtonPreloader';
import { IoIosArrowBack } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';

interface HeroInterface {
  heroFunction: () => void;
  editId : string;
  setEditId : (id : string) => void;
}

const EditCourse : React.FC<HeroInterface> = ({ heroFunction, editId, setEditId }) => {     
        const {baseUrl, token} = userAuth();
        const [loading, setLoading] = useState<boolean>(false);



         const [title, setTitle] = useState<string>('');
         const [description, setDescription] = useState<string>('');
        const [coursePrice, setCoursePrice] = useState<number>(0);
        const [courseDiscountPrice, setCourseDiscountPrice] = useState<number>(0);
        const [startDate, setStartDate] = useState<string>('');
        const [endDate, setEndDate] = useState<string>('');
        
        const [earlyCoursePrice, setEarlyCoursePrice] = useState<number>(0);
        // const [earlyCourseDiscountPrice, setEarlyCourseDiscountPrice] = useState<number>(0);
        const [earlyStartDate, setEarlyStartDate] = useState<string>('');
        const [earlyEndDate, setEarlyEndDate] = useState<string>('');
        const[currency, setCurrency] = useState<string>("NGN");        
        
        const [courseType, setCourseType] = useState<string>('');
        const [productImage, setProductImage] = useState<File | string | null>(null);
        
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
                    if (image.width > 1500 || image.height > 1500) {
                    toast.error(`Image "${file.name}" exceeds 1500x1500`);
                    URL.revokeObjectURL(objectUrl);
                    return;
                    }
                    setProductImage(file); 
                    URL.revokeObjectURL(objectUrl);
                };
        
                image.onerror = () => {
                    toast.error("Failed to load image");
                    URL.revokeObjectURL(objectUrl);
                };
                };
        
        const validateCourseForm = () => {
          if (!title.trim()) {
            toast.error("Course title is required");
            return false;
          }
          if (!currency.trim()) {
            toast.error("Currency is required");
            return false;
          }
          if (!description.trim()) {
            toast.error("Course description is required");
            return false;
          }
          if (!coursePrice || isNaN(coursePrice)) {
            toast.error("Valid course price is required");
            return false;
          }
          if (!startDate.trim()) {
            toast.error("Start date is required");
            return false;
          }
          if (!endDate.trim()) {
            toast.error("End date is required");
            return false;
          }
        
          if (!courseType.trim()) {
            toast.error("Course type is required");
            return false;
          }
        
          return true;
        };
    
         

      useEffect(() => {
        getCourse();
      }, []);

       const getCourse = async () => {
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
            const response = await fetch(`${baseUrl}/course/${editId}`, requestOptions);
             if (!response.ok) {
                        const errorResponse = await response.json();
                        throw new Error(errorResponse.message);
                }
              const result = await response.json(); 
           
               
              setTitle(result.data.courseTitle);
              setDescription(result.data.courseDescription);
              setProductImage(result.data.courseImage);
              setCoursePrice(result.data.coursePrice);
              setCourseDiscountPrice(result.data.discountPrice);
              setStartDate(result.data.startDateRaw);
              setEndDate(result.data.endDateRaw);
              setEarlyCoursePrice(result.data.earlyBirdPrice);
              setEarlyStartDate(result.data.earlyBirdStartDate);
              setEarlyEndDate(result.data.earlyBirdEndDate);
              setCourseType(result.data.courseType);
          } catch (error: any) {
            toast.error(error.message || "Error fetching data");
          } finally {
            setLoading(false);
          }
        };


         const handleProduct =  async() => {
                if(!validateCourseForm()){
                  return;
                }
              setLoading(true);
                   const formdata = new FormData();
                    if (productImage) {
                      if(typeof productImage !== 'string'){
                          formdata.append("courseImage", productImage);
                      }
                    }
                   formdata.append("courseTitle", title);
                    formdata.append("courseDescription", description);
                    formdata.append("coursePrice", coursePrice.toString());
                    formdata.append("discountPrice", courseDiscountPrice.toString());
                    formdata.append("startDate", startDate);
                    formdata.append("endDate", endDate);
                    formdata.append("endDate", endDate);
                    formdata.append("currency", currency);
                    if(earlyCoursePrice > 0){
                     formdata.append("earlyBirdPrice", earlyCoursePrice.toString()); 
                    }
                    if(earlyStartDate){
                      formdata.append("earlyBirdStartDate", earlyStartDate);
                    }
                    if(earlyEndDate){
                      formdata.append("earlyBirdEndDate", earlyEndDate);
                    }
                    formdata.append("courseType", courseType);
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization", token);
                  const requestOptions: RequestInit = {
                      method: "POST",
                      headers: myHeaders,
                      body: formdata,
                      redirect: "follow"
                  };
                  try {
                      const response = await fetch(`${baseUrl}/update-course/${editId}`, requestOptions);   
                       
                      if (!response.ok) {
                      const errorResponse = await response.json();
                      throw new Error(errorResponse.message);
                      }
                      const result = await response.json();    
                      setLoading(false); 
                      toast.success("updated successfully");
                      setTitle('');
                      setDescription('');
                      setProductImage(null);
                      setCoursePrice(0);
                      setCourseDiscountPrice(0);
                      setStartDate('');
                      setEndDate('');
                      setEarlyCoursePrice(0);
                      setEarlyStartDate('');
                      setEarlyEndDate('');
                      setCourseType('');
                      backFunction();
                  } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                      setLoading(false); 
                      // toast.error(error.message);
                  }
                
            }

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

       <div className="admin-hero-con">
                {
                        loading && (
                            <div className="cart-prealoader">
                                <ButtonPreloader/>
                            </div>

                        ) 
                }

            <div className="admin-hero-header flex-center justification-between">
                <h4>Edit Course</h4>
            </div>

                  <div className="product-form-con">

                      
                          <div className="product-form-top flex justification-between">
                            <div className="admin-prd-form">
                              <div className="admin-prod-title">Information</div>

                              <div className="admin-input">
                                <label>Title</label>
                                <input name="productName" type="text" placeholder="Enter Product Name" value={title} onChange={(e) => setTitle(e.target.value)}/>
                              </div>

                                    <div className="admin-input">
                                    <label>Description</label>
                                    <input
                                      name="description"
                                      type="text"
                                      placeholder="Enter course description"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                    />
                                    </div>

                                      {/* <div className="admin-prd-form"> */}
                                      <div className="admin-prod-title">image</div>
                                      <div className="uploadWrapper">
                                      <label htmlFor="file-input">Add Files</label>
                                      <input id="file-input" type="file" onChange={handleFileChange} />
                                      <p>or drag and drop files</p>
                                      <p className='size'>1500 x 1500px</p>
                                      </div>
                                      {/* </div> */}

                                        <div className="previewImage">
                                        {productImage && (
                                        <img
                                            src={
                                              typeof productImage === "string" 
                                                ? productImage
                                                : URL.createObjectURL(productImage)
                                              }
                                            alt="Preview"
                                            style={{ width: '150px', height: 'auto', marginTop: '10px' }}
                                        />
                                        )}
                                        </div>


                                    <div className="admin-prd-form">
                                      <div className="admin-prod-title">Price</div>

                                      <div className="admin-flex-input flex-center gap-10">


                                           <div className="flex-center gap-10 admin-short">
                                            <div className="admin-input input-short">
                                            <label>Currency</label>
                                            <select
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            >
                                            <option value="NGN">NGN</option>
                                            <option value="USD">USD</option>
                                            <option value="GHS">GHS</option>
                                            <option value="ZAR">ZAR</option>
                                            <option value="KES">KES</option>
                                            <option value="XOF">XOF</option>
                                            </select>
                                            </div>

                                          <div className="admin-input course-input">
                                          <label>Course Price</label>
                                          <input
                                            name="coursePrice"
                                            type="number"
                                            placeholder="Enter course price"
                                            value={coursePrice}
                                            onChange={(e) => setCoursePrice(parseInt(e.target.value))}
                                          />
                                          </div>
                             </div>

                                            <div className="admin-input">
                                            <label>Discount Price</label>
                                            <input
                                              name="courseDiscountPrice"
                                              type="number"
                                              placeholder="Enter discount price"
                                              value={courseDiscountPrice}
                                              onChange={(e) => setCourseDiscountPrice(parseInt(e.target.value))}
                                            />
                                            </div>
                                      </div>
                                        <div className="admin-flex-input flex-center gap-10">
                                                  <div className="admin-input">
                                                  <label>Start Date</label>
                                                  <input
                                                  name="startDate"
                                                  type="date"
                                                  value={startDate}
                                                  onChange={(e) => setStartDate(e.target.value)}
                                                  />
                                                  </div>

                                                  <div className="admin-input">
                                                  <label>End Date</label>
                                                  <input
                                                  name="endDate"
                                                  type="date"
                                                  value={endDate}
                                                  onChange={(e) => setEndDate(e.target.value)}
                                                  />
                                                  </div>
                                        </div>
                                    </div>


                                    <div className="admin-prd-form">
                                      <div className="admin-prod-title">Early Bird <span>(optional)</span></div>

                                      <div className="admin-flex-input flex-center gap-10">
                                            <div className="admin-input">
                                            <label>Course Price</label>
                                            <input
                                              name="coursePrice"
                                              type="number"
                                              placeholder="Enter course price"
                                              value={earlyCoursePrice}
                                              onChange={(e) => setEarlyCoursePrice(parseInt(e.target.value))}
                                            />
                                            </div>

                                          
                                      </div>
                                        <div className="admin-flex-input flex-center gap-10">
                                                  <div className="admin-input">
                                                  <label>Start Date</label>
                                                  <input
                                                  name="startDate"
                                                  type="date"
                                                  value={earlyStartDate}
                                                  onChange={(e) => setEarlyStartDate(e.target.value)}
                                                  />
                                                  </div>

                                                  <div className="admin-input">
                                                  <label>End Date</label>
                                                  <input
                                                  name="endDate"
                                                  type="date"
                                                  value={earlyEndDate}
                                                  onChange={(e) => setEarlyEndDate(e.target.value)}
                                                  />
                                                  </div>
                                        </div>
                                    </div>
                                  

                                  
                                

                  <div className="admin-input ">
                    <div className="admin-prod-title">Type</div>

                    <div className="course-type-options flex-center  gap-10">

                      <label>

                        <input
                          type="checkbox"
                          name="courseType"
                          value="physical"
                          checked={courseType === 'physical'}
                          onChange={(e) => setCourseType(e.target.value)}
                        />

                      Physical

                      </label>

                      <label>
                        <input
                          type="checkbox"
                          name="courseType"
                          value="online"
                          checked={courseType === 'online'}
                          onChange={(e) => setCourseType(e.target.value)}
                        />
                        Online
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          name="courseType"
                          value="hybrid"
                          checked={courseType === 'hybrid'}
                          onChange={(e) => setCourseType(e.target.value)}
                        />
                        Hybrid
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          name="courseType"
                          value="book"
                          checked={courseType === 'book'}
                          onChange={(e) => setCourseType(e.target.value)}
                        />
                        <p>Book/Doc/PDF</p>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          name="courseType"
                          value="video"
                          checked={courseType === 'video'}
                          onChange={(e) => setCourseType(e.target.value)}
                        />
                      <span>Pre-Recorded Video</span>
                      </label>
                    </div>
                  </div>

                          {
                              loading ? (
                                  <div className="admin-input">
                                      <div className='inActive'><ButtonPreloader/></div>
                                  </div>
                              ) : (
                                // title !== '' && description !== '' && productImage !== null && coursePrice > 0 && courseDiscountPrice> 0 && startDate !== '' && endDate !== '' && courseType !== ''  ? (
                                              <div className="admin-input">
                                                <div className="btn" onClick={handleProduct}>Submit</div>
                                              </div> 
                                // ) : (
                                //         <div className="admin-input inActive">
                                //           <div className="btn inActive">Submit</div>
                                //         </div> 
                                // )
                            
                          )}

                              </div>
                          </div>

                    </div>

        </div>


    </div>
  )
}

export default EditCourse