import  { useState } from 'react';
import {toast } from 'react-toastify';

        interface modalPopUp {
        isOpen : Boolean;
        updateData : Boolean;
        handleModal : (state : any) => void;
        handleProduct : (state : any) => void;
        handleEditProduct : (state : any) => void;
        productName : string;
        setProductName: (name: string) => void;
        productQuantity : number;
        setProductQuantity : (name: number) => void;
        productPrice: number;
        setProductPrice :  (name: number) => void;
        products : productCreated[];
        handleSelectChange : (event: React.ChangeEvent<HTMLSelectElement>) => void;
        productId : string;
        setProductId : (name : string) => void;
        setLoading : (name : boolean) => void;
        loading : boolean;
        newProduct : boolean;
        setNewProduct : (name : boolean) => void;
        }

        interface productCreated {
        productId :  string;
        productName :  string;
        }

 const Modal : React.FC<modalPopUp> = ({isOpen, updateData, handleModal, handleProduct,handleEditProduct, productName,setProductName, productQuantity, setProductQuantity, productPrice, setProductPrice, products, handleSelectChange, productId, setProductId, setLoading, loading, newProduct, setNewProduct}) => {

         const newProductF = () => {
            setProductName('');
            setProductId('');
            setNewProduct(!newProduct)
         }

    return (
        <>
            <div>
            <div className="modal-backdrop" onClick={handleModal} style={{ top : isOpen ? "0%" : "-100%"}}>
            </div>
            <div className="modal-content" style={{ bottom : isOpen ? "400px" : "-100%"}}>
            <div className="header">
                <h4>add product</h4>
            </div>

            <div className="modalBody">

           
                <form >

                {
                    updateData ? (  
                        <>
                        <label> Product Name</label>
                        <input type="text" value={productName} readOnly/>
                        </>
                    ) : (
                    <div>
                    <label> Product Name</label>
                    {newProduct  ? (
                    <input type="text" placeholder='Enter Product Name' value={productName} onChange={(e) => setProductName(e.target.value)}/>
                    ) : (
                    <select value={productId} onChange={handleSelectChange}>
                    <option value="">Enter Product Name</option>
                    {
                        products.map((product, index) => (
                            <option value={product.productId} key={index}>{product.productName}</option>
                        ))
                    } 
                    </select>
                    )}

                <div className="newProductFlex">
                    <div className="newProduct" onClick={newProductF}>
                        new product
                    </div>
                </div>
                    

                </div>
                    )}

                <div>
                    <label >Product Quantity</label>
                    <input type="number" step="0.001" placeholder='Enter Product Quantity' value={productQuantity} onChange={(e) => setProductQuantity(parseFloat(e.target.value))}/>
                </div>

                <div>
                    <label >Product Price</label>
                    <input type="number" placeholder='Enter Product Price' value={productPrice} onChange={(e) => setProductPrice(parseInt(e.target.value))}/>
                </div>


                {
                    updateData ? (
                            <div className="btn">
                            {
                                    productName && productQuantity && productPrice ? (
                                        <button type="button" onClick={
                                           () =>  handleEditProduct(productId)
                                        } disabled={loading}>
                                        {loading ? 'edit...' : 'edit product'}
                                        </button>
                                    ) : (
                                        <button type="button" disabled={true}>
                                        {loading ? 'edit...' : 'edit product'}
                                        </button>
                                    )
                                }
                            </div>
                    ) : (
                            <div className="btn">
                            {
                            productName && productQuantity && productPrice ? (
                                <button type="button" onClick={
                                    handleProduct
                                } disabled={loading}>
                                {loading ? 'Adding...' : 'add product'}
                                </button>
                            ) : (
                                <button type="button" disabled={true}>
                                {loading ? 'Adding...' : 'add product'}
                                </button>
                            )
                            }
                            </div>
                    )
                }
                

                </form>
             
        

            </div>


            </div>

        </div>
        
        </>
    );
};

export default Modal;