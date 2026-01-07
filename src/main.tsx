import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AuthProvider } from './pages/context/AuthContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <GoogleOAuthProvider clientId="906079410524-21hod064o3njjpq5h5vhc53l7gjqhls6.apps.googleusercontent.com">
           <App />
      </GoogleOAuthProvider>
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>,
)
