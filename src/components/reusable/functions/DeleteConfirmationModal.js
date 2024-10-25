const DeleteConfirmationModal = ({ show, onClose, onConfirm  , warningMsg , type}) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold">{type} Confirmation</h2>
          <p className="mt-2">{warningMsg}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  export default DeleteConfirmationModal
