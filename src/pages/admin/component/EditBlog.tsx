import React, { useEffect, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import envelop from '../../../assets/images/envelop.png'
import { RiDeleteBin6Line, RiEditFill } from 'react-icons/ri'
import { FaFileArrowUp } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { userAuth } from '../../context/AuthContext';
import ButtonPreloader from '../../../component/ButtonPreloader';
import { IoIosArrowBack } from 'react-icons/io';
import CategoryPop from "../../../component/CategoryPop";
import { IoSettingsOutline } from 'react-icons/io5';
import WordLikeEditor from '../WordEditor';
import { RxCross2 } from 'react-icons/rx';
import EditBlogCategory from '../../../component/EditBlogCategory';



interface categoryInterface {
"id": string,
"categoryName": string
}
type tagType = {
    tagName  : string; 
}

interface HeroInterface {
  heroFunction: () => void;
  editId : string;
  setEditId : (id : string) => void;
}

const EditBlog : React.FC<HeroInterface> = ({ heroFunction, editId, setEditId }) => {     
      const {baseUrl, token} = userAuth();
         const[tag, setTag] = useState<[]>([]);
         const[tagged, setTagged] = useState<tagType[]>([]);
         const[category, setCategory] = useState<categoryInterface[]>([]);
         const [loading, setLoading] = useState<boolean>(false);
         const[categoryId, setCategoryId] = useState<string>('');
         const[authAction, setAuthAction] = useState<boolean>(false);
         const [dragActive, setDragActive] = useState(false);
         const [blogTitle, setBlogTitle] = useState<string>('');
         const [blogImage, setBlogImage] = useState<File | string | null>(null);
        const[catId, setCatId] = useState<string>('');
        const[catPop, setCatPop] = useState<boolean>(false);
        const [content, setContent] = React.useState("");


        const editCategoryPop = (id : string) => {
        setCatId(id);
        setCatPop(true);
        }
     
             
       useEffect(() => {
               // handleTags()
               handleCategory()
             }, []);
     
       const handleTags = async () => {
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
              const response = await fetch(`${baseUrl}/product-tag`, requestOptions);
              if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
              }
              const result = await response.json();  
              setTag(result);
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
                       const response = await fetch(`${baseUrl}/blog-category`, requestOptions);
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
     
     const handleTagged = (tagName: string) => {
       setTagged([...tagged, { tagName }]);
     };
     const removeTag = (indexToRemove: number) => {
       setTagged(prev => prev.filter((_, index) => index !== indexToRemove));
     };
     
     const handleSelectedCategory = (data : string) => {
         setCategoryId(data);  
     }
     
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
         const file = e.target.files?.[0] || null;
         setBlogImage(file);
       };
        
        const validateCourseForm = () => {
          // if (!title.trim()) {
          //   toast.error("Course title is required");
          //   return false;
          // }
          
          return true;
        };
    
         

      useEffect(() => {
        getBlog();
      }, []);
       const getBlog = async () => {
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
            const response = await fetch(`${baseUrl}/get-blog/${editId}`, requestOptions);
             if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                }
              const result = await response.json(); 
              setBlogImage(result.data.blogImage);
              setBlogTitle(result.data.blogTitle);
              setContent(result.data.blogText);
              setCategoryId(result.data.categoryId);
              setTagged(result.data.tags.map((tag: any) => ({ tagName: tag })));
          } catch (error: any) {
            toast.error(error.message || "Error fetching data");
          } finally {
            setLoading(false);
          }
        };


       const handleBlog = async () => {
         setLoading(true);
               const myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                
                 const formdata = new FormData();
                       formdata.append("categoryId", categoryId);
                       formdata.append("blogTitle", blogTitle);

                      
                      if(blogImage){
                        if(typeof blogImage !== "string"){
                           formdata.append("blogImage",  blogImage) ;
                        }
                      }

                       if(tagged.length > 0){
                              tagged.forEach((tag, index) => {
                                formdata.append(`tags[${index}]`, tag.tagName);
                              });
                          }
                       formdata.append("blogText", content);
                const requestOptions: RequestInit = {
                    method: "POST",
                    headers: myHeaders,
                    body: formdata,
                    redirect: "follow"
                };
                try {
                    const response = await fetch(`${baseUrl}/update-blog/${editId}`, requestOptions); 
                    
                    if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message);
                    }
                    const result = await response.json();   
                        setLoading(false); 
                        toast.success("Data Updated Successfully");  
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
                <h4>Edit Blog</h4>
            </div>

                           <div>
          <div className="wrap-blog flex justification-between">

          <div className="blog-1">
          <div className="admin-input">
          {/* <label>Blog Title</label> */}
          <div className="admin-prod-title blog-title">Blog Title</div>
          <input  type="text" value={blogTitle} 
          onChange={(e) => setBlogTitle(e.target.value) } 
          placeholder="Enter Title" 
          />
          </div>

          <div className="admin-prd-form">
          <div className="admin-prod-title blog-title">Blog Image</div>
          <div className={`uploadWrapper ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          >
          <label htmlFor="file-input">Add Files</label>
          <input id="file-input" type="file" onChange={handleFileChange} />
          <p>or drag and drop files</p>
          </div>
          </div>

          <div className="previewImage">
          {blogImage && (
          <img
          src={
            typeof blogImage === "string" ? 
                blogImage
            : URL.createObjectURL(blogImage)
          }
          alt="Preview"
          style={{ width: '150px', height: 'auto', marginTop: '10px' }}
          />
          )}
          </div>


           <WordLikeEditor 
             initialContent ={content} 
            onChange={(html) => setContent(html)}
            />      
          </div>


          <div className="blog-2-container">
          <div className="categoryTag">
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
                            checked={categoryId == value.id} 
                            onChange={()=>handleSelectedCategory(value.id)}
                            />
                            <p>{value.categoryName}</p>
                            <RiEditFill className='edit' onClick={() => editCategoryPop(value.id)}/>
                            </div>
                    )) 

                    )
                    
                    }
            <div className="create-new" onClick={() => setAuthAction(!authAction)}>Create New</div>
            </div>
            </div>

          {/* Image & Tags */}
          <div className="product-form-top flex justification-between">
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
          </div>
          </div>
          </div>

          </div>
          {
                      loading ? (
                      <div className="admin-input">
                              <div className='inActive'><ButtonPreloader/></div>
                      </div>
                      ) : (
                      
                      <div className="admin-input">
                      <div className="btn" onClick={handleBlog}>Submit</div>
                      </div> 
                      
                      //       <div className="admin-input inActive">
                      //         <div className="btn inActive">Submit</div>
                      //       </div> 
                      
                      
              )}
          {
              catPop && (
                <EditBlogCategory catId={catId} catPop={catPop} setCatPop={setCatPop} setCategory={setCategory}/>
              )
          }
          <CategoryPop  authAction={authAction} setAuthAction={setAuthAction} setCategory={setCategory}/>


          </div>

        </div>


    </div>
  )
}

export default EditBlog