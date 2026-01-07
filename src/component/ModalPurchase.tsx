import  { useState } from 'react';
import {toast } from 'react-toastify';

        interface modalPopUp {
        isOpen : Boolean;
        modalType : string;
        handleModal : (state : any) => void;
        handleProduct : (state : any) => void;
        handleExpenses : (state : any) => void;
        productName : string;
        setProductName: (name: string) => void;
        productQuantity : number;
        setProductQuantity : (name: number) => void;
        productPrice: number;
        setProductPrice :  (name: number) => void;
        productId : string;
        setProductId : (name : string) => void;

        expId : string;
        setExpId : (name : string) => void;
        expensesName : string;
        setExpensesName : (name : string) => void;
        expAmount : number;
        setExpAmount:  (name: number) => void;

        setLoading : (name : boolean) => void;
        loading : boolean;
        }


 const ModalPurchase : React.FC<modalPopUp> = ({isOpen, modalType, handleModal, handleProduct, handleExpenses, productName, setProductName, productQuantity, setProductQuantity, productPrice, setProductPrice, productId, setProductId, expId, setExpId, expensesName, setExpensesName, expAmount, setExpAmount,
    setLoading, loading}) => {

    return (
        <>
            <div>
            <div className="modal-backdrop" onClick={handleModal} style={{ top : isOpen ? "0%" : "-100%"}}>
            </div>
            <div className="modal-content" style={{ bottom : isOpen ? "400px" : "-100%"}}>
            <div className="header">
                <h4>edit product</h4>
            </div>

            <div className="modalBody">

                { modalType == "product" ? (
                <form >
                <div>
                    <label> Product Name</label>
                    <input type="text" placeholder='Enter Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} readOnly/>        
                </div>
                   
                <div>
                    <label >Product Quantity</label>
                    <input type="number" step="0.001" placeholder='Enter Product Quantity' value={productQuantity} onChange={(e) => setProductQuantity(parseFloat(e.target.value))}/>
                </div>

                <div>
                    <label >Product Price</label>
                    <input type="number" placeholder='Enter Product Price' value={productPrice} onChange={(e) => setProductPrice(parseInt(e.target.value))}/>
                </div>

            <div className="btn">
                {
                productName && productQuantity && productPrice ? (
                <button type="button" onClick={
                    handleProduct
                } disabled={loading}>
                {loading ? 'Editting...' : 'edit product'}
                </button>
                ) : (
                <button type="button" disabled={true}>
                {loading ? 'Editting...' : 'edit product'}
                </button>
                )
                }
            </div>
        </form>
                    ) : (
                    <form >
                        <div>
                            <label> Expenses Name</label>
                            <input type="text" placeholder='Enter Name' value={expensesName} onChange={(e) => setExpensesName(e.target.value)}/>        
                        </div>
                           
                        <div>
                            <label >Expenses Amount</label>
                            <input type="number"  placeholder='Enter amount' value={expAmount} onChange={(e) => setExpAmount(parseFloat(e.target.value))}/>
                        </div>
        
                    <div className="btn">
                        {
                        expensesName && expAmount ? (
                        <button type="button" onClick={
                            handleExpenses
                        } disabled={loading}>
                        {loading ? 'editting...' : 'edit expenses'}
                        </button>
                        ) : (
                        <button type="button" disabled={true}>
                        {loading ? 'editting...' : 'edit expenses'}
                        </button>
                        )
                        }
                    </div>
                </form>  
                    )
                }

                
             
            </div>


            </div>

        </div>
        
        </>
    );
};

export default ModalPurchase;