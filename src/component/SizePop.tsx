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


interface sizeInterface {
"id": number,
"sizeName": string
}

interface authComponentInterface {
    sizeAction : boolean,
    setSizeAction: React.Dispatch<React.SetStateAction<boolean>>;
    setSize: React.Dispatch<React.SetStateAction<sizeInterface[]>>;
}

const SizePop : React.FC<authComponentInterface> = ({sizeAction, setSizeAction, setSize}) =>{

  const navigate = useNavigate();
  const {baseUrl, token} = userAuth();  
  const { pathname } = useLocation();
  const [sizeName, setSizeName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
const handleCategoryPost = async () => {
            setLoading(true);
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Authorization", token);
              const raw = JSON.stringify({
                        'size_name' : sizeName
                    });
              const requestOptions: RequestInit = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/product-size`, requestOptions);  
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json(); 
                   setLoading(false);
                   setSize(prev => [...prev, result.data]);
                   setSizeAction(!sizeAction)
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
    <div className="track-con" style={{display : sizeAction ? "flex" : "none"}}>

      <div className="category-body">
         
        {/* <div className="cancel"  onClick={() => setAuthAction(!authAction)}>
                <RxCross2 />
                </div> */}
             <div className="category-header-title">
                new product size
             </div>
            <div className="category-pop-con">
            <div className="input">
            <input type="text" placeholder='Enter Product Size'  value={sizeName} onChange={(e) => setSizeName(e.target.value) }/>
            </div>

            <div className="btn-flex-con">
            <div className="cancelBtn"  onClick={() => setSizeAction(!sizeAction)}>
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

export default SizePop


