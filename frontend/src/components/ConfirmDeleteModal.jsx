export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80">
                <h2 className="font-inter text-xl font-semibold mb-4">Confirm Delete</h2>
                <p className="text-gray-600 font-inter mb-6">Are you sure you want to delete this?</p>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer">Delete</button>
                </div>
            </div>
        </div>
    )
}