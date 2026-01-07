import React, { createContext, useContext, useState, useEffect, ReactNode, MouseEventHandler } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';

  interface AuthProviderProps {
    children: ReactNode;
  }

 interface accountDetails {
        accountName : string,
        accountNumber : string,
        bankCode : string,
        bankName : string,
        customerName : string,
  }

  interface AuthContextType {
      loggedIn: boolean;
      googleIn: boolean;
      loginAuth: Function;
      logInUser: Function;
      logout: Function;
      setLoggedIn: Function;
      setGoogleIn: Function;
      setUserId : Function;
      setName : Function;
      setEmail : Function;
      setMobile1 : Function;
      setMobile2 : Function;
      setAddress1 : Function;
      setAddress2 : Function;
      setPhoneNumber1 : Function;
      setPhoneNumber2 : Function;
      setState : Function;
      setCity : Function;
      setPostalCode : Function;
      setImage : Function;
      setCart : Function;
      setNotification : Function;
      setRole : Function;
      setSignin : Function;
      setAdminLoading : Function;
      setToken : Function;
      baseUrl: string; 
      userId : string;
      name : string;
      email : string;
      mobile1 : string;
      mobile2 : string;
      address1 : string;
      address2 : string;
      phoneNumber1 : string;
      phoneNumber2 : string;
      state : string;
      city : string;
      postalCode : string;
      image : string;
      cart : string;
      notification : string;
      role : string;
      signin : boolean;
      adminLoading : boolean;
      token: string;
      }
  
  const AuthContext = createContext<AuthContextType>({
      loggedIn: false,
      googleIn: false,
      loginAuth: () => {},
      logInUser: () => {},
      logout: () => {},
      setLoggedIn : () => {},
      setGoogleIn : () => {},
      setUserId  : () => {},
      setName  : () => {},
      setEmail  : () => {},
      setMobile1  : () => {},
      setMobile2  : () => {},
      setAddress1  : () => {},
      setAddress2  : () => {},
      setPhoneNumber1  : () => {},
      setPhoneNumber2  : () => {},
      setState  : () => {},
      setCity  : () => {},
      setPostalCode  : () => {},
      setImage  : () => {},
      setCart : () => {},
      setNotification : () => {},
      setRole  : () => {},
      setSignin : () => {},
      setAdminLoading  : () => {},
      setToken  : () => {},
      baseUrl: '',
      userId : '',
      name : '',
      email : '',
      mobile1 : '',
      mobile2 : '',
      address1 : '',
      address2 : '',
      phoneNumber1 : '',
      phoneNumber2 : '',
      state : '',
      city : '',
      postalCode : '',
      image : '',
      cart : '',
      notification : '',
      role : '',
      signin : false,
      adminLoading  : false,
      token: ''
  });

 const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();
   
    const [baseUrl] = useState<string>('http://127.0.0.1:8000/api/v1');
    
    // const [baseUrl] = useState<string>('https://api.loveafrikgroup.com/api/v1');

  // ==========================================
    const [userId, setUserId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobile1, setMobile1] = useState<string>('');
    const [mobile2, setMobile2] = useState<string>('');
    const [address1, setAddress1] = useState<string>('');
    const [address2, setAddress2] = useState<string>('');
    const [phoneNumber1, setPhoneNumber1] = useState<string>('');
    const [phoneNumber2, setPhoneNumber2] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [cart, setCart] = useState<string>('');
    const [notification, setNotification] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [signin, setSignin] = useState<boolean>(false);
    const [googleIn, setGoogleIn] = useState<boolean>(false);

    const [adminLoading, setAdminLoading] = useState<boolean>(false);
  
  // =========================

    const [token, setToken] = useState<string>(() => {
      const storedToken = localStorage.getItem('myToken');
      return storedToken ? storedToken : '';
    });   
  
    const [loggedIn, setLoggedIn] = useState<boolean>(() => {
      const storedState = localStorage.getItem('myState');
      return storedState ? JSON.parse(storedState) : false;
    });
  
    const logInUser = () => {
      setLoggedIn(true);
      setSignin(true);
      localStorage.setItem('myState', JSON.stringify(true));
    };
  
    const loginAuth = (userId: string, name: string, email: string,  address1: string, address2 : string, phoneNumber1 : string, phoneNumber2 : string, state : string, city : string, postalCode: string, image: string, cart : string, notification : string, role: string, token?: string) => {
         setUserId(userId);
         setName(name);
         setEmail(email);
         setAddress1(address1);
         setAddress2(address2);
         setPhoneNumber1(phoneNumber1);
         setPhoneNumber2(phoneNumber2);
         setState(state);
         setCity(city);
         setPostalCode(postalCode);
         setImage(image);
         setCart(cart);         
         setNotification(notification);
         setRole(role);
      if(token){
          localStorage.setItem('myToken', token);
          setToken(token);
      }
      
    }

    const logout = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const storedToken: string | null = localStorage.getItem('myToken');
      const tokens: string = storedToken || '';
      setAdminLoading(true);
      if(tokens !== ''){
         logOutUser(tokens);
      }else{
        localStorage.removeItem("myState");
        localStorage.removeItem("myToken");
        setAdminLoading(false);
        setSignin(false);
        navigate("/");
      }
    };

    const logOutUser = async (tokens : string) => {
      setAdminLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", tokens);
      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      try {
        const response = await fetch(`${baseUrl}/auth/logout`, requestOptions);
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
        const result = await response.json();
        setAdminLoading(false);
          localStorage.removeItem("myState");
          localStorage.removeItem("myToken");
          setSignin(false);
          navigate("/");
      } catch (error) {
        localStorage.removeItem("myState");
        localStorage.removeItem("myToken");
        navigate("/");
      }
  };


   useEffect(() => {
  
    const exemptedPaths = [
  /^\/register$/,                     // /register
  /^\/register\/[^\/]+$/,            // /register/:referralId
  /^\/forgetpassword$/,              // /forgetpassword
  /^\/changepassword\/[^\/]+$/,     // /changepassword/:token
  /^\/emailconfirm\/[^\/]+$/,       // /emailconfirm/:token
  /^\/[^\/]+$/,       // /:token
  /^\/redirectform$/,                // /redirectform
  /^\/verifyotp$/,                   // /verifyotp
  /^\/login$/                        // /login
];
 const fetchData = async () => {
      const isExempted = exemptedPaths.some((pattern) => pattern.test(location.pathname));
      if (loggedIn) {
        const storedToken: string | null = localStorage.getItem('myToken');
         const tokens: string = storedToken || '';
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", tokens);
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        try {
          const response = await fetch(`${baseUrl}/auth/getuser`, requestOptions);    
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
            const result = await response.json();
            loginAuth(result.data.userId, result.data.name, result.data.email,  result.data.address1, result.data.address2, result.data.phoneNumber1, result.data.phoneNumber2, result.data.city, result.data.city, result.data.postalCode, result.data.profileImage, result.cart, result.notification, result.data.role,  result.token);

            // if(result.data.role == "admin"){
            //  navigate("/admin/admin-dashboard");
            //   logInUser();
            // }

            logInUser();
             
        } catch (error) {          
          if (!isExempted) {
            logout();
          }
        }
      } else {       
        if (!isExempted) {
            logout();
          }
      }
    };
         fetchData();
  }, [loggedIn]);

    return (
      <AuthContext.Provider value={{
        loggedIn, googleIn, loginAuth, logInUser, logout, setLoggedIn, setGoogleIn, 
      setUserId,
      setName,
      setEmail,
      setMobile1,
      setMobile2,
      setAddress1,
      setAddress2,
      setPhoneNumber1,
      setPhoneNumber2,
      setState,
      setCity,
      setPostalCode,
      setImage,
      setCart,
      setNotification,
      setRole,
      setSignin,
      setAdminLoading,
      setToken,
      baseUrl, userId, name, email,
      mobile1,
      mobile2,
      address1,
      address2,
      phoneNumber1,
      phoneNumber2,
      state,
      city,
      postalCode,
      image,
      cart,
      notification,
      role,
      signin,
      adminLoading,
      token
      }}>

        {children}
      </AuthContext.Provider>
    );
  };

  export const userAuth = (): AuthContextType => {
    return useContext(AuthContext);
  };

  export { AuthContext, AuthProvider };