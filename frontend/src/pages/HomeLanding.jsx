import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeLanding() {
  const navigate = useNavigate();

  return (
    <main className="landing-page relative min-h-screen overflow-hidden bg-black text-white">
      <div className="landing-page__shade absolute inset-0" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <h1 className="text-3xl font-black tracking-tighter text-red-600 sm:text-4xl">NETFLIX</h1>
        <button
          onClick={() => navigate('/login')}
          className="rounded bg-red-600 px-5 py-2.5 text-sm font-bold transition duration-200 hover:-translate-y-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          Sign In
        </button>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-4xl flex-col items-center justify-center px-6 pb-24 text-center sm:px-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-red-500 sm:text-sm">Your next story starts here</p>
        <h2 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Unlimited movies, TV shows, and more
        </h2>
        <p className="mt-6 max-w-xl text-base text-zinc-200 sm:text-xl">
          Watch anywhere. Cancel anytime.
        </p>

        <button
          onClick={() => navigate('/register')}
          className="mt-9 rounded bg-white px-7 py-3.5 text-base font-bold text-black transition duration-200 hover:-translate-y-1 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        >
          Sign Up
        </button>
      </section>
    </main>
  );
}

export default HomeLanding;