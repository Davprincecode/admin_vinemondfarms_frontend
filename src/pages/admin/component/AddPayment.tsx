import React, { useEffect, useState } from "react";
import { IoEyeOutline, IoSettingsOutline } from "react-icons/io5";
import { userAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../component/ButtonPreloader";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeletePopup from "./DeletePopUp";


interface PaymentApiInterface {
  id: number;
  secretKey: string;
  apiKey: string;
  status: string;
}

const AddPayment = () =>  {
  const { baseUrl, token } = userAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [payment, setPayment] = useState<PaymentApiInterface[]>([]);
  const [secretKey, setSecretKey] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    getReview();
  }, []);

  const handleReview = async () => {
    if (!secretKey || !apiKey) {
      toast.error("Please enter both keys");
      return;
    }

    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      secretKey,
      apiKey,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${baseUrl}/payment-detail`, requestOptions);
  
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
        }
        const result = await response.json(); 

      setPayment((prev) => [...prev, result.data]);
      setSecretKey("");
      setApiKey("");
      toast.success("Data uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getReview = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${baseUrl}/payment-detail`, requestOptions);
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to fetch");

      setPayment(result.data);
    } catch (error: any) {
      toast.error(error.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setShowPopup(true);
  };

  const handleDeleteConfirm = async (id: number | string) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${baseUrl}/payment-detail/${id}`,
        requestOptions
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Delete failed");

      setPayment((prev) => prev.filter((item) => item.id !== id));
      setShowPopup(false);
      setSelectedId(null);
      toast.success("Deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
  };

  

  return (
    <div>
     

      <h2>Payment Gateway Details</h2>

      <div className="admin-shop-transactions">
                            {
                            loading && (
                                <div className="cart-prealoader">
                                    <ButtonPreloader/>
                                </div>
        
                            ) 
                            }
        <div className="admin-form">
          <div className="admin-input">
            <label>Secret Key</label>
            <input
              type="text"
              placeholder="Enter Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>

          <div className="admin-input">
            <label>Api Key</label>
            <input
              type="text"
              placeholder="Enter Api Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div className="btn-wrapper">
            {loading ? (
              <div className="admin-input">
                <button className="inActive">
                  <ButtonPreloader />
                </button>
              </div>
            ) : (
              <div className="admin-input">
                <button type="button" className="btn" onClick={handleReview}>
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>



       <div className="mainGallery  flex-center">
              {
                    payment.map((value, index) => (
                        <div className="flex-center gap-10" key={index}>
                            <IoEyeOutline className='eye' onClick={() => openModal(index)}/>
                            <p>{value.apiKey}</p>
                        <RiDeleteBin6Line className='delete' onClick={() => handleDeleteClick(value.id)}/>
                    </div>
                    ))
                }
          </div>

           <DeletePopup
                isOpen={showPopup}
            itemId={selectedId ?? ""}
            onCancel={() => setShowPopup(false)}
            onDelete={handleDeleteConfirm}
            />

    </div>
  );
};

export default AddPayment;
