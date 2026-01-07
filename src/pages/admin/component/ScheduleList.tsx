import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import invImg from '../../../assets/images/inventoryImg.png'
import { CiSearch } from 'react-icons/ci';
import { RiDeleteBinLine, RiFolderDownloadLine } from 'react-icons/ri';
import { MdDelete, MdOutlineArrowDropDownCircle, MdOutlineDelete } from 'react-icons/md';
import { userAuth } from '../../context/AuthContext';
import { tr } from 'framer-motion/client';
import ButtonPreloader from '../../../component/ButtonPreloader';
import AdminPagination from './AdminPagination';
import { AiOutlineEye } from 'react-icons/ai';
import OrderDetails from '../../../component/OrderDetails';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
import { FaRegEye } from 'react-icons/fa';


interface scheduleIntern {
  booking : BookingInterface[];
  meta : Meta | null;
  loading : boolean;
  setPage : Dispatch<SetStateAction<number>>;
  viewOrder : (id : string) => void;
  handleDeleteClick : (id : string) => void;
}

interface BookingInterface {
        bookingDate : string;
        bookingDateFormat : string;
        bookingEndTime : string;
        bookingId : string;
        bookingStartTime : string;
        customerId : string;
        customerName : string;
        customerEmail : string;
        customerPhoneNumber : string;
        customerOrderNote : string;
        id : string;
        orderDate : string;
        orderStatus : string;
        paymentMethod : string;
        timeLeft : string;
        total : number
}
interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

const ScheduleList = ({booking, meta, loading, setPage, handleDeleteClick, viewOrder} : scheduleIntern) => {

      const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      });
      };
  return (
    <div>
        <div className="admin-shop-container">
                    {
                    loading && (
                        <div className="cart-prealoader">
                            <ButtonPreloader/>
                        </div>

                    ) 
                    }
                    <table>
                        <tr>
                        <th>s/n</th>
                        <th>name</th>
                        <th>date</th>
                        <th>time</th>
                        <th>time left</th>
                        <th>note</th>
                        {/* <th>order status</th> */}
                        <th></th>
                        
                        </tr>

                            {booking.map((item, index) => (
                            <React.Fragment key={item.id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.customerName}</td>
                                <td>{formatDate(item.bookingDate)}</td>
                                <td>{item.bookingStartTime} - {item.bookingEndTime}</td>
                                <td>
                                    <div className="time-left" style={{color : item.timeLeft !== "past" ? "green" : "black"}}>
                                        {item.timeLeft}
                                    </div>
                                </td>
                                <td>
                                    {item.customerOrderNote && item.customerOrderNote.length > 15
                                    ? item.customerOrderNote.slice(0, 15) + '...'
                                    : item.customerOrderNote}

                                </td>
                                <td>
                                    <div className="action-flex flex-center gap-20">
                                        <FaRegEye className='eyes' onClick={() => viewOrder(item.id)}/>
                                        <RxCross2 className='delete' onClick={() => handleDeleteClick(item.id)} />
                                    </div>
                                </td>

                            </tr>

                            </React.Fragment>
                            ))}

                       


                    </table>
            </div>

            <div className="adminPagination">
               {meta && <AdminPagination meta={meta} onPageChange={setPage} />}
            </div>

           

    </div>
  )
}

export default ScheduleList