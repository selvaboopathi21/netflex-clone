import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { findUser, setSession } from '../auth';

function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    // Frontend Validation (Requirement: Empty field check)
    if (!email.trim() || !password.trim()) {
      setMessage("Please enter both Email and Password.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const savedUser = findUser(normalizedEmail, password);

    if (savedUser) {
      setSession(savedUser.email);
      setLoggedIn(true);
      navigate('/dashboard');
      return;
    }

    try {
      // Fixed: Payload lowercase 'email' matching backend
      const response = await axios.post('https://netflex-clone-5d1f.onrender.com/api/login', { email, password });

      if (response.status === 200) {
        setSession(normalizedEmail);
        setLoggedIn(true);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.request) {
        setMessage("Server down-a irukku or Network issue!");
      } else {
        setMessage("Something went wrong!");
      }
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-black text-white">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-zinc-900 p-8 rounded-md w-80 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Sign In</h2>

        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="text" 
          placeholder="Email or phone number" 
          className="p-3 rounded bg-zinc-800 text-white border border-zinc-700 transition duration-200 focus:outline-none focus:border-red-600 focus:-translate-y-0.5"
        />

        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          placeholder="Password" 
          className="p-3 rounded bg-zinc-800 text-white border border-zinc-700 transition duration-200 focus:outline-none focus:border-red-600 focus:-translate-y-0.5"
        />

        {/* Dynamic Error Message Display */}
        {message && <p className="text-red-500 text-sm font-medium mt-1">{message}</p>}

        <button type="submit" className="bg-red-600 hover:bg-red-700 hover:-translate-y-1 p-3 rounded font-semibold mt-2 transition duration-200">
          Sign In
        </button>
      </form>
      <p className="text-sm text-zinc-400">
        New to Netflix? <a href="/register" className="text-white hover:underline transition duration-200 hover:-translate-y-0.5 inline-block">Sign up now</a>
      </p>
    </div>
  );
}

export default Login;