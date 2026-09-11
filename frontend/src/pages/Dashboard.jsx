import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearSession } from '../auth';

const TV_API_URL = import.meta.env.VITE_TV_API_URL || 'https://api.tvmaze.com/shows';

function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // Free API - No API key needed! Returns multiple movies array
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(TV_API_URL);
        // Taking first 12 items for grid layout
        setMovies(response.data.slice(0, 12));
      } catch (error) {
        console.error("Error fetching movies API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleLogout = () => {
    clearSession();
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      {/* Navbar */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-extrabold text-red-600 tracking-wider">NETFLIX</h1>
        <div className="relative order-3 w-full sm:order-none sm:w-auto sm:flex-1 sm:max-w-md sm:mx-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true">
            &#128269;
          </span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for a show or movie"
            aria-label="Search for a show or movie"
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition duration-200 focus:border-red-600 focus:ring-1 focus:ring-red-600"
          />
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 hover:-translate-y-1 text-white px-4 py-2 rounded font-semibold text-sm transition duration-200"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-zinc-200">Popular Shows & Movies</h2>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-zinc-400 text-lg">Loading content from API...</p>
        </div>
      ) : (
        /* Multi-Movie Grid Layout */
        <>
          {filteredMovies.length === 0 ? (
            <div className="flex min-h-64 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 px-6 text-center text-zinc-400">
              No shows found for "{searchTerm}".
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map((movie) => (
            <div 
              key={movie.id} 
              className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-md hover:scale-105 hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              <img 
                src={movie.image?.medium || movie.image?.original} 
                alt={movie.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs text-red-500 font-bold uppercase tracking-wider">
                    ID #{movie.id}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 line-clamp-1">
                    {movie.name}
                  </h3>
                  <div className="flex justify-between text-xs text-zinc-400 mt-2 mb-4">
                    <span>Language: {movie.language}</span>
                    <span>⭐ {movie.rating?.average || "N/A"}</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold text-sm transition">
                  Watch Now
                </button>
              </div>
            </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;