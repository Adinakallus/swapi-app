type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  //Only render pagination if more then one page exists
  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="d-flex justify-content-between align-items-center mt-3 px-4">
      <button
        className="btn btn-outline-theme me-2"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <ul className="pagination mb-0 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page} className="page-item">
            <button
              className={`page-item btn btn-sm ${
                page === currentPage ? "bg-yellow fw-bold" : "btn-outline-theme"
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="btn btn-outline-theme ms-2"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
};
