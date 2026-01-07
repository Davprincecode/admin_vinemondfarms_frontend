import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Logout = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState<boolean>(false);
    const {baseUrl, token} = userAuth();

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/json");
         myHeaders.append("Authorization", token);
         const requestOptions: RequestInit = {
           method: 'GET',
           headers: myHeaders,
           redirect: 'follow'
         };
         try {
           const response = await fetch(`${baseUrl}/logout`, requestOptions);
           if (!response.ok) {
             const errorResponse = await response.json();
             throw new Error(errorResponse.message);
           }

           const result = await response.json(); 
           
           localStorage.removeItem("user");
           localStorage.removeItem("token");
           localStorage.removeItem("myState");
           localStorage.removeItem("myToken");
           toast.success("You are now logged out...");
            setLoading(false); 
            navigate("/login");
           
         } catch (error) {
             setLoading(false);
             if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
               toast.error(error.message);
             } else {
               toast.error('An unknown error occurred.');
             }
           }
       
     };
     fetchData();

   }, [navigate]);
   return null;
};

export default Logout;
