
import { useEffect, useState } from "react";
import { useDebounce } from 'react-use'; // Optional: npm install react-use
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import LoadingSpinner from "./components/LoadingSpinner";
import Pagination from "./components/Pagination";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const requests = {
  fetchMovies: (page) => `${BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`,
  searchMovies: (query) => `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  // Debounce logic: update debouncedSearch only after 500ms of no typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const endpoint = debouncedSearch 
        ? requests.searchMovies(debouncedSearch) 
        : requests.fetchMovies(page);

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error(`Failed to fetch movies`);

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error(`Error fetching movies: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [debouncedSearch, page]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Search Header */}
      <header className="py-10 px-6 text-center bg-gradient-to-b from-zinc-900 to-black">
        <h1 className="text-4xl font-extrabold mb-6 tracking-tight">
          Find Your Next <span className="text-red-600">Favorite</span> Movie
        </h1>

        <SearchBar search={search} setSearch={setSearch} />
      </header>

      {/* Movie Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <MovieCard IMAGE_URL={IMAGE_URL} movies={movies} />
        )}

        {/* Pagination Controls */}
        {!debouncedSearch && (
          <Pagination page={page} setPage={setPage} />
        )}
      </main>
    </div>
  );
}

export default App;