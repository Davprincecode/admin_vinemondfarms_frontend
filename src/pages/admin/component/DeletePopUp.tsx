import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { userAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../component/ButtonPreloader";


interface DeletePopupProps {
  isOpen: boolean;
  itemId: string | number; // or whatever type your ID is
  onCancel: () => void;
  onDelete: (id: string | number) => void;
}

type deleteItem = {
  bookingId : string;
  date : string;
  startTime : string;
  endTime : string;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ isOpen, itemId, onCancel, onDelete }) => {
   
  const[loading, setLoading] = useState<boolean>(false);
  const {baseUrl, token} = userAuth();

  

     const handleDelete = async (id: string) => {
                  setLoading(true);
                  const myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  myHeaders.append("Authorization", token);
                  const requestOptions: RequestInit = {
                      method: "DELETE",
                      headers: myHeaders,
                      redirect: "follow"
                  };
                  try {
                      const response = await fetch(`${baseUrl}/booking-occurence/${id}`, requestOptions);    
                      if (!response.ok) {
                      const errorResponse = await response.json();
                      throw new Error(errorResponse.message);
                      }
                      const result = await response.json();   
                      setLoading(false);    
                      toast.error("delete successfully");
                    
                  } catch (error) {
                    setLoading(false);
                    if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                    toast.error(error.message);
                    } else {
                    toast.error('An unknown error occurred.');
                    }
                      
                  }
          
      };

  return (
    <div className={`backdrop ${isOpen ? "show" : ""}`}>
      <div className={`popup-container ${isOpen ? "slide-in" : "slide-out"}`} 
      style={{ width: "650px", overflow : "auto"}}>


        <div className="pop-body">
          <p>Are you sure you want to delete item ?</p>
        </div>
        
        <div className="button-group">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="delete-btn" onClick={() => onDelete(itemId)}>
             Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
