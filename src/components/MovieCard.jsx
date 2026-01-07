const MovieCard = ({ IMAGE_URL, movies }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {movies.map((movie) => (
            <div key={movie.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105">
                <img 
                    src={movie.poster_path 
                    ? `${IMAGE_URL}${movie.poster_path}` 
                    : 'https://placehold.co/500x750/18181b/white?text=No+Poster+Available'} 
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                    <p className="text-xs font-medium text-gray-200 line-clamp-4">{movie.overview}</p>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-yellow-500">
                    ★ {movie.vote_average.toFixed(1)}
                </div>
                </div>
                <h3 className="mt-3 font-semibold text-sm line-clamp-1 group-hover:text-red-500 transition-colors">
                {movie.title}
                </h3>
                <p className="text-xs text-gray-500">{movie.release_date?.split('-')[0]}</p>
            </div>
            ))}
        </div>
    )
}

export default MovieCard