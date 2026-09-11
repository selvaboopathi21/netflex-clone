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
    <main className="auth-page relative min-h-screen overflow-hidden text-white">
      <div className="auth-page__shade absolute inset-0" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-3xl font-black tracking-tighter text-red-600 transition duration-200 hover:scale-105 sm:text-4xl"
        >
          NETFLIX
        </button>
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="rounded bg-red-600 px-5 py-2.5 text-sm font-bold transition duration-200 hover:-translate-y-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          Sign Up
        </button>
      </header>

      <section className="relative z-10 flex min-h-[calc(100vh-96px)] w-full flex-col items-center justify-center px-6 pb-10">
      <form onSubmit={handleLogin} className="flex w-full max-w-md flex-col gap-4 rounded-md bg-black/80 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm sm:p-10">
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
      <p className="mt-5 text-sm text-zinc-400">
        New to Netflix?{' '}
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="inline-block text-white transition duration-200 hover:-translate-y-0.5 hover:underline"
        >
          Sign up now
        </button>
      </p>
      </section>
    </main>
  );
}

export default Login;