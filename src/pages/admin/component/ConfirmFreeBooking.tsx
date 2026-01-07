import React from "react";
import ButtonPreloader from "../../../component/ButtonPreloader";


interface DeletePopupProps {
  isOpen: boolean;
  loading: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const ConfirmFreeBooking: React.FC<DeletePopupProps> = ({ isOpen, loading, onCancel, onDelete }) => {
  return (
    <div className={`backdrop cancel-wrapup ${isOpen ? "show" : ""}`}>
      <div className={`popup-container cancel-container ${isOpen ? "slide-in" : "slide-out"}`}>
        <h2>confirm booking?</h2>
        <p>Please confirm if you wish to proceed with this booking at a price of 0.</p>
        <div className="button-group">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          {
            loading ? (
              <button className="delete-btn"><ButtonPreloader/></button>
            ) : (
          <button className="delete-btn" onClick={onDelete}>Yes, Continue</button>
           )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmFreeBooking;
