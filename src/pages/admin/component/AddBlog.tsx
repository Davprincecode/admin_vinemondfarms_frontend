import React, { useEffect, useRef, useState } from "react";
import WordLikeEditor from "../WordEditor";
import { div } from "framer-motion/client";
import SideNavAdmin from "../../../component/SideNavAdmin";
import AdminTopHeader from "../../../component/AdminTopHeader";
import { RxCross2 } from "react-icons/rx";
import ButtonPreloader from "../../../component/ButtonPreloader";
import { userAuth } from "../../context/AuthContext";
import CategoryPop from "../../../component/CategoryPop";
import { toast } from "react-toastify";
import DeletePopup from "./DeletePopUp";
import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import EditBlogCategory from "../../../component/EditBlogCategory";

interface tagInterface {
"id": number,
"tagName": string
}
interface categoryInterface {
"id": string,
"categoryName": string
}
type tagType = {
    tagName  : string; 
}
type popType = {
  toggleToDefault : () => void;
}

 const AddBlog = ({toggleToDefault} : popType) => {

  const {baseUrl, token} = userAuth();
    const[tag, setTag] = useState<tagType[]>([]);
    const[tagged, setTagged] = useState<tagType[]>([]);
    const[category, setCategory] = useState<categoryInterface[]>([]);
    const[size, setSize] = useState<tagInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const[categoryId, setCategoryId] = useState<string>('');
    const[authAction, setAuthAction] = useState<boolean>(false);
    const [dragActive, setDragActive] = useState(false);
    const [editorContent, setEditorContent] = useState<string>('');
    const [blogTitle, setBlogTitle] = useState<string>('');
    const [blogImage, setBlogImage] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const[catId, setCatId] = useState<string>('');
    const[catPop, setCatPop] = useState<boolean>(false);

    const [content, setContent] = React.useState("");
        

        
  useEffect(() => {
          // handleTags()
          handleCategory()
        }, []);

  const editCategoryPop = (id : string) => {
      setCatId(id);
      setCatPop(true);
   }

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


  const handleBlog = async () => {
    setLoading(true);
          const myHeaders = new Headers();
          myHeaders.append("Authorization", token);
          if (!blogImage) {
                  toast.error("No blog image");
                  setLoading(false);
                  return;
              }
          // const raw = JSON.stringify({ blogText: editorContent });
            const formdata = new FormData();
                  formdata.append("categoryId", categoryId);
                  formdata.append("blogTitle", blogTitle);
                  formdata.append("blogImage",  blogImage);
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
              const response = await fetch(`${baseUrl}/blog`, requestOptions);     
              if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
              }
              const result = await response.json();       
                setLoading(false); 
                toast.success("Data Upload Successfully");   

                setCategoryId("");
                setBlogTitle("");
                setBlogImage(null);
                setTagged([]);
                setContent("");
                toggleToDefault();
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


  const handleDeleteClick = (id: string) => {
          setSelectedId(id);
          setShowPopup(true);
          };

  const handleDeleteConfirm = async (id: string | number) => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", token);
      const requestOptions: RequestInit = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow"
      };
      try {
          const response = await fetch(`${baseUrl}/blog-category/${id}`, requestOptions);
          if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
          }
          const result = await response.json();   
          setLoading(false);
          setShowPopup(false);
          setSelectedId(null);
          setLoading(false);
          setCategory(category.filter(item => item.id !== id));
          toast.error("delete successfully");
      } catch (error) {
                  setLoading(false);
                  if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                  toast.error(error.message);
                  } else {
                  toast.error('An unknown error occurred.');
                  }
          
      }

  };

        return ( 

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
          src={URL.createObjectURL(blogImage)}
          alt="Preview"
          style={{ width: '150px', height: 'auto', marginTop: '10px' }}
          />
          )}
          </div>

          {/* <WordLikeEditor editorRef={editorRef}/>   */}
          <WordLikeEditor  onChange={(html) => setContent(html)}/>  

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
                                checked={categoryId === value.id} 
                                onChange={()=>handleSelectedCategory(value.id)}
                            />
                            <p>{value.categoryName}</p>
                             <RiEditFill className='edit' onClick={() => editCategoryPop(value.id)}/>
                            </div>
                    )) )}
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

        <DeletePopup
          isOpen={showPopup}
          itemId={selectedId ?? ""}
          onCancel={() => setShowPopup(false)}
          onDelete={handleDeleteConfirm}
        />

          </div>




        );
}


export default AddBlog