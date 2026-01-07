import React from 'react'
import Header from '../component/Header'
import { FaArrowLeftLong, FaRegCalendarDays } from 'react-icons/fa6'
import { TiWorld } from 'react-icons/ti'
import { FaCalendarAlt } from 'react-icons/fa'
import { CiClock1 } from 'react-icons/ci'
import { IoIosArrowBack } from 'react-icons/io'

function ConsultantDetails() {
  return (
    <div className='consultant-con-wrapper pageNav'>
      <Header/>


        <div className="consultant-con">
          
            <div className="consultant">
              <div className="mobile-back"><IoIosArrowBack /> <p>back</p></div>
                <div className="consultant-detail">
                    <div className="consultant-icon"><FaCalendarAlt /></div>
                    <p className='schedule-name'>schedule a</p>
                    <h2 className='consultant-name'>consultation</h2>
                    <div className="clock flex-center"><CiClock1 /> <h2>30 min</h2></div>
                    <div className="consultant-bod">Lorem ipsum dolor sit amet,
                         consectetur adipisicing elit. 
                        Distinctio maxime consequuntur
                         culpa possimus inventore itaque incidunt doloremque aliquid sequi id!
                         </div>
                </div>

                <div className="consultant-form">
                  <div className="consultant-back"><FaArrowLeftLong /> <p>back</p></div>
                    <div className="consultant-header">confirm your booking</div>
                    <div className="consultant-details">
                        <div className="flex-center consultant-date gap-10">
                            <FaRegCalendarDays />
                            <p>wednessday, august 11 2025</p>
                        </div>
                        <div className="time">10:00pm</div>
                        <div className="flex-center consultant-time gap-10">
                            <TiWorld />
                            <p>time zone europe</p>
                        </div>
                    </div>

                    <div className="form-cons">
                        <div className="admin-input">
                    <label >name </label>
                    <input type="text" name="" placeholder='full name' />
                      </div>
                        <div className="admin-input">
                    <label >email</label>
                    <input type="text" name="" placeholder='email' />
                      </div>
                        <div className="admin-input">
                    <label >phone no</label>
                    <input type="text" name="" placeholder='phone no' />
                      </div>
                    <div className="admin-input">
                    <label >note <span>(optional)</span></label>
                     <textarea name="" id="" cols={30} rows={10}></textarea>
                      </div>
                    </div>

                    <div className="admin-input">
                        
                        <button >confirm</button>
                    </div>

                </div>

            </div>
        </div>
    </div>
  )
}

export default ConsultantDetails