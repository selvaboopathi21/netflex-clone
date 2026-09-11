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
    <main className="dashboard-page min-h-screen text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-8 sm:py-8 lg:px-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5 sm:mb-10 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-2xl font-black tracking-tighter text-red-600 transition duration-200 hover:scale-105 sm:text-3xl"
          >
            NETFLIX
          </button>
          <div className="relative order-3 w-full sm:order-none sm:mx-4 sm:w-auto sm:max-w-xl sm:flex-1 lg:mx-8">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true">
            &#128269;
          </span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for a show or movie"
            aria-label="Search for a show or movie"
            className="w-full rounded-md border border-white/15 bg-black/50 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition duration-200 focus:border-red-500 focus:bg-black/75 focus:ring-1 focus:ring-red-500"
          />
          </div>
          <button
            onClick={handleLogout}
            className="rounded bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 sm:px-4"
          >
            Logout
          </button>
        </header>

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-red-500">Now streaming</p>
              <h2 className="text-2xl font-bold text-zinc-100 sm:text-3xl">Popular Shows & Movies</h2>
            </div>
            {!loading && <span className="text-sm text-zinc-500">{filteredMovies.length} titles</span>}
          </div>

          {loading ? (
            <div className="flex min-h-72 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 text-center text-zinc-400">
              Loading your shows...
            </div>
          ) : (
            filteredMovies.length === 0 ? (
              <div className="flex min-h-72 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 text-center text-zinc-400">
                No shows found for "{searchTerm}".
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMovies.map((movie) => (
                  <article
                    key={movie.id}
                    className="group flex min-h-[25rem] flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-red-600/60 hover:shadow-red-950/20"
                  >
                    <img
                      src={movie.image?.medium || movie.image?.original}
                      alt={movie.name}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                          ID #{movie.id}
                        </span>
                        <h3 className="mt-1 line-clamp-1 text-lg font-bold text-white">
                          {movie.name}
                        </h3>
                        <div className="mt-2 mb-4 flex justify-between gap-3 text-xs text-zinc-400">
                          <span>{movie.language || 'Unknown language'}</span>
                          <span>Rating: {movie.rating?.average || "N/A"}</span>
                        </div>
                      </div>
                      <button className="w-full rounded bg-red-600 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-red-700 hover:-translate-y-0.5">
                        Watch Now
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )
          )}
        </section>
      </div>
    </main>
  );
}

export default Dashboard;