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
           const[tag, setTag] = useState<tagInterface[]>([]);
           const[tagged, setTagged] = useState<tagType[]>([]);
           const[category, setCategory] = useState<categoryInterface[]>([]);
           
           const [loading, setLoading] = useState<boolean>(false);
         const[currency, setCurrency] = useState<string>("NGN");
           const[categoryId, setCategoryId] = useState<string>('');
           const[refProductId, setRefProductId] = useState<string>('');
           const [productName, setProductName] = useState<string>('');
           const [productDescription, setProductDescription] = useState<string>('');
           const [price, setPrice] = useState<number>(0);
           const [discount, setDiscount] = useState<number>(0);
           const [productColor, setProductColor] = useState<string>('');
            const [productSize, setProductSize] = useState<string>('');
           const [productImage, setProductImage] = useState<File[]>([]);
           const [existingImages, setExistingImages] = useState<string[]>([]); 
           const [deletedImages, setDeletedImages] = useState<string[]>([]);
           const [measurement, setMeasurement] = useState<File | string | null>(null);
           const [availableStockUnlimited, setAvailableStockUnlimited] = useState<boolean>(false);
           const [availableQty, setAvailableQty] = useState<number>(0);
           // ==================================================
           const [colorImage, setColorImage] = useState<string>('');
           const [subProductSize, setSubProductSize] = useState<string>('');
           const [sizePrice, setSizePrice] = useState<number>(0);
           const [stock, setStock] = useState<string>('');
           const [color, setColor] = useState<string>('');
           const[authAction, setAuthAction] = useState<boolean>(false);
           const[sizeAction, setSizeAction] = useState<boolean>(false);
       
          const[size, setSize] = useState<sizeInterface[]>([]);
       
           // ==============================================
       
          const [isActive, setIsActive] = useState(false);
          const[catId, setCatId] = useState<string>('');
          const[catPop, setCatPop] = useState<boolean>(false);

          const editCategoryPop = (id : string) => {
            setCatId(id);
            setCatPop(true);
          }
       
           const [subProducts, setSubProducts] = useState<SubProduct[]>([
           {   
               productImage : [],
               existingImages: [], 
               deletedImages: [],
               measurement : null,
               productPrice : 0,
               discountPrice : 0,
               productColor : '',
               productSize : '',
               productDescription : '',
               availableStockUnlimited : true,
               availableQty : 0
           }
           ]);
       
          
         const handleToggle = () => {
           setIsActive(!isActive);
         };
       
          const availableFunction = (data: boolean) =>{
                // setStock(data);
              //  if(data === "unlimited"){
                 setAvailableStockUnlimited(data);
              //  }else{
              //      setAvailableStockUnlimited(false);
              //  }
            }
       
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
               // if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
               //   handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
               //   e.dataTransfer.clearData();
               // }
           
           
               if (e.dataTransfer.files && e.dataTransfer.files.length > 0) { 
                   const droppedFiles = Array.from(e.dataTransfer.files);
                   setProductImage(prev => [...prev, ...droppedFiles]); e.dataTransfer.clearData(); 
                       }
             };
             const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
               if (e.target.files) { 
                 const selectedFiles = Array.from(e.target.files); 
               setProductImage(prev => [...prev, ...selectedFiles]); 
             } 
             };


         const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
           const file = e.target.files?.[0] || null;
           setMeasurement(file);
         };
       
         const validateProductForm = () => {
         if (!productName.trim()) {
           toast.error("Product name is required");
           return false;
         }
         if (!productDescription.trim()) {
           toast.error("Product description is required");
           return false;
         }
        //  if (!productImage) {
        //    toast.error("Product image is required");
        //    return false;
        //  }
         if (!price || isNaN(price)) {
           toast.error("Valid product price is required");
           return false;
         }
         if (!productColor.trim()) {
           toast.error("Product color is required");
           return false;
         }
         if (!productSize.trim()) {
           toast.error("Product size is required");
           return false;
         }
       
         // Optional: Validate subProducts
         for (let i = 0; i < subProducts.length; i++) {
           const p = subProducts[i];
           if (!p.productPrice || isNaN(p.productPrice)) {
             toast.error(`Sub-product ${i + 1} needs a valid price`);
             return false;
           }
           if (!p.productColor.trim()) {
             toast.error(`Sub-product ${i + 1} needs a color`);
             return false;
           }
           if (!p.productSize.trim()) {
             toast.error(`Sub-product ${i + 1} needs a size`);
             return false;
           }
          //  if (!p.productImage) {
          //    toast.error(`Sub-product ${i + 1} needs an image`);
          //    return false;
          //  }
         }
       
         return true;
       };
       
        const handleProduct =  async() => {
           if(!validateProductForm()){
              return;
           }
           setLoading(true);
          const formdata = new FormData();

              productImage.forEach((file, index) => { formdata.append("productImage[]", file); });
              existingImages.forEach((url, i) => { formdata.append(`existingImages[${i}]`, url); }); 
              deletedImages.forEach((url, i) => { formdata.append(`deletedImages[${i}]`, url); });

              
               formdata.append("productName",  productName);
               formdata.append("productDescription",  productDescription);
                formdata.append("currency", currency);
               formdata.append("productPrice", price.toString());
               formdata.append("discountPrice", discount.toString());
               formdata.append("productColor", productColor);
               formdata.append("productSize", productSize);
               formdata.append("categoryId", categoryId);
               formdata.append("availableStockUnlimited", availableStockUnlimited ? "1" : "0");

               if(measurement){
                if(typeof measurement !== "string"){
                  formdata.append('sizeMeasurement', measurement);
                }
               }

               if(availableQty){
                   formdata.append("availableQty", availableQty.toString());
               }
               if (subProducts.length > 0) {

              subProducts.forEach((sub, index) => { 
                    sub.productImage.forEach(file => { 
                    formdata.append(`products[${index}][productImage][]`, file); 
                    }); 
                    sub.deletedImages.forEach((url, i) => { 
                      formdata.append(`products[${index}][deletedImages][${i}]`, url);
                  });
                  sub.existingImages.forEach((url, i) => { 
                    formdata.append(`products[${index}][existingImages][${i}]`, url); 
                  });

                  formdata.append(`products[${index}][productId]`, sub.productId ?? ''); 
                  formdata.append(`products[${index}][productColor]`, sub.productColor); 
                  formdata.append(`products[${index}][productSize]`, sub.productSize); 
                  formdata.append(`products[${index}][productPrice]`, sub.productPrice.toString()); 

                  formdata.append(`products[${index}][availableStockUnlimited]`, 
                    sub.availableStockUnlimited ? "1" : "0"
              ); 
              
              if (sub.discountPrice) { 
                formdata.append(`products[${index}][discountPrice]`, 
                  sub.discountPrice.toString()); 
                } 

              if (!sub.availableStockUnlimited && sub.availableQty != null) { 
                formdata.append( `products[${index}][availableQty]`, 
                sub.availableQty.toString() 
                ); }


                });
               }
       
                  if (tagged.length > 0) {
                  tagged.forEach((tag, index) => {
                  formdata.append(`tags[${index}][tagId]`, tag.tagId ?? '');
                  formdata.append(`tags[${index}][tagName]`, tag.tagName);
                  });
                  }

               const myHeaders = new Headers();
               myHeaders.append("Authorization", token);
               const requestOptions: RequestInit = {
                   method: "POST",
                   headers: myHeaders,
                   body: formdata,
                   redirect: "follow"
               };
               try {
                   const response = await fetch(`${baseUrl}/update-product/${refProductId}`, requestOptions);
                   if (!response.ok) {
                   const errorResponse = await response.json();
                   throw new Error(errorResponse.message);
                   }
                   const result = await response.json();    
                       setLoading(false); 
                       toast.success("Data Upload Successfully"); 
                       backFunction();      
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
               handleCategory()
               handleSize()
             }, []);
       
         const handleCategory = async () => {
                   setLoading(true);
                     const myHeaders = new Headers();
                     myHeaders.append("Content-Type", "application/json");
                     myHeaders.append("Authorization", token);
                     const requestOptions: RequestInit = {
                         method: "GET",
                         headers: myHeaders,
                         redirect: "follow"
                     };
                     try {
                         const response = await fetch(`${baseUrl}/product-category`, requestOptions);
                         if (!response.ok) {
                         const errorResponse = await response.json();
                         throw new Error(errorResponse.message);
                         }
                         const result = await response.json(); 
                          setCategory(result.data);
                          setLoading(false);
                     } catch (error) {
                               setLoading(false);
                               if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                               toast.error(error.message);
                               } else {
                               toast.error('An unknown error occurred.');
                               }   
                     }
         }
       
         const handleSize = async () => {
                   setLoading(true);
                     const myHeaders = new Headers();
                     myHeaders.append("Content-Type", "application/json");
                     myHeaders.append("Authorization", token);
                     const requestOptions: RequestInit = {
                         method: "GET",
                         headers: myHeaders,
                         redirect: "follow"
                     };
                     try {
                         const response = await fetch(`${baseUrl}/product-size`, requestOptions);
                         if (!response.ok) {
                         const errorResponse = await response.json();
                         throw new Error(errorResponse.message);
                         }
                         const result = await response.json();        
                          setSize(result);
                          setLoading(false);
                     } catch (error) {
                               setLoading(false);
                               if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                               toast.error(error.message);
                               } else {
                               toast.error('An unknown error occurred.');
                               }   
                     }
         }
       
       const handleAddSubProduct = () => {
           setSubProducts([...subProducts, { 
               productImage : [],
               existingImages: [], 
               deletedImages: [],
               measurement : null,
               productPrice : 0,
               discountPrice : 0,
               productColor : '',
               productSize : '',
               productDescription : '',
               availableStockUnlimited : true,
               availableQty : 0
           }]);
         };
       
       const handleTagged = (tagName: string) => {
         setTagged([...tagged, { tagName }]);
       };
       const removeTag = (indexToRemove: number) => {
         setTagged(prev => prev.filter((_, index) => index !== indexToRemove));
       };
       
       const handleSelectedCategory = (data : string) => {
           setCategoryId(data);  
       }
       
      const handleSubProductChange = <K extends keyof SubProduct>( index: number, field: K, value: SubProduct[K] ) => { 
            const updated = [...subProducts]; 
            updated[index][field] = value; setSubProducts(updated); 
        };

       const handleDeleteNew = (index: number) => { 
        setProductImage(productImage.filter((_, i) => i !== index)); 
      };
       
        // Delete existing image (mark for deletion) 
        const handleDeleteExistingSubImage = (index: number, url: string) => { 
          const updated = [...subProducts]; 
          updated[index].existingImages = updated[index].existingImages.filter(img => img !== url); 
          updated[index].deletedImages = [...updated[index].deletedImages, url]; 
          setSubProducts(updated); 
        };

        const handleDeleteNewSubImage = (index: number, fileIndex: number) => { 
          const updated = [...subProducts]; 
          updated[index].productImage = updated[index].productImage.filter((_, i) => i !== fileIndex); 
          setSubProducts(updated);
         };

       const handleSubFileChange = (index: number, files: FileList | null) => { 
          if (!files) return; const updated = [...subProducts]; 
          const newFiles = Array.from(files); 
          updated[index].productImage = [...(updated[index].productImage || []), ...newFiles]; 
          setSubProducts(updated); 
        };
     


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

              setCategoryId(result.category.id);
              setIsActive(result.productSubs.length > 0 ? true : false);
              setSubProducts(
              result.productSubs.map((sub: any) => ({
              productId: sub.productId,
              productImage: [], 
              existingImages: sub.productImage || [], 
              deletedImages: [],
              measurement: null,
              productPrice: Number(sub.productPrice),
              discountPrice: Number(sub.discountPrice),
              productColor: sub.productColor,
              productSize: sub.productSize,
              productDescription: sub.productDescription,
              availableStockUnlimited: sub.availableStockUnlimited,
              availableQty: sub.availableQty ? Number(sub.availableQty) : null,
              }))
              );

            setExistingImages(result.productImage);
            setTagged(result.tag);
            setProductName(result.productName);
           setProductDescription(result.productDescription);
           setPrice(result.productPrice);
           setDiscount(result.discountPrice);
           setProductColor(result.productColor);
            setProductSize(result.productSize);
            setCurrency(result.currency);
            setMeasurement(result.sizeMeasurement);
           setAvailableStockUnlimited(result.availableStockUnlimited);
          setAvailableQty(result.availableQty);
          setRefProductId(result.productRefId);
          
          } catch (error: any) {
            toast.error(error.message || "Error fetching data");
          } finally {
            setLoading(false);
          }
        };

        const handleDeleteExisting = (url: string) => { 
          setExistingImages(existingImages.filter(img => img !== url)); 
          setDeletedImages([...deletedImages, url]); 
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
              <label>Product Description</label>
              <textarea name="description" value={productDescription} onChange={(e) => setProductDescription(e.target.value) } placeholder="Product Description" />
            </div>

            <div className="admin-input">
              <label>Product Color</label>
              <input value={productColor} onChange={(e) => setProductColor(e.target.value) } placeholder="Product Color" />
            </div>

            <div className="admin-input">
              <label>Product Size</label>

               {
                    loading ? (
                    <ButtonPreloader/>
                    ) : (
                  <select value={productSize} onChange={(e) => setProductSize(e.target.value) }>
                        <option value="">Product Size</option>
                     {
                      size.map((value, index)=>(
                        <option value={value.id}>{value.sizeName}</option>
                    )) 
                     }  

                    </select>

                    )
                    
                }
              
              <div className="createNew" onClick={() => setSizeAction(!sizeAction)}>
                create new size
              </div>
            </div>

          </div>

          {/* Categories */}
          <div className="prod-category">
            <div className="admin-prod-title">Categories</div>
                {
                    loading ? (
                    <ButtonPreloader/>
                    ) : (

                       category.map((value, index)=>(
                        <div className="prod-cat-item flex-center gap-10" >
                        <input 
                            type="checkbox"
                            checked={categoryId === value.id} 
                            onChange={()=>handleSelectedCategory(value.id)}
                        />
                        <p>{value.categoryName}</p>
                        <RiEditFill className='edit' onClick={() => editCategoryPop(value.id)}/>
                        </div>
                    )) 

                    )
                    
                }
            <div className="create-new"  onClick={() => setAuthAction(!authAction)}>Create New</div>
          </div>
        </div>

        {/* Image & Tags */}
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
        
                  <div className="prod-category">
                    <div className="admin-prod-title">Tags</div>
                    <div className="admin-input">
                      <label>Add Tags</label>
                      <input
                      type="text"
                      placeholder="Enter Tag Name"
                      onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                      handleTagged(e.currentTarget.value);
                      }
                      }}
                    />
        
                    </div>
                    <div className="addTags flex-center gap-10">
                      {
                      tagged.map((tag, index) => (
                        <div key={index} className="addTag flex-center gap-10">
                          <p>{tag.tagName}</p>
                          <RxCross2 onClick={() => removeTag(index)} />
                        </div>
                      ))
                      }
                    </div>
        
                    {/* <div className="create-new">Create New</div> */}
                     <div className="admin-input color-image">
                                <p>Measurement</p>
                            <label htmlFor={`file-measurement`} > <FiUploadCloud /> Upload measurement</label>
                            <input id={`file-measurement`} type="file" onChange={handleMeasurementChange} 
                            />
                        </div>
      
                  </div>
                </div>
                
                <div className="flex-wrap justification-between">
                      <div className="previewImage">

                        {existingImages && (
                          existingImages.map((item, index)=> (

                            <div className="imgPrev">
                              <img
                              key={index}
                              src={item}
                              alt="Preview"
                              style={{ width: '150px', height: 'auto', marginTop: '10px' }}
                              />

                              <MdCancel onClick={() => handleDeleteExisting(item)}/>
                              
                              </div>
                              
                              ))
                        )}

                        {/* New uploads */} 
                              {
                                   productImage && productImage.map((file, i) => (

                                 <div key={i} className="imgPrev"> 
                                      <img
                                      src={URL.createObjectURL(file)}
                                      alt="Preview"
                                      style={{ width: '150px', height: 'auto', marginTop: '10px' }}
                                      />
                                  <MdCancel onClick={() => handleDeleteNew(i)} /> 
                                  </div> 

                                  ))
                              }
                      </div>

                      <div className="previewImage">
                              {measurement && (
                              
                                <img
                                    src={typeof measurement === "string" 
                                    ? measurement 
                                    : URL.createObjectURL(measurement)}
                                    alt="Preview"
                                    style={{ width: '150px', height: 'auto', marginTop: '10px' }}
                                />

                              )}
                      </div>
                </div>
                

        {/* Pricing */}
        <div className="product-form-top flex justification-between">
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
                    <div className="admin-input">
                      <label>Product Price</label>
                      <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} placeholder="Enter Price" />
                    </div>
              </div>

              <div className="admin-input discount-input">
                <label>Discount Price</label>
                <input  type="number" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value))} placeholder="Enter Discount" />
              </div>
            </div>

            <div className="admin-flex-input flex-center gap-10">
              <div className="admin-input">
                  <label>Available Stock</label>
                  <select
                  value={availableStockUnlimited === true ? "true" : "false"}
                  onChange={(e) => availableFunction(e.target.value === "true")}
                  >
                  <option value="">Available stock</option>
                  <option value="true">Unlimited</option>
                  <option value="false">Custom</option>
                  </select>
                  </div>



               {
                !availableStockUnlimited && (
                      <div className="admin-input">
                      <label>Available Quantity</label>
                      <input  type="number" value={availableQty} onChange={(e) => setAvailableQty(parseInt(e.target.value))}  />
                      </div>
                )
               }

            </div>

          </div>
        </div>

        {/* Variants */}
        <div className="product-form-top flex justification-between">
          <div className="admin-prd-form">

            <div className="admin-prod-title">Different Option</div>

                <div className="switch-con-flex flex-center gap-10">
                  <div className="radio-group">
                        
                            <label className="toggle-switch">
                            <input type="checkbox" checked={isActive} onChange={handleToggle} />
                            <span className="slider"></span>
                            </label>
                          
                    </div>  <p>This product has multiple options</p>
                </div>
                {
                  isActive && (

                        subProducts.map((subProduct, index) => (
                        
                        <div key={index} className="sub-product">
                            <h2>product {index + 1}</h2>  

                                <div className="admin-flex-input flex-center gap-10">

                                        <div className="admin-input">
                                        <label>Color</label>
                                        <input
                                        type="text"
                                        value={subProduct.productColor}
                                        onChange={(e) => handleSubProductChange(index, 'productColor', e.target.value)}
                                        placeholder="Enter Color"
                                        />
                                        </div>

                                    <div className="admin-input color-image">
                                          <p>Color Image</p>
                                          <label htmlFor={`file-color-input-${index}`} > <FiUploadCloud /> Upload Color Image</label>
                                   
                                           <input id={`file-color-input-${index}`} 
                                                type="file"
                                                multiple 
                                                onChange={(e) => handleSubFileChange(index, e.target.files)
                                                } 
                                   
                                                                       />
                                      </div>
                                </div>

                           <div className="ColorPreview">
                               {/* Existing images from backend */} 
                               {
                               subProduct.existingImages && subProduct.existingImages.map((url, i) => ( 
                                <div key={i} className="imgPrev"> 
                                  <img src={url} alt="Existing" style={{ width: '100px', height: '100px', marginTop: '10px' }} /> 
                                  <MdCancel onClick={() => handleDeleteExistingSubImage(index, url)} /> 
                                </div> 
                              ))}


                              {/* New uploads */} 
                              {
                              subProduct.productImage && subProduct.productImage.map((file, i) => (
                                 <div key={i} className="imgPrev"> 
                                 <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />
                                  <MdCancel onClick={() => handleDeleteNewSubImage(index, i)} /> </div> ))
                              }
                            </div>

                                <div className="admin-flex-input flex-center gap-10">

                                    <div className="admin-input">
                                    <label>Size</label>
                                    

                                    {
                                      loading ? (
                                      <ButtonPreloader/>
                                      ) : (
                                      <select value={subProduct.productSize}
                                       onChange={(e) => handleSubProductChange(index, 'productSize', e.target.value)}>
                                      <option value="">Product Size</option>
                                          {
                                          size.map((value, index)=>(
                                          <option value={value.id}>{value.sizeName}</option>
                                          )) 
                                          }  
                                      </select>

                                      )

                                    }
                                    <div className="createNew" onClick={() => setSizeAction(!sizeAction)}>
                                      create new size
                                    </div>
                                    </div>

                                    <div className="admin-input">
                                    <label>Price</label>
                                    <input
                                    type="number"
                                    value={subProduct.productPrice}
                                    onChange={(e) => handleSubProductChange(index, 'productPrice', parseFloat(e.target.value))}
                                    placeholder="Price"
                                    />
                                    </div>
                                </div>

                                <div className="admin-flex-input flex-center gap-10">

                                    <div className="admin-input">
                                    <label>Discount Price</label>
                                    <input
                                    type="number"
                                    value={subProduct.discountPrice}
                                    onChange={(e) => handleSubProductChange(index, 'discountPrice', parseFloat(e.target.value))}
                                    placeholder="Price"
                                    />
                                    </div>

                                   <div className="admin-input">
                                      <label>Available stock</label>
                                      <select
                                        value={subProduct.availableStockUnlimited ? "true" : "false"}
                                        onChange={(e) =>
                                          handleSubProductChange(index, 'availableStockUnlimited', e.target.value === "true")
                                        }
                                      >
                                        <option value="">Available stock</option>
                                        <option value="true">Unlimited</option>
                                        <option value="false">Custom</option>
                                      </select>
                                  </div>

                                </div>

                        {!subProduct.availableStockUnlimited && (
                        <div className="admin-input">
                        <label>Available Quantity</label>
                        <input
                          type="number"
                          value={subProduct.availableQty ?? 0}
                          onChange={(e) =>
                            handleSubProductChange(index, 'availableQty', parseInt(e.target.value))
                          }
                        />
                        </div>
                        )}






                                {/* <div className="admin-flex-input flex-center gap-10">

                                  
                                        <div className="admin-input">
                                              <label>Product Description</label>
                                              <textarea name="description" 
                                              value={productDescription} 
                                              onChange={(e) => handleSubProductChange(index, 'productDescription', e.target.value)}
                                              placeholder="Product Description" />
                                         </div>

                                    <div className="admin-input color-image">
                                        <p>Measurement</p>
                                    <label htmlFor={`file-measurement-input-${index}`} > <FiUploadCloud /> Upload measurement</label>
                                    <input id={`file-measurement-input-${index}`} type="file" onChange={(e) => handleSubMeasurementFileChange(index, e.target.files?.[0] || null)} 
                                    />
                                    </div>

                                </div> */}

                            {/* <div className="ColorPreview">
                                {subProduct.measurement && (
                                <img
                                src={URL.createObjectURL(subProduct.measurement)}
                                alt="Preview"
                                style={{ width: '100px', height: '100px', marginTop: '10px' }}
                                />
                                )}
                            </div> */}

                        </div>
                        ))
                  )  
                }
           <div className="addmore" onClick={handleAddSubProduct}> add more </div>
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

      {
          catPop && (
            <EditCategory catId={catId} catPop={catPop} setCatPop={setCatPop} setCategory={setCategory}/>
          )
      }
       <CategoryProductPop authAction={authAction} setAuthAction={setAuthAction} setCategory={setCategory}/>

       <SizePop sizeAction={sizeAction} setSizeAction={setSizeAction} setSize={setSize}/>


{/* ============================================ */}
             

      
        </div>


    </div>
  )
}

export default EditProduct