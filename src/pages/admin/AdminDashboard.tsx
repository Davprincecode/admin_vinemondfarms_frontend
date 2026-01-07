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
  category : categoryIntern;
  productPrice : string;
}
interface categoryIntern{
  name : string
}
const AdminDashboard = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [todayBooking, setTodayBooking]= useState<number>(0);
   const [monthlyBooking, setMonthlyBooking]= useState<number>(0);
   const [order, setOrder] = useState<orderIntern[]>([]);
   const [product, setProduct] = useState<productIntern[]>([]);
   const [transactions, setTransactions] = useState<transactionIntern[]>([]);
   const [range, setRange] = useState<string>('all');
   const [total, setTotal] = useState<number>(0);
   const [percentageChange, setPercentageChange] = useState<number>(0);
   const [customerBooking, setCustomerBooking]= useState<number>(0);
   const [customerBookingPercentage, setCustomerBookingPercentage]= useState<number>(0);
   const [customerShop, setCustomerShop]= useState<number>(0);
   const [customerShopPercentage, setCustomerShopPercentage]= useState<number>(0);

    const [chartData, setChartData] = useState<any>(null);
    const [bookingPercentage, setBookingPercentage]= useState<number>(0);
    const [bookingTotal, setBookingTotal]= useState<number>(0);
    const [shopPercentage, setShopPercentage]= useState<number>(0);
    const [shopTotal, setShopTotal]= useState<number>(0);

   const {baseUrl, token} = userAuth();

    useEffect(() => {
     getData()
    }, []);

    useEffect(() =>{
          getStatData()
    }, [range])

    const getData = async () => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
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
          setTodayBooking(result.data.todayBooking);
          setMonthlyBooking(result.data.monthlyBooking);
          setTransactions(result.data.transactions);
          setOrder(result.data.order);
          setProduct(result.data.product);
          setLoading(false);

        } catch (error) {
        setLoading(false);
        }
    }

    const getStatData = async () => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };
        try {
          
          const response = await fetch(`${baseUrl}/get-status/${range}`, requestOptions);
          if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
          }
          const result = await response.json();
          setChartData(result.monthlyCounts);
          setTotal(result.total);
          setPercentageChange(result.percentageChange);
          setCustomerBooking(result.customer.customerBooking);
          setCustomerBookingPercentage(result.customer.customerBookingPercentage);
          setCustomerShop(result.customer.customerShop);
          setCustomerShopPercentage(result.customer.customerShopPercentage);
          setBookingPercentage(result.income.bookingPercentage);
          setBookingTotal(result.income.bookingTotal);
          setShopPercentage(result.income.shopPercentage);
          setShopTotal(result.income.shopTotal);
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
                              <div className="popularSelect">
                                <select value={range} onChange={(e) => setRange(e.target.value)}>
                                  <option value="all">all time</option>
                                  <option value="today">today</option>
                                  <option value="week">this week</option>
                                  <option value="month">this month</option>
                                  <option value="year">this year</option>
                                </select>
                              </div>
                            </div>

                            <div className="overviewBody flex justification-between">

                              <div className="overviewMain1">
                                 <div className="overviewHeader flex-center justification-between">
                                    <p>today order</p>
                                    <p><BsThreeDotsVertical /></p>
                                 </div>

                                 <div className="overviewPrice flex-center justification-between">
                                          <div className="overviewPriceHeader">
                                            <div className="popularBookTitle">
                                              
                                              {Number(total).toLocaleString()}
                                              
                                              </div>
                                            <p>orders over time</p>
                                          </div>
                                          <div className="overviewLast flex-center">

                                            <div className="overArrow" style={{ color : percentageChange < 0 ? "red" : "rgba(11, 125, 22, 1)"}}>
                                              <IoMdArrowRoundUp />
                                            </div>
                                            <div className="overPercentage" style={{ color : percentageChange < 0 ? "red" : "rgba(11, 125, 22, 1)"}}>
                                              {percentageChange}%
                                            </div>

                                            <div className="overVs">vs</div>
                                            <div className="overToday">last day</div>

                                          </div>
                                 </div>

                              {
                                 chartData ? (
                                    <Line data={chartData} />
                                 ) : (
                                    <Line data={data} />
                                 )
                              }  
                              </div>

                              <div className="overviewMain2">
                                       
                                    <div className="customerTop">
                                      <h1>CUSTOMERS</h1>
                                      <div className="customer">
                                        <div className="customerHeader">
                                          <p>shop</p>
                                          <p className='customerNumber'>{customerShop}</p>
                                        </div>
                                        <div className="percentage perCircle" style={{ color : customerShopPercentage < 0 ? "red" : "rgba(11, 125, 22, 1)"}}>
                                          {customerShopPercentage}%
                                        </div>
                                      </div>
                                      <div className="customer">
                                        
                                        <div className="customerHeader">
                                          <p>consultation</p>
                                          <p className='customerNumber'>{customerBooking}</p>
                                        </div>
                                        <div className="percentage perCircle" style={{ color : customerBookingPercentage < 0 ? "red" : "rgba(11, 125, 22, 1)"}}>
                                          {customerBookingPercentage}%
                                        </div>
                                      </div>
                                    </div>

                                    <div className="income-con">
                                      <h1>INCOME</h1>
                                        <div className="income">
                                          <div className="customerHeader">
                                            <p>shop</p>
                                          <p className='customerNumber'>{Number(shopTotal).toLocaleString()}</p>
                                          </div>
                                          <div className="percentage"  style={{ color : shopPercentage < 0 ? "red" : "rgba(11, 125, 22, 1)"}}>
                                             {shopPercentage}%
                                          </div>
                                        </div>

                                        <div className="income">
                                          <div className="customerHeader">
                                            <p>consultation</p>
                                          <p className='customerNumber'>{Number(bookingTotal).toLocaleString()}</p>
                                          </div>
                                          <div className="percentage"  style={{ color : bookingPercentage < 0 ? "red" : "rgba(11, 125, 22, 1)"}}>
                                             {bookingPercentage}%
                                          </div>
                                        </div>
                                    </div>
                                   


                              </div>
                            </div>
                          </div>

                          
                          <div className="mainRecentTransaction recentTransaction">
                              <div className="mainRecentHeader">
                                <div className="mainTitle">recent orders</div>
                                <NavLink to="/admin/admin-shop/orders">view all</NavLink>
                              </div>
                              <div className="mainRecent">
                                <table>
                                           <thead> <tr>
                                                <th>id</th>
                                                <th>customer</th>
                                                <th>status</th>
                                                <th>total</th>
                                            </tr></thead>
                                            {
                                              order.map((item, index)=>(
                                                  <tr key={index}>
                                                      <td>{item.orderId}</td>
                                                      <td>{item.customerName}</td>
                                                      <td><div className={item.orderStatus}>{item.orderStatus}</div></td>
                                                      <td>₦{item.total}</td>
                                                  </tr>
                                              ))
                                            }
                                 </table>
                              </div>
                          </div>


                          <div className="mainRecentTransaction">
                              <div className="mainRecentHeader">
                                <div className="mainTitle">recent transactions</div>
                                <NavLink to="/admin/admin-shop/transactions">view all</NavLink>
                              </div>
                              <div className="mainRecent">
                                <table>
                                  <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>customer</th>
                                                <th>type</th>
                                                <th>status</th>
                                                <th>total</th>
                                            </tr>

                                            </thead>

                                           {
                                              transactions.map((item, index)=>(
                                                 <tr key={index}>
                                                    <td>{item.orderId}</td>
                                                    <td>{item.customerName}</td>
                                                    <td>{item.transactionType}</td>
                                                    <td><div className={item.orderStatus}>{item.orderStatus}</div></td>
                                                    <td>₦{item.total}</td>
                                                 </tr>
                                              ))
                                           } 
                                 </table>
                              </div>
                          </div>

                   </div>


                   <div className="mainProduct">

                     <div className="popularProduct">
                        <div className="popularTitle">popular products</div>

                        <div className="popularForm">
                          <div className="popularHeader flex-center gap-10 justification-between">
                            <p>product</p>
                            <p>earnings</p>
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
                                <p>{item.category.name}</p>
                              </div>
                            </div>
                            <div className="popularPrice">₦{item.productPrice}</div>
                          </div>
                            ))
                          }
                         


                        </div>
                        
                        <div className="flex-product-link">
                          <NavLink to="/admin/admin-shop/all product" className="view">all products</NavLink>
                        </div>
                        
                     </div>

                     <div className="popularBooking">
                        <div className="popularBookingHeader">
                          <div className="popularBookTitle">bookings</div>
                          {/* <div className="popularSelect">
                            <select><option >recent</option></select>
                          </div> */}
                        </div>
                        <div className="popularDate">
                          <div className="popularTodayCon">
                            <div className="popularToday">today</div>
                            <div className="popularDay">{todayBooking}</div>
                          </div>
                          <div className="popularTodayCon">
                            <div className="popularToday">this month</div>
                            <div className="popularDay">{monthlyBooking}</div>
                          </div>
                        </div>

                        <NavLink to="/admin/admin-consult" className="view">view all</NavLink>
                     </div>

                   </div>

                </div>


           </div>
         </div>
        

    </div>
  )
}

export default AdminDashboard