import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, saveUser } from '../auth';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (getUsers().some((user) => user.email === normalizedEmail)) {
      setMessage("An account with this email already exists.");
      return;
    }

    saveUser(normalizedEmail, password);
    navigate('/login', { state: { message: "Registration successful. Please sign in." } });
  };

  return (
    <div className="grid min-h-screen place-items-center bg-black text-white">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 bg-zinc-900 p-8 rounded-md w-80">
        <h2 className="text-2xl font-bold">Sign Up</h2>
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
      <p className="text-sm text-zinc-400">
        Already have an account? <a href="/login" className="text-white hover:underline transition duration-200 hover:-translate-y-0.5 inline-block">Sign in</a>
      </p>
    </div>
  );
}

export default Register;