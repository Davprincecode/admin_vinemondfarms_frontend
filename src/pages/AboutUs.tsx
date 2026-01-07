import React, { useEffect } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import aboutUs from '../assets/images/ceomix.png'
import aboutUsMobile from '../assets/images/ceomixmobile.png'
import ourFounder from '../assets/images/founderdesignmobile.png'
import ceomixpic from '../assets/images/ceomixpic.png'
import vission from '../assets/images/eyes.png'
import mission from '../assets/images/mission.png'
import core from '../assets/images/core.png'
import aboutHeader from '../assets/images/aboutus.png'
import abtHeader from '../assets/images/foundersign.png'
import founder from '../assets/images/founder.png'
import founderDesk from '../assets/images/founderNamedesk.png'
import aboutfooter2 from '../assets/images/aboutfooter2.jpg'
import aboutfooter3 from '../assets/images/aboutfooter3.jpg'
import aboutfooter4 from '../assets/images/aboutfooter4.jpg'
import { useLocation } from 'react-router-dom'


function AboutUs() {
    const { pathname } = useLocation();
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
  return (
    <div className='aboutUs pageNav'>
       <Header />
         <div className="aboutUsCon">

             <div className="aboutusHeader">
                <div className="aboutHeaderFlex flex-center">
                    <div className="aboutFounderHeader">
                        <img src={aboutHeader} />
                    </div>
               </div>
             </div>
              
              <div className="aboutUsFlex">

                <div className="aboutUsImgCon">
                    <div className="aboutImage">
                        <img src={aboutUs} className='desktopAbout'/>
                        <img src={aboutUsMobile} className='mobileAbout'/>
                    </div>
                </div>

                <div className="aboutUsBody">
                    <div className="aboutFounderHeader aboutHeaderDesk">
                        <img src={aboutHeader} />
                    </div>
                    <p>
                        <div className="loveIntro">
                            <h4>Loveafrik</h4>
                            <p>
                               Loveafrik is not just a fashion, lifestyle and image consulting company, it’s a movement of elegance, confidence, and cultural pride.
                            </p>   
                        </div>
                        
                         <div className="loveIntro">
                            <p>
                               We believe style is more than appearance. It’s a statement of identity, influence, and impact. Rooted in African creativity yet globally attuned, we craft powerful style stories that merge authenticity with aspiration.
                            </p>  
                         </div>
                        
                        <div className="loveIntro">
                            <p>Our expertise spans:</p>
                            <ul className='dataList'>
                                <li> <span> • Colour & Style Consultation</span> – bringing out your signature look.</li>
                                <li><span>• Personal Styling (Men & Women)</span> – tailored to lifestyle, profession, and vision.</li>
                                <li><span>• Fashion Styling</span> – for photoshoots, magazines, film, and TV.</li>
                                <li><span>• Costume Design</span> – for film and media.</li>
                                <li><span>• Wardrobe Management</span> – curation for everyday excellence.</li>
                                <li><span>• Image & Perception Consulting</span> – aligning how you are seen with who you are.</li>
                            </ul>
                         </div>

                        <div className="abt">
                            <p>
                              Through trainings, workshops, and executive consultations, we also empower professionals, leaders, and aspiring stylists to project influence and presence through style.
                            </p>  
                         </div> 
                     
                    </p>
                </div>

              </div>

              <div className="aboutvmc flex gap-20">

                <div className="visionCon">
                    <div className="circle"></div>
                    <div className="innerCircle">
                        <div className="visionHeader"><img src={vission} /></div>
                    </div>
                     
                     <h2>our vision</h2>
                     <p>
                        To build a globally recognized African brand at the forefront of image consulting and affordable luxury, reshaping how the world sees style, confidence, and cultural elegance.
                     </p>
                </div>

                <div className="visionCon">
                    <div className="circle"></div>
                    <div className="innerCircle">
                       <div className="visionHeader"><img src={mission} /></div> 
                    </div>
                     
                     <h2>our mission</h2>
                     <p>
                        To redefine luxury fashion and personal image one client at a time through value-driven creativity, tailored styling, and innovative apparel that merge quality, individuality, and accessibility.
                     </p>
                </div>

                <div className="visionCon coreCon special">
                    <div className="circle"></div>
                    <div className="innerCircle">
                        <div className="visionHeader"><img src={core} /></div>
                    </div>
                     
                     <h2>our core value</h2>
                     <p className='core'>
                      <span>Excellence  –</span> 
                       in every detail.
                     </p>
                     <p className='core'>
                     <span>Innovation –</span> 
                      driven by creativity and strategy.
                     </p>
                     <p className='core'>
                      <span>Value –</span>  
                      meaningful, lasting impact.
                     </p>
                     <p className='core'>
                     <span>Team work –</span>  
                       collaboration that inspires.
                     </p>
                </div>
{/* ► */}
              </div>

              <div className="about-promise">
                
                <h2>THE LOVEAFRIK PROMISE</h2>

                <div>
                <p>
                    With Temitope’s visionary leadership and global expertise, Loveafrik is more than a style house, it’s a partner in helping you step into every room with power, elegance, and authenticity.
                </p>
                </div>

                <div>
                <p>
                    Because when you look like your best self, you lead, inspire, and influence like your best self.
                </p>
                </div>

              </div>

             <div className="aboutFounder">
               
               <div className="aboutHeaderFlex flex-center justification-center ceo-founder-header">
                    <div className="aboutFounderHeader">
                        <img src={abtHeader}  className='ourfounderdesktop'/>
                        <img src={ourFounder}  className='ourfoundermobile'/>
                    </div>
               </div>
                

            <div className="founderFlex">

                <div className="founderImageCon">
                    <div className="founderImage">
                        <img src={founder} />
                        <div className="founderDetails">
                            <img src={founderDesk} className="founderDesk" />
                            {/* <img src={founderMobile} className="founderMobile" /> */}
                        </div>
                    </div>
                </div>

                
                <div className="founderDescription">
                  
                       
                       <div>
                       At the heart of Loveafrik is Temitope Adesola Owoeye, one of Nigeria’s few globally certified image consultants and a visionary in the world of fashion, style, and transformation.
                       </div>

                       <div>
                        More than a stylist, Temi is a storyteller, transformation guide, and architect of presence. For nearly a decade, she has helped leaders, creatives, and global brands unlock the power of authentic image, showing up with confidence, credibility, and cultural elegance.
                       </div>

                       <div>
                        Her work transcends “just clothes.” With a rare blend of creative brilliance and strategic insight, Temi shapes identities, redefines perceptions, and turns style into a tool for influence, leadership, and impact.
                       </div>

                       <div>
                        Temi has worked with multinational giants including Diageo, Pernod Ricard, Nestlé, Unilever, MTN, Coca-Cola, and a host of respected Nigerian brands.
                       </div>
                         <div>
                            Her portfolio includes styling and consulting for visionaries and change-makers:
                            <ul className='dataList'>
                                <li>• Fela Durotoye (Presidential candidate, leadership coach)</li>
                                <li>• Tara Fela-Durotoye (Founder, House of Tara)</li>
                                <li>• Tobi Bakre (Big Brother Naija star)</li>
                                <li>• Evelyn Akhator (International basketball athlete)</li>
                                <li>• Nnamdi Ezeigbo (Tech entrepreneur, Slot Ltd)</li>
                            </ul>
                         </div>
                       <div>
                           Her creative direction has graced television commercials, editorial campaigns, and international showcases, ensuring that every visual tells a bold, compelling story.
                       </div>                       
                </div>
            </div>
             </div>



            <div className="aboutUsFounderFlex">

            <div className="aboutUsFooterImg">
                <div className="aboutFooterImage">
                    <img src={ceomixpic} />
                </div>
                <div className="aboutFooterImage">
                    <img src={aboutfooter2} />
                </div>
                <div className="aboutFooterImage">
                    <img src={aboutfooter3} />
                </div>
                <div className="aboutFooterImage">
                    <img src={aboutfooter4} />
                </div>
            </div>

        




            </div>


         </div>
       <Footer/>
    </div>
  )
}

export default AboutUs