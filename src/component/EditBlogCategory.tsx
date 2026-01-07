import { useEffect, useState } from 'react'
import {toast } from 'react-toastify';
import {useLocation, useNavigate} from 'react-router-dom';
import { userAuth } from '../pages/context/AuthContext';
import ButtonPreloader from './ButtonPreloader';


interface categoryInterface {
"id": string,
"categoryName": string
}

interface authComponentInterface {
    catId : string;
    catPop : boolean;
    setCatPop : React.Dispatch<React.SetStateAction<boolean>>;
    setCategory: React.Dispatch<React.SetStateAction<categoryInterface[]>>;
}

const EditBlogCategory : React.FC<authComponentInterface> = ({catPop,  setCatPop, catId, setCategory}) =>{

  const navigate = useNavigate();
  const {baseUrl, token} = userAuth();  
  const { pathname } = useLocation();
  const [categoryName, setCategoryName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  

  useEffect(() => {
      getCategory();
    }, []);
  
     const getCategory = async () => {
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
            const response = await fetch(`${baseUrl}/blog-category/${catId}`, requestOptions);
        
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json(); 
             setCategoryName(result.data.categoryName);
             setLoading(false)
        } catch (error) {
            setLoading(false);
            if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
            toast.error(error.message);
            } else {
            toast.error('An unknown error occurred.');
            }
    }
    }


    const handleCategoryPost = async () => {
         setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        const raw = JSON.stringify({
                'category_name' : categoryName
            });
        const requestOptions: RequestInit = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        try {
            const response = await fetch(`${baseUrl}/blog-category/${catId}`, requestOptions);
        
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json(); 
            const data = result.data.category_name;
            setLoading(false);
            setCategory(prev =>
                        prev.map(cat =>
                        cat.id === catId ? { ...cat, categoryName: data } : cat
                        )
            );

            setCatPop(!catPop)
        } catch (error) {
            setLoading(false);
            if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
            toast.error(error.message);
            } else {
            toast.error('An unknown error occurred.');
            }
    }
    }

  
  
  return (
    <div className="track-con" style={{display : catPop ? "flex" : "none"}}>

      <div className="category-body">
         
        {/* <div className="cancel"  onClick={() => setAuthAction(!authAction)}>
                <RxCross2 />
                </div> */}
             <div className="category-header-title">
                new category
             </div>
            <div className="category-pop-con">
            <div className="input">
            <input type="text" placeholder='Enter Category'  value={categoryName} onChange={(e) => setCategoryName(e.target.value) }/>
            </div>

            <div className="btn-flex-con">
            <div className="cancelBtn"  onClick={() => setCatPop(!catPop)}>
                cancel
            </div>
            { loading ? (
                   <div className="enterBtn">
                    <ButtonPreloader/>
                    </div>
                    ) : (
                    <div className="enterBtn" onClick={handleCategoryPost}>
                        save
                    </div>
                    )}
            </div>


            </div>

      </div>
    </div>
  )
}

export default EditBlogCategory


