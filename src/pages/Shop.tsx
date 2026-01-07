import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import shopImage from '../assets/images/shopImage.png'
import shopImage1 from '../assets/images/shopImageMobile.png'
import product1 from '../assets/images/product1.png'
import product2 from '../assets/images/product2.png'
import product3 from '../assets/images/product3.jpg'
import product4 from '../assets/images/product4.png'
import product5 from '../assets/images/product5.png'
import product6 from '../assets/images/product6.png'
import product7 from '../assets/images/product7.png'
import ads from '../assets/images/discount.png'
import { FiShoppingCart } from 'react-icons/fi'
import { IoSearchOutline } from 'react-icons/io5'
import { CiFilter } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { userAuth } from './context/AuthContext'
import Pagination from '../component/Pagination'
import ButtonPreloader from '../component/ButtonPreloader'
import AuthComponent from '../component/AuthComponent'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import OfflineShop from '../component/OfflineShop'


interface categoryInterface {
"id": string,
"categoryName": string
}
interface sizeInterface {
"id": string,
"sizeName": string
}

 interface Category {
  id: number;
  name: string;
}

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
    category: Category;
}

interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

interface bannerIntern {
galleryType : string;
id : string;
image : string;
status : string;
}
  
function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const[category, setCategory] = useState<categoryInterface[]>([]);
    const[size, setSize] = useState<sizeInterface[]>([]);
    const[banner, SetBanner] = useState<bannerIntern[]>([]);
     const [meta, setMeta] = useState<Meta | null>(null);
    const [filter, setFilter] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [authAction, setAuthAction] = useState<boolean>(false);
    const [subNav, setSubNav] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [popAction, setPopAction] = useState<boolean>(false);
     const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
     const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const {baseUrl, signin,  token, cart, setCart, loggedIn} = userAuth();

      const authFunction = () => {
        setAuthAction(true);
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

      useEffect(() => {
            getBanner();
      }, []);

      useEffect(() => {
            getData(page);
            handleCategory();
            handleSize();
      }, [page]);

    const getBanner = async () => {
        setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/product-banner`, requestOptions);
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();
                SetBanner(result.data);
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

    const getData = async (pageNumber : number) => {
       if(selectedCategory){
            setSelectedCategory('');
       }
        if(selectedSize){
            setSelectedSize('');
        }
        
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
                    setProducts(result.data);
                }else{
                    setPopAction(true);
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

     const handleCategory = async () => {
            setLoading(true);
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
            //   myHeaders.append("Authorization", token);
              const requestOptions: RequestInit = {
                  method: "GET",
                  headers: myHeaders,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/page-product-category`, requestOptions);
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
            //   myHeaders.append("Authorization", token);
              const requestOptions: RequestInit = {
                  method: "GET",
                  headers: myHeaders,
                  redirect: "follow"
              };
              try {
                  const response = await fetch(`${baseUrl}/page-product-size`, requestOptions);
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

    const productSearch = async (search : string) => {
        if(search == ''){
             getData(page);
        }
        setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/product-search/${search}`, requestOptions);
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();
                setProducts(result.data); // products come under "data"
                setMeta(result.meta);     // pagination meta
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

    const productFilter = async (key: string, value : string) => {
        if(key === 'product_size'){
             setSelectedSize(value);
        }else{
         setSelectedCategory(value);   
        }
        
        
        setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions: RequestInit = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    [key]: value
                }),
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/product-filter`, requestOptions);
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();
                setProducts(result.data); // products come under "data"
                setMeta(result.meta);     // pagination meta
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

    const productPriceRangeFilter = async (minValue : string, maxValue : string) => {
        // setSelectedCategory(values); 
        setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions: RequestInit = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                   'min_price' : minValue,
                   'max_price' : maxValue
                }),
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/product-filter`, requestOptions);
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();
                setProducts(result.data); // products come under "data"
                setMeta(result.meta);     // pagination meta
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


    const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }
  return (
    <div className="shop-con pageNav">
    <Header />

    <div className="shop-container">
                    {
                        loading && (
                            <div className="cart-prealoader">
                                <ButtonPreloader/>
                            </div>

                        ) 
                    }
        <div className="flex-center justification-between shop-header">
            <div className="page-title">
               <span> Home </span> / Shop
            </div>

             <div className="flex-center gap-20 sort-cart-wrapper">
              <div className="flex-center shop-cart-con">
                <div className="shop-cart-icon"><FiShoppingCart /></div>
               <p className="shop-cart">cart</p>
               <div className="cartNum">{ cart }</div>
              </div>

              <div className="flex-center gap-5 sort-by-con">
                <div className="sort">Sort by: </div>
                <div className="sort-by">
                    <select >
                        <option value="">Name</option>
                    </select>
                </div>
              </div>
            </div>
        </div>

        <div className="shop-banner">
            <Carousel 
                  responsive={responsive}
                  autoPlay={true}
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  infinite={true}
                  partialVisible={false}
                  autoPlaySpeed={10000}
                  customTransition="all .5"
                  transitionDuration={500}
                 >
                {
                    banner.map((item, index) => (
                        item.galleryType == "desktopHeroBanner" ? 
                        (
                        <img src={item.image} className='shop-desk-image' />
                        ) : (
                            null
                        )
                    ))
                }
                </Carousel>
                
                 <Carousel 
                  responsive={responsive}
                  autoPlay={true}
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  infinite={true}
                  partialVisible={false}
                  autoPlaySpeed={10000}
                  customTransition="all .5"
                  transitionDuration={500}
                 >
                {
                    banner.map((item, index) => (
                        item.galleryType == "mobileHeroBanner" ? 
                        (
                        <img src={item.image} className='shop-mobile-image' />
                        ) : (
                            null
                        )
                    ))
                }
                </Carousel>
        </div>

        <div className="shop-search-con flex-center justification-between">

            <div className="shop-filter" style={{background: filter ? "#DADADA" : "white"}} onClick={()=>setFilter(!filter)}>
                <CiFilter />
                <input type="text" placeholder='filter' className="filter" readOnly  style={{background: filter ? "#DADADA" : "white"}}/>
                <RxCross2 className='filter-cancel' style={{display : filter ? "block" : "none"}}/>
            </div>

            <div className="shop-search">
                <IoSearchOutline />
                <input type="text" placeholder='Search Shop' onChange={(e) => productSearch(e.target.value)}/>
                <div className="search-shop">search</div>
            </div>  

        </div>

        <div className="shop-product-container">

            <div className="product-ads-con">

                <div className="product-filter">
                  <div className="product-filter-line" style={{display : filter ? "none" : "block"}}></div>

                  <div className="product-filter-list" style={{display : filter ? "block" : "none"}}>
                    <div className="filter-number">
                        Showing <span>{products.length}</span> items
                    </div>

                    
                    <div className="filter-category">
                        <div className="filter-header">category</div>

                             {
                                category.map((item, index)=>(
                                    <div className="filter-list flex-center gap-10" key={index}>
                            <div className="filter-input">
                                <input type="checkbox"
                                 checked={selectedCategory === item.id} 
                                  />
                            </div>
                            <p>{item.categoryName}</p>
                        </div>
                                ))
                             }
                       
                        
                    </div>

                    <div className="filter-price">
                        <div className="filter-header">price range</div>

                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input">
                                <input type="checkbox" />
                            </div>
                            <p className="flex-center gap-5">
                                <div className="start-price"><span>₦</span>0</div>
                                <div className="price-dash">-</div>
                                <div className="end-price"><span>₦</span>10</div>
                            </p>
                        </div>

                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input">
                                <input type="checkbox"/>
                                </div>
                            <p className="flex-center gap-5">
                                <div className="start-price"><span>₦</span>20k</div>
                                <div className="price-dash">-</div>
                                <div className="end-price"><span>₦</span>50k</div>
                            </p>
                        </div>

                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input">
                                <input type="checkbox"/>
                                </div>
                            <p className="flex-center gap-5">
                                <div className="start-price"><span>₦</span>50k</div>
                                <div className="price-dash">-</div>
                                <div className="end-price"><span>₦</span>70k</div>
                            </p>
                        </div>
                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input"><input type="checkbox"/></div>
                            <p className="flex-center gap-5">
                                <div className="start-price"><span>₦</span>70k</div>
                                <div className="price-dash">-</div>
                                <div className="end-price"><span>₦</span>90k</div>
                            </p>
                        </div>
                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input"><input type="checkbox"/></div>
                            <p className="flex-center gap-5">
                                <div className="start-price"><span>₦</span>90k</div>
                                <div className="price-dash">-</div>
                                <div className="end-price"><span>₦</span>100k</div>
                            </p>
                        </div>
                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input"><input type="checkbox"/></div>
                            <p className="flex-center gap-5">
                               
                                <div className="price-dash">&gt;</div>
                                <div className="end-price"><span>₦</span>100k</div>
                            </p>
                        </div>

                    </div>

                    

                    <div className="filter-size">
                        <div className="filter-header">size</div>
                           {
                                size.map((item, index)=>(
                                    <div className="filter-list flex-center gap-10" key={index}>
                            <div className="filter-input">
                                <input type="checkbox"
                                 checked={selectedSize === item.id} 
                                   />
                            </div>
                            <p>{item.sizeName}</p>
                        </div>
                                ))
                             }
                        {/* <div className="size-item flex-center gap-5">

                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input"><input type="checkbox"/></div>
                            <p>S</p>
                        </div>
                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input"><input type="checkbox"/></div>
                            <p>M</p>
                        </div>
                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input"><input type="checkbox"/></div>
                            <p>L</p>
                        </div>
                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input"><input type="checkbox"/></div>
                            <p>XL</p>
                        </div>
                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input"><input type="checkbox"/></div>
                            <p>XXL</p>
                        </div>
                        <div className="filter-list flex-center gap-10">
                            <div className="filter-input"><input type="checkbox"/></div>
                            <p>XXXL</p>
                        </div>
                        </div> */}
                    </div>


                  </div>
                </div>
      <Carousel 
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        partialVisible={false}
        autoPlaySpeed={10000}
        customTransition="all .5"
        transitionDuration={500}
                 >
                   {
                    banner.map((item, index) => (
                        item.galleryType == "desktopSideBanner" ? 
                        (
                        <div className="product-ads">
                        <img src={item.image}/>
                        </div> 
                        ) : (
                            null
                        )
                    ))
                   }
               </Carousel>
            </div>
             
             <div className="flex-center product-con">
             {
                loading ? (
                    <div className="productPreloader">
                              <ButtonPreloader/>
                    </div>
                    
                ) : (

                    products.map((item, index) => (
                        
                        <div className="shopProduct"  key={index}>

                            <NavLink to={`/product-details/${item.productId}`}>
                                <div className="shopProductImage">
                                <img src={item.productImage} />
                                </div>
                            </NavLink>

                            <div className="shopProductDetails">
                                <NavLink to={`/product-details/${item.productId}`}>
                                <div className="shopProductTitle">
                                    <h2>{item.productName}</h2>
                                    <div className="shopPrice">
                                        {/* .toLocaleString() */}
                                        <span>₦</span> {item.discountPrice.toLocaleString()}
                                    </div>
                                </div>
                              </NavLink>

                            <div className="shopProductDetail">
                                  
                                <NavLink to={`/product-details/${item.productId}`}>

                                <div className="shopProductDescription">
                                   {item.productDescription}
                                </div>

                                </NavLink>

                                <div className="shopProductIconWrap">
                               {
                                signin ? (
                                    loadingProductId === item.productId ? (
                                       <ButtonPreloader/>
                                    ) : (
                                      <div className="shopProductIcon" onClick={() => AddToCart(item.productId, item.productName, item.productColor, item.discountPrice, 1, item.productImage, item.productSize)}>
                                        <FiShoppingCart />
                                        <div className="shopPlusIcon"><FaPlus /></div>
                                    </div>   
                                    )
                                    
                                ) : (
                                  <div className="shopProductIcon" onClick={authFunction}>
                                    <FiShoppingCart />
                                    <div className="shopPlusIcon"><FaPlus /></div>
                                </div>  
                                )
                               }
                                

                                </div>
                            </div>
                            </div>
                        </div>
                    ))

                )
             


                }
             </div>
        </div>
    </div>



    <div className="shop-pagination">
        {meta && <Pagination meta={meta} onPageChange={setPage} />}
    </div>

    <OfflineShop popAction={popAction} setPopAction={setPopAction}/>
    {
    !signin && (
        <AuthComponent authAction={authAction} setAuthAction={setAuthAction} setSubNav={setSubNav}/>
    )
    } 
          
    </div>
  )
}

export default Shop