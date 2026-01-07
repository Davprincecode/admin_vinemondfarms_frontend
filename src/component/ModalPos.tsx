import React, { useState } from 'react'
import successSvg from '../assets/images/icons8-success.gif'
import { FcPrint } from "react-icons/fc";
import { ImCancelCircle } from "react-icons/im";

interface modalPopUp {
    isOpen : Boolean;
    handleModal : (state : any) => void;
    printReceipt : (state : any) => void;
}

const ModalPos : React.FC<modalPopUp> =  ({isOpen, handleModal, printReceipt}) => {
    return (
        <> 
        {/* onClick={handleModal} */}
            <div>
            <div className="modal-backdrop" style={{ top : isOpen ? "0%" : "-100%"}}>
            </div>

            <div className="modal-content modal-pos" style={{ bottom : isOpen ? "400px" : "-100%"}}>
            
            {/* <div className="header">
                <h4>add product</h4>
            </div> */}

           <div className="divImgFlex">
            <div className="divImg">
                <img src={successSvg} alt="" />
            </div>
            </div>



            <div className="modalBody">
             {/* <h1>hello world</h1> */}
             <p>Product purchase successfully!</p>

             <div className="modalBodyBtnFlex">

                <div className="modalBodyBtn" onClick={handleModal} style={{color : "red"}}>
                    <p><ImCancelCircle /></p>
                    <p>Cancel</p>
                </div>
                
                <div className="modalBodyBtn" onClick={printReceipt} style={{color : "#32b136"}}>
                    <p><FcPrint /></p>
                    <p>Print reciept</p>
                </div>

             </div>
            </div>


            </div>

        </div>
        
        </>
    );
}

export default ModalPos