import  { useState } from 'react';
import {toast } from 'react-toastify';

        interface modalPopUp {
        isOpen : Boolean;
        handleModal : (state : any) => void;
        handleProduct : (state : any) => void;
        productName : string;
        setProductName: (name: string) => void;
        productQuantity : number;
        setProductQuantity : (name: number) => void;
        productPrice: number;
        setProductPrice :  (name: number) => void;
        sellingPrice: number;
        setSellingPrice :  (name: number) => void;
        products : productCreated[];
        selectedProduct : productCreated[];
        handleSelectChange : (event: React.ChangeEvent<HTMLSelectElement>) => void;
        productId : string;
        setProductId : (name : string) => void;
        setLoading : (name : boolean) => void;
        loading : boolean;
        } 
        interface productCreated {
            productId: string
            productName: string
            purchasePrice: number
            purchaseTotalAmount : number
            quantity: number
            userId: string;
        }


 const ModalWarehouse : React.FC<modalPopUp> = ({isOpen, handleModal, handleProduct, productName,setProductName, productQuantity, setProductQuantity, productPrice, setProductPrice, sellingPrice, setSellingPrice, products, selectedProduct, handleSelectChange, productId, setProductId, setLoading, loading}) => {

        const handleSellingPrice = (sellingp : number, purchasePrice : number) => {
            setProductPrice(purchasePrice);
            setSellingPrice(sellingp);
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

        <div>
            <label >Select Product</label>      
            <select value={productId} onChange={handleSelectChange}>
            <option value="">Select Product</option>
            {
                products.map((product, index) => (
                    <option value={product.productId} key={index}>{product.productName}</option>
                ))
            } 
            </select>
            

        {/* <div className="newProductFlex">
            <div className="newProduct" onClick={newProductF}>
                new product
            </div>
        </div> */}
            

        </div>

        <div>
            {
                selectedProduct?.length > 0 && (
                    <>
                    <p><span>available qty</span> {selectedProduct[0].quantity}</p>
                    <p><span>purchase price</span> {selectedProduct[0].purchasePrice}</p>

                    </>
                )
            }
        </div>

        <div>
            <label >Quantity</label>
            <input type="number" placeholder='Enter Product Quantity' value={productQuantity} onChange={(e) => setProductQuantity(parseInt(e.target.value))}/>
        </div>

        <div>
            <label >Selling Price</label>
            <input type="number" placeholder='Enter Product Price' value={sellingPrice} onChange={(e) => handleSellingPrice(parseInt(e.target.value), selectedProduct?.length > 0 ? selectedProduct[0].quantity : 0)}/>
        </div>

        
        
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

        </form>
            </div>


            </div>

        </div>
        
        </>
    );
};

export default ModalWarehouse;