import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";


interface SuccessfulProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const SuccessfulPayment: React.FC<SuccessfulProps> = ({ isOpen,  onCancel, onDelete }) => {
  return (
    <div className={`backdrop ${isOpen ? "show" : ""}`}>
      <div className={`popup-container ${isOpen ? "slide-in" : "slide-out"}`}>
        <div className="payment-success">
          <p>Transaction Successful</p>
          <div className="success-icon">
            <IoIosCheckmarkCircle />
          </div>
        </div>
        

        <div className="button-group">
          <button className="delete-btn success-btn" onClick={() => onDelete()}>proceed</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
