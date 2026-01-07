import React from "react";
import ButtonPreloader from "../../../component/ButtonPreloader";


interface DeletePopupProps {
  isOpen: boolean;
  itemId: string | number; 
  loading : boolean;
  onCancel: () => void;
  onDelete: (id: string | number) => void;
}

const CancelBooking: React.FC<DeletePopupProps> = ({ isOpen, itemId, loading, onCancel, onDelete }) => {
  return (
    <div className={`backdrop cancel-wrapup ${isOpen ? "show" : ""}`}>
      <div className={`popup-container cancel-container ${isOpen ? "slide-in" : "slide-out"}`}>
        <h2>cancel booking?</h2>
        <p>Are you sure you want to CANCEL this booking(s)? 
          This will cancel the booking and notify the client(s).</p>
        <div className="button-group">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          {
            loading ? (
              <button className="delete-btn"><ButtonPreloader/></button>
            ) : (
              <button className="delete-btn" onClick={() => onDelete(itemId)}>Yes, Cancel Booking</button>
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default CancelBooking;
