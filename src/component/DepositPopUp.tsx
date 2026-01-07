import React, { useEffect, useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md';

    interface depositIntern {
        depositDisplay : boolean;
         setDepositDisplay : (data : boolean) => void;
        amount :  number;
        setAmount : (data : number) => void;
        handleDepositSet : () => void;
    }

const DepositPopUp : React.FC<depositIntern> = ({ depositDisplay, setDepositDisplay, amount, setAmount, handleDepositSet}) => {
   

    const handleDisplay = () =>{
        setDepositDisplay(false)
    }

   const handleDeposit = () => {
     setDepositDisplay(false);
     handleDepositSet()
   }

    return (
        <div>
           
    <div id="modal-overlay" className={depositDisplay ? "modal-overlay" : "show-modal"} >
                <div className="modal-content">
                <div className="modal-header">

                <h2 className="modal-title"> Deposit Money </h2>

                <button id="close-modal" className="close-button" onClick={handleDisplay}>
                <MdOutlineCancel />
                </button>
                </div>

                <div className="popBody">
                <div className="form-group">
                            <label className="fw-bold" >Amount</label>
                            <div className="input-group">
                            <input  type="number" className="form--control"   value={amount} onChange={(e)=>setAmount(parseInt(e.target.value) )}/>
                            </div>
                        </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDisplay} style={{ marginTop : "15px" }}>Close</button>

                        <button type="submit" className="btn btn--base" onClick={handleDeposit}>Confirm</button>
                    </div>

                </div>
                


                </div>
    </div>
    
    </div>
       
      )
}

export default DepositPopUp
