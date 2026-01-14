import React, { useEffect, useState } from 'react'
import { FiEdit3, FiUploadCloud } from 'react-icons/fi'
import envelop from '../../../assets/images/envelop.png'
import { RiDeleteBin6Line, RiEditFill } from 'react-icons/ri'
import { FaFileArrowUp } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { userAuth } from '../../context/AuthContext';
import ButtonPreloader from '../../../component/ButtonPreloader';
import { IoIosArrowBack } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import CategoryProductPop from '../../../component/CategoryProductPop';
import SizePop from '../../../component/SizePop';
import { RxCross2 } from 'react-icons/rx';
import EditCategory from '../../../component/EditCategory';
import { MdCancel } from 'react-icons/md';

interface HeroInterface {
  heroFunction: () => void;
  editId : string;
  setEditId : (id : string) => void;
}
interface tagInterface {
"id": number,
"tagName": string
}
interface categoryInterface {
"id": string,
"categoryName": string
}
interface sizeInterface {
"id": number,
"sizeName": string
}

 type SubProduct = {
  productId?: string | null;
  productImage : File[];
  existingImages: string[];
  deletedImages: string[];
  measurement : File | null;
  productPrice : number;
  discountPrice : number;
  productColor : string;
  productSize : string;
  productDescription : string;
  availableStockUnlimited : boolean;
  availableQty : number | null;
};

type tagType = {
     tagId?: string | null;
      tagName  : string; 
}

interface sizeInterface {
"id": number,
"sizeName": string
}
const EditProduct : React.FC<HeroInterface> = ({ heroFunction, editId, setEditId }) => {     
          const {baseUrl, token} = userAuth();
        
           
           const [loading, setLoading] = useState<boolean>(false);
                 const [productName, setProductName] = useState<string>('');
                   const [productImage, setProductImage] = useState<File | null | string>(null);
                    const [price, setPrice] = useState<number>(0);
                    const [weight, setWeight] = useState<string>('');
       
           // ==============================================
       
          const [isActive, setIsActive] = useState(false);
          const[catId, setCatId] = useState<string>('');
          const[catPop, setCatPop] = useState<boolean>(false);

      
        
         const handleToggle = () => {
           setIsActive(!isActive);
         };
       
       
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
                  const droppedFiles = Array.from(e.dataTransfer.files);
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
                          
                            setProductImage(file); 
                            URL.revokeObjectURL(objectUrl);
                        };
            
                        image.onerror = () => {
                            toast.error("Failed to load image");
                            URL.revokeObjectURL(objectUrl);
                        };
                    };

       
        const validateProductForm = () => {
        if (!productName.trim()) {
          toast.error("Product name is required");
          return false;
        }
        
        if (!productImage) {
          toast.error("Product image is required");
          return false;
        }
        if (!price || isNaN(price)) {
          toast.error("Valid product price is required");
          return false;
        }
          
      
        return true;
      };
      

        const handleProduct =  async() => {
           if(!validateProductForm()){
              return;
           }
           setLoading(true);
           if (!productImage) {
               toast.error("No product image");
               setLoading(false);
               return;
           }
               const formdata = new FormData();
               formdata.append("productName",  productName);
               if(typeof productImage !== 'string'){
                      formdata.append("productImage", productImage);
               }
               
               formdata.append("productPrice", price.toString());
               formdata.append('productWeight', weight);
       
              
               const myHeaders = new Headers();
               myHeaders.append("Authorization", token);
               const requestOptions: RequestInit = {
                   method: "POST",
                   headers: myHeaders,
                   body: formdata,
                   redirect: "follow"
               };
               try {
                   const response = await fetch(`${baseUrl}/update-product/${editId}`, requestOptions);    
                   if (!response.ok) {
                   const errorResponse = await response.json();
                   throw new Error(errorResponse.message);
                   }
                   const result = await response.json();    
                       setLoading(false); 
                       toast.success("Data Upload Successfully"); 
                                 
                       setProductName('');
                  
                       setProductImage(null);
                      
                       setPrice(0);
                       setWeight('');
                   
                      heroFunction();
               } catch (error) {
                               setLoading(false);
                               if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                               toast.error(error.message);
                               } else {
                               toast.error('An unknown error occurred.');
                               }
                   setLoading(false); 
               }
             
         }
      

      useEffect(() => {
        getBanner();
      }, []);

       const getBanner = async () => {
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
            const response = await fetch(`${baseUrl}/product/${editId}`, requestOptions);
             if (!response.ok) {
                        const errorResponse = await response.json();
                        throw new Error(errorResponse.message);
                }
              const result = await response.json();
              setProductName(result.data.productName);
              setProductImage(result.data.productImage);
              setPrice(result.data.productPrice);
              setWeight(result.data.productWeight);
           
          } catch (error: any) {
            toast.error(error.message || "Error fetching data");
          } finally {
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

       <div className="admin-hero-con">
                {
                        loading && (
                            <div className="cart-prealoader">
                                <ButtonPreloader/>
                            </div>

                        ) 
                }

            <div className="admin-hero-header flex-center justification-between">
                <h4>Edit Product</h4>
            </div>


           
{/* ===================================== */}
   <div className="product-form-con">

        {/* Product Info */}
        <div className="product-form-top flex justification-between">
          <div className="admin-prd-form">
            <div className="admin-prod-title">Information</div>

            <div className="admin-input">
              <label>Product Name</label>
              <input name="productName" type="text" value={productName} onChange={(e) => setProductName(e.target.value) } placeholder="Enter Product Name" />
            </div>

            <div className="admin-input">
              <label>Product Price</label>
              <input type="number"  min="0" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} placeholder="Enter Price" />
            </div>

            <div className="admin-input">
              <label>Product Size Type</label>
              <input type="text"   value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter Product Size e.g kg, g, fresh, pack, bundle, turkey, wrap" />
            </div>
           


          </div>

         
        </div>

        {/* Image & Tags */}
        <div className="product-form-top flex justification-between">

          <div className="admin-prd-form">
            <div className="admin-prod-title">Product Image</div>
            
            <div className={`uploadWrapper ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                        >
              <label htmlFor="file-input">Add Files</label>
              <input id="file-input" type="file" multiple onChange={handleFileChange} />
              <p>or drag and drop files</p>
            </div>
          </div>

          
        </div>
        

        <div className="flex-wrap justification-between">
              <div className="previewImage">
                      {productImage && (
                        
                          <div className="imgPrev"> 
                            <img
                            src={
                              typeof productImage === "string" ? 
                               productImage 
                              :
                              URL.createObjectURL(productImage)
                            }
                            alt="Preview"
                            style={{ width: '150px', height: 'auto', marginTop: '10px' }}
                            />
                            
                            </div>
                           
                         
                      )}
              </div>
              
          </div>
        
       

      
        {/* Submit Button */}
        <div className="btn-wrapper">
           {
            loading ? (
                <div className="admin-input">
                    <div className='inActive'><ButtonPreloader/></div>
                </div>
            ) : (
          <div className="admin-input">
            <div className="btn" onClick={handleProduct}>Submit</div>
          </div> 
            )}
        </div>
      </div>
{/* ============================================ */}
             

      
        </div>


    </div>
  )
}

export default EditProduct