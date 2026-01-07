import { useEffect, useState } from 'react'

interface authComponentInterface {
    authAction : boolean,
    setAuthAction: React.Dispatch<React.SetStateAction<boolean>>;
    amount :  number, 
    setAmount : React.Dispatch<React.SetStateAction<number>>;
    applyToAll : (data : number) => void;
}

const DeliveryFeePop : React.FC<authComponentInterface> = ({authAction, setAuthAction, amount, setAmount, applyToAll}) =>{

  

  return (
    <div className="track-con" style={{display : authAction ? "flex" : "none"}}>

      <div className="category-body">
     
             <div className="category-header-title">
                amount
             </div>
            <div className="category-pop-con">
            <div className="input">
            <input type="number" placeholder='Enter Amount' value={amount} onChange={(e) => setAmount(parseInt(e.target.value)) }/>
            </div>

            <div className="btn-flex-con">
            <div className="cancelBtn"  onClick={() => setAuthAction(!authAction)}>
                cancel
            </div>

            
                    <div className="enterBtn" onClick={() => applyToAll(amount)}>
                        save
                    </div>
                  
            </div>


            </div>

      </div>
    </div>
  )
}

export default DeliveryFeePop


