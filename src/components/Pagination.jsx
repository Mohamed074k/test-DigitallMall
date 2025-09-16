import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, setPage, totalPages }) => {
  const visiblePages = 3;
  const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center items-center gap-2 p-6 bg-white border-t border-gray-200">
      {/* Prev button */}
      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className={`p-2 rounded-lg shadow-sm transition 
          ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
          }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* First page + ellipsis */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={`px-3 py-1 rounded-lg shadow-sm transition
              ${
                page === 1
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            1
          </button>
          <span className="px-2 text-gray-400">...</span>
        </>
      )}

      {/* Visible pages */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`px-3 py-1 rounded-lg shadow-sm transition
            ${
              p === page
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {p}
        </button>
      ))}

      {/* Last page + ellipsis */}
      {endPage < totalPages && (
        <>
          <span className="px-2 text-gray-400">...</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`px-3 py-1 rounded-lg shadow-sm transition
              ${
                page === totalPages
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className={`p-2 rounded-lg shadow-sm transition 
          ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
          }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
