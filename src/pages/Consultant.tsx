import React from 'react'
import Header from '../component/Header'
import { FaRegCalendarDays } from 'react-icons/fa6'
import { TiWorld } from 'react-icons/ti'
import { FaCalendarAlt } from 'react-icons/fa'
import { CiClock1 } from 'react-icons/ci'
import BookingCalendars from './BookingCalendars'
import Footer from '../component/Footer'
import { NavLink } from 'react-router-dom'

function Consultant() {
  return (
    <div className='consultant-con-wrapper pageNav'>
      <Header/>
      <div className="consultant-con">

          <div className="consultant">

              <div className="consultant-detail">
                  <div className="consultant-icon"><FaCalendarAlt /></div>

                  <p className='schedule-name'>Schedule a</p>

                  <h2 className='consultant-name'>Consultation</h2>

                  <div className="clock flex-center"><CiClock1 /> <h2>30 min</h2></div>
                  
                  <div className="consultant-bod">Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. 
                      Distinctio maxime consequuntur
                        culpa possimus inventore itaque incidunt doloremque aliquid sequi id!
                        </div>
              </div>

                <div className="consultant-calendar">
                  <BookingCalendars/>
                  <div className="nextBtn">
                    <NavLink to="#">
                      next
                    </NavLink>
                  </div>
                </div>


            </div>
      </div>
      <Footer />
    </div>
  )
}

export default Consultant