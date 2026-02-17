export default function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-between items-center mt-6">
            <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className={`px-4 py-2 font-inter rounded border ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}>Previous</button>
            <span className="font-inter text-sm font-medium">Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)} className={`px-4 py-2 font-inter rounded border ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}>Next</button>
        </div>
    )
}