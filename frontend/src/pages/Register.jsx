import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, saveUser } from '../auth';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password.trim()) {
      setMessage("Please fill in your name, email, and password.");
      return;
    }

    if (getUsers().some((user) => user.email === normalizedEmail)) {
      setMessage("An account with this email already exists.");
      return;
    }

    saveUser(normalizedName, normalizedEmail, password);
    navigate('/login', { state: { message: "Registration successful. Please sign in." } });
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
          onClick={() => navigate('/login')}
          className="rounded bg-red-600 px-5 py-2.5 text-sm font-bold transition duration-200 hover:-translate-y-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          Sign In
        </button>
      </header>

      <section className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-6 pb-10">
        <form onSubmit={handleRegister} className="flex w-full max-w-md flex-col gap-4 rounded-md bg-black/80 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm sm:p-10">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <input 
          value={name} onChange={(e) => setName(e.target.value)} 
          type="text" placeholder="Your name" required 
          className="p-3 bg-zinc-800 rounded text-white border border-zinc-700 transition duration-200 focus:outline-none focus:border-red-600 focus:-translate-y-0.5"
        />
        <input 
          value={email} onChange={(e) => setEmail(e.target.value)} 
          type="email" placeholder="Email address" required 
          className="p-3 bg-zinc-800 rounded text-white border border-zinc-700 transition duration-200 focus:outline-none focus:border-red-600 focus:-translate-y-0.5"
        />
        <input 
          value={password} onChange={(e) => setPassword(e.target.value)} 
          type="password" placeholder="Create password" required 
          className="p-3 bg-zinc-800 rounded text-white border border-zinc-700 transition duration-200 focus:outline-none focus:border-red-600 focus:-translate-y-0.5"
        />
        {message && <p className="text-red-500 text-sm">{message}</p>}
        <button type="submit" className="bg-red-600 hover:bg-red-700 hover:-translate-y-1 p-3 rounded font-bold transition duration-200">
          Register
        </button>
      </form>
      <p className="mt-5 text-sm text-zinc-400">
        Already have an account? <a href="/login" className="text-white hover:underline transition duration-200 hover:-translate-y-0.5 inline-block">Sign in</a>
      </p>
      </section>
    </main>
  );
}

export default Register;