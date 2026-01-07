import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import product1 from '../assets/images/product1.png'
import product2 from '../assets/images/product2.png'
import product3 from '../assets/images/product3.jpg'
import product4 from '../assets/images/product4.png'
import product5 from '../assets/images/product5.png'
import product6 from '../assets/images/product6.png'
import product7 from '../assets/images/product7.png'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ComingSoon from './ComingSoon'
import { userAuth } from '../pages/context/AuthContext'
import ButtonPreloader from './ButtonPreloader'
import { toast } from 'react-toastify'
import AuthComponent from './AuthComponent'

interface Product {
    productId: string;
    productName: string;
    productColor: string;
    productDescription: string;
    productImage: string;
    discountPrice: number;
    productPrice: number;
    productSize: string;
    availableQty: string;
    availableStockUnlimited: boolean
}

function Product() {

  const [product, setProduct] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [authAction, setAuthAction] = useState<boolean>(false);
  const [subNav, setSubNav] = useState<boolean>(false);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const {baseUrl, signin, token, setCart} = userAuth();


  const authFunction = () => {
        setAuthAction(true);
      }

  useEffect(() => {
    const updateSize = () => {
      setVisibleCount(window.innerWidth < 768 ? 2 : 3);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const shuffleLeft = () => {
    setProduct(prev => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const shuffleRight = () => {
    setProduct(prev => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, -1);
      return [last, ...rest];
    });
  };
const [popAction, setPopAction] = useState<boolean>(false);

 useEffect(() => {
            getData(page);
      }, [page]);

     const getData = async (pageNumber : number) => {
            setLoading(true);
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              const requestOptions: RequestInit = {
                  method: "GET",
                  headers: myHeaders,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/active-product?page=${pageNumber}`, requestOptions);
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                 const result = await response.json(); 
                   if (result.status === true) {
                    setProduct(result.data);
                }else{
                    // setPopAction(true);
                }
                   
              } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                  
              }
    }

    const AddToCart = async (productId : string, productName : string, productColor : string, productPrice : number, quantity : number,  productImage : string, productSize : string) => {
                          setLoadingProductId(productId);
                        const myHeaders = new Headers();
                        myHeaders.append("Authorization", token);
                        myHeaders.append("Content-Type", "application/json");
                        const raw = JSON.stringify({
                            'product_id' : productId,
                            'product_image' :  productImage,
                            'product_size' : productSize,
                            'product_name' : productName,
                            'product_color' : productColor,
                            'product_price' : productPrice,
                            'quantity' : quantity
                           
                        });
                        const requestOptions: RequestInit = {
                            method: "POST",
                            headers: myHeaders,
                            body: raw,
                            redirect: "follow"
                        };
                        try {
                            const response = await fetch(`${baseUrl}/add-to-cart`, requestOptions); 
                            if (!response.ok) {
                            const errorResponse = await response.json();
                            throw new Error(errorResponse.message);
                            }
                            const result = await response.json();    
                            setCart(result);
                            setLoading(false);    
                            setLoadingProductId(null);
                            toast.success("Product added Successfully");       
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
    
  return (
    <div className='productCon'>
        <ComingSoon popAction={popAction} setPopAction={setPopAction} />
         <div className="productContainer flex-center gap-20">

            <div className="productHeader">
                <div className="productHeaderTitle">
                    BestSellers
                </div>
                <div className="productShop">
                    <NavLink to="/product" className="shopBtn">
                        view shop
                    </NavLink>
                </div>
            </div>

            <div className="productList flex-center gap-20">
                <div className="arrowLeft" onClick={shuffleLeft}>
                    <FaChevronLeft />
                </div>

                <div className="flex-center productItemWrapper">

                    <AnimatePresence initial={false} mode="popLayout">
                        {product.slice(0, visibleCount).map((item, index) => (
                            <motion.div
                                key={item.productId}
                                layout
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -100, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="product"
                                >
                            <div className="productImage">
                                <img src={item.productImage} />
                            </div>
                            <div className="productDetails">
                                <div className="productTitle flex-center">
                                    <h2>{item.productName}</h2>
                                    <div className="price">
                                        <span>₦</span>{item.productPrice.toLocaleString()}
                                    </div>
                                </div>
                                <div className="productDetail">
                                    <NavLink to={`/product-details/${item.productId}`}>
                                        <div className="productDescription">
                                        {item.productDescription}
                                        </div>
                                    </NavLink>

                                    <div className="productIconWrap">
                                {
                                signin ? (
                                    loadingProductId === item.productId ? (
                                       <ButtonPreloader/>
                                    ) : (
                                            <div className="productIcon"  onClick={() => AddToCart(item.productId, item.productName, item.productColor, item.discountPrice, 1, item.productImage, item.productSize)}>
                                                <FiShoppingCart />
                                                <div className="plusIcon"><FaPlus /></div>
                                            </div>
                                            )
                                )  : (
                                    <div className="productIcon" onClick={authFunction}>
                                        <FiShoppingCart />
                                        <div className="plusIcon"><FaPlus /></div>
                                    </div> 
                                     )
                                    }
                                    </div>
                                </div>
                            </div>
                        

                            </motion.div>
                        ))}
                        
                    </AnimatePresence>

                </div>


                <div className="arrowRight" onClick={shuffleRight}>
                    <FaChevronRight />
                </div>
            </div>
         </div>


             {
    !signin && (
        <AuthComponent authAction={authAction} setAuthAction={setAuthAction} setSubNav={setSubNav}/>
    )
    } 

    </div>
  )
}

export default Product