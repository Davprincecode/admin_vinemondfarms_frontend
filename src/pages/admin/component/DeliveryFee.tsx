import React, { useEffect, useState } from "react";
import { userAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../component/ButtonPreloader";
import DeliveryFeePop from "../../../component/DeliveryFeePop";

type StateIntern = {
  state: string;
  area: string;
  amount: number;
};

export default function DeliveryFee() {
  const [loading, setLoading] = useState<boolean>(false);
  const [authAction, setAuthAction] = useState<boolean>(false);
  const [states, setStates] = useState<StateIntern[]>([]);
  const [fees, setFees] = useState<Record<string, string>>({});
  const [amount, setAmount] = useState<number>(0);
  const { baseUrl, token } = userAuth();

  // Fetch states + fees from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/delivery-fees`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }

        const result = await response.json();
        setStates(result.data);

        // initialize fees with backend amounts
        const initialFees: Record<string, string> = {};
        result.data.forEach((s: StateIntern) => {
          initialFees[s.area] = s.amount?.toString() || "";
        });
        setFees(initialFees);

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        toast.error(error?.message || "An unknown error occurred.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (stateName: string, value: string) => {
    setFees((prev) => ({ ...prev, [stateName]: value }));
  };

  const applyToAll = (amount: number) => {
  const initialFees: Record<string, string> = { ...fees};

  states.forEach((s: StateIntern) => {
    if (s.state !== "Lagos" && s.state !== "Abroad") {   
      initialFees[s.area] = amount?.toString() || "";
    }
  });

  setFees(initialFees);
  setAuthAction(false);
  setAmount(0);
};


   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({ fees });
  
      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw
      };
  
      try {
        const response = await fetch(`${baseUrl}/delivery-fees`, requestOptions);
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
          }
          const result = await response.json();  
          toast.success(result.message);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

  return (

    <div>
    
    <div className="lagos-container">
        <div className="admin-prod-title">Abroad</div>
        <div className="flex-center flex-wrap gap-10">
           {
             states.map((s, index) => (
                s.state == "Abroad" && (
                   <div className="admin-input admin-short" key={index}>
                    <label>{s.area}</label>
                   <input
                        type="number"
                        placeholder="Enter Price"
                        value={fees[s.area] || ""}
                        onChange={(e) => handleChange(s.area, e.target.value)}
                    />
                </div>
                )
             ))
           }
                
         

        </div>

    </div>

    <div className="lagos-container">

        <div className="admin-prod-title">Lagos</div>

        <div className="flex-center flex-wrap gap-10">
           {
             states.map((s, index) => (
                s.state == "Lagos" && (
                   <div className="admin-input admin-short" key={index}>
                    <label>{s.area}</label>
                   <input
                        type="number"
                        placeholder="Enter Price"
                        value={fees[s.area] || ""}
                        onChange={(e) => handleChange(s.area, e.target.value)}
                    />
                </div>
                )
             ))
           }
                
         

        </div>

    </div>
    
    <div className="form-containers">
      <div className="admin-prod-title">State Nationwide</div>

      <div className="apply" onClick={() => setAuthAction(true)}>
        Apply to all
      </div>

      {loading && <p>Loading states...</p>}
      {states.map((s, index) => (
        <div className="admin-input" key={index}>
            {
                s.state !== "Lagos" && s.state !== "Abroad" && (
                    <>
                        <label>{s.area}</label>
                        <input
                        type="number"
                        placeholder="Enter Price"
                        value={fees[s.area] || ""}
                        onChange={(e) => handleChange(s.area, e.target.value)}
                        />
                        
                    </>
                )
            }
          
        </div>
      ))}
     
    <div className="btn-wrapper">
        <div className="admin-input">
            {
                loading ? (
                <ButtonPreloader/>
                ) : (
                    <div className="btn" onClick={handleSubmit}>
                        Submit
                    </div>
                )
            }
        </div>
    </div>
   </div>

     <DeliveryFeePop authAction={authAction} setAuthAction={setAuthAction} amount={amount} setAmount={setAmount} applyToAll={applyToAll}/>

    </div>
  );
}
