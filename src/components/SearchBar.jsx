const SearchBar = ({search, setSearch}) => {
  return (
    <div className="max-w-xl mx-auto relative">
      <input 
        type="text" 
        placeholder="Search through thousands of movies..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="w-full bg-zinc-800 border-none rounded-2xl px-12 py-4 text-lg focus:ring-2 focus:ring-red-600 outline-none transition-all"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
    </div>
  )
}

export default SearchBar