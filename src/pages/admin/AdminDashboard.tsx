import React, { useEffect, useState } from 'react'
import AdminTopHeader from '../../component/AdminTopHeader'
import SideNavAdmin from '../../component/SideNavAdmin'
import prdImg from '../../assets/images/popular1.png'
import prdImg1 from '../../assets/images/popular2.png'
import { NavLink } from 'react-router-dom'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoMdArrowRoundUp } from 'react-icons/io'
import { userAuth } from '../context/AuthContext'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Bookings',
      data: [0, 0, 0, 0, 0],
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
      tension: 0.4,
    },
  ],
};

interface orderIntern {
  customerName : string
  orderDate : string
  orderId : string
  orderStatus : string
  paymentMethod : string
  total : string
} 
interface transactionIntern {
  customerName : string
  orderDate : string
  orderId : string
  orderStatus : string
  total : number
  transactionType : string
}
interface productIntern{
  productName : string;
  productImage : string;
  productPrice : string;
}
interface categoryIntern{
  name : string
}
const AdminDashboard = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [product, setProduct] = useState<productIntern[]>([]);
   const [gallery, setGallery] = useState<string>('');
   const [hero, setHero] = useState<string>('');

  
   const {baseUrl, token} = userAuth();

    useEffect(() => {
     getData()
    }, []);

  
    const getData = async () => {
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
          
          const response = await fetch(`${baseUrl}/get-overview`, requestOptions);
          if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
          }
          const result = await response.json(); 
          setGallery(result.data.gallery);
          setHero(result.data.hero);
          setProduct(result.data.product);
          setLoading(false);
        } catch (error) {
        setLoading(false);
        }
    }

   

  return (
    <div className='admin-dashboard'>
        <AdminTopHeader />

         <div className="flex mainWrapper">
           <SideNavAdmin/> 

           <div className="mainBody">

                <div className="adminTitle">
                  <h2>Dashboard</h2>
                </div>

                <div className="flex  mainBodyContainer">

                   <div className="mainOverview">

                          <div className="overview">

                            <div className="popularBookingHeader">
                              <div className="popularBookTitle">Overview</div>
                              
                            </div>

                            <div className="overviewBody flex justification-between">

                            

                              <div className="overviewMain2">
                                       
                                    <div className="customerTop">
                                      <h1>Hero Slidder</h1>
                                      <div className="customer">
                                        <div className="customerHeader">
                                          <p>Number</p>
                                          <p className='customerNumber'>{hero}</p>
                                        </div>
                                        
                                      </div>
                                      
                                    </div>

                                    <div className="income-con">
                                      <h1>Gallery</h1>
                                        <div className="income">
                                          <div className="customerHeader">
                                            <p>Number</p>
                                          <p className='customerNumber'>{gallery}</p>
                                          </div>
                                          
                                        </div>

                                       
                                    </div>
                                   


                              </div>

                            </div>
                          </div>

                          
                   </div>


                   <div className="mainProduct">

                     <div className="popularProduct">
                        <div className="popularTitle">latest products(5)</div>

                        <div className="popularForm">
                          <div className="popularHeader flex-center gap-10 justification-between">
                            <p>product</p>
                            <p>price</p>
                          </div>

                          {
                            product.map((item, index) => (
                         <div className="popularItem flex-center gap-10 justification-between" key={index}>
                            <div className="popularCon flex ">
                              <div className="popularImage">
                                <img src={item.productImage} alt="" />
                              </div>
                              <div className="popularName">
                                <p className="pName">{item.productName}</p>
                              </div>
                            </div>
                            <div className="popularPrice">₦{item.productPrice}</div>
                          </div>
                            ))
                          }
                         


                        </div>
                        
                        <div className="flex-product-link">
                          <NavLink to="/admin/admin-shop" className="view">all products</NavLink>
                        </div>
                        
                     </div>

                    
                   </div>

                </div>


           </div>
         </div>
        

    </div>
  )
}

export default AdminDashboard