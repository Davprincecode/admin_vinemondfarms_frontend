import { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png';
import {toast } from 'react-toastify';
import {NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../pages/context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RxCross2, RxDividerVertical } from 'react-icons/rx';
import { IoIosStar, IoIosStarOutline, IoMdCheckmark } from 'react-icons/io';
import product3sub4 from '../assets/images/product3sub4.png';
import { MdArrowOutward, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { IoLocationOutline } from 'react-icons/io5';
import { TbTruckDelivery } from 'react-icons/tb';
import { CiCircleQuestion } from 'react-icons/ci';
import ButtonPreloader from './ButtonPreloader';

interface categoryInterface {
"id": string,
"categoryName": string
}

interface authComponentInterface {
    authAction : boolean,
    setAuthAction: React.Dispatch<React.SetStateAction<boolean>>;
    setCategory: React.Dispatch<React.SetStateAction<categoryInterface[]>>;
}

const CategoryPop : React.FC<authComponentInterface> = ({authAction, setAuthAction, setCategory}) =>{

  const navigate = useNavigate();
  const {baseUrl, token} = userAuth();  
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');
  

  const handleCategoryPost = async () => {
            setLoading(true);
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Authorization", token);
              const raw = JSON.stringify({
                        'category_name' : categoryName
                    });
              const requestOptions: RequestInit = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/blog-category`, requestOptions);
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json(); 
                  setLoading(false); 
                  setCategory(prev => [...prev, result.data]); 
                   setAuthAction(!authAction);
              } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                  
              }
            }


  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

  const handleCategory = () => {
      setLoading(true);
    //   setLoading(false);
  }

  return (
    <div className="track-con" style={{display : authAction ? "flex" : "none"}}>

      <div className="category-body">
         
        {/* <div className="cancel"  onClick={() => setAuthAction(!authAction)}>
                <RxCross2 />
                </div> */}
             <div className="category-header-title">
                new category
             </div>
            <div className="category-pop-con">
            <div className="input">
            <input type="text" placeholder='Enter Category' value={categoryName} onChange={(e) => setCategoryName(e.target.value) }/>
            </div>

            <div className="btn-flex-con">
            <div className="cancelBtn"  onClick={() => setAuthAction(!authAction)}>
                cancel
            </div>

            {
              loading ? (
                      <div className="enterBtn">
                          <ButtonPreloader/>
                      </div>
                    ) : (
                    <div className="enterBtn" onClick={handleCategoryPost}>
                        save
                    </div>
                    )
            }
            
            </div>


            </div>

      </div>
    </div>
  )
}

export default CategoryPop


