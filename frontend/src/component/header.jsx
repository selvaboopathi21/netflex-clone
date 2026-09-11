import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
 
 function Header() {
   const location = useLocation();
   const navigate = useNavigate();

   if (location.pathname === '/dashboard') {
     return null;
   }

   return (
     <>
     <header className="header">
        <div><h1 className="text-2xl font-bold text-red-600">NETFLIX</h1></div>
        <div className="language-selector">
          ENGLISH
         <button onClick={() => navigate('/login')} className="bg-red-600 text-white px-2 py-2 rounded hover:bg-red-700 transition-">Sign In</button>
        </div>
     </header>
     </>
   )
 }
 
 export default Header