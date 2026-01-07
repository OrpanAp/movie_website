const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center items-center space-x-6 mt-16">
        <button 
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-6 py-2 bg-zinc-800 rounded-lg disabled:opacity-30 hover:bg-zinc-700 transition"
        >
          Previous
        </button>
        <span className="font-bold text-red-600">Page {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          className="px-6 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
        >
          Next
        </button>
    </div>
  )
}

export default Pagination