import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">NETFLIX</h1>
      <h2 className="text-3xl font-bold mb-2">Unlimited movies, TV shows, and more</h2>
      <p className="text-gray-400 mb-6">Watch anywhere. Cancel anytime.</p>
      
      <div className="flex gap-4">
        <button 
          onClick={() => navigate('/login')}
          className="bg-red-600 hover:bg-red-700 hover:-translate-y-1 text-white font-semibold px-6 py-3 rounded transition duration-200"
        >
          Sign In
        </button>
        <button 
          onClick={() => navigate('/register')}
          className="bg-gray-800 hover:bg-gray-700 hover:-translate-y-1 text-white font-semibold px-6 py-3 rounded transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default HomeLanding;