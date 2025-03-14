const ActionButtons = ({ isEditMode, toggleEditMode, handleSave, closeModal, handleDeleteClick, confirmDelete }) => {
    return (
        <div className="flex flex-row gap-3 mt-4 pt-4 border-t border-gray-700/30">
            <button
                onClick={toggleEditMode}
                className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-2 flex-1 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400"
            >
                {isEditMode ? "Cancel" : "Edit"}
            </button>
            {isEditMode ? (
                <button
                    onClick={handleSave}
                    className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-2 flex-1 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400"
                >
                    Save
                </button>
            ) : <button
                onClick={handleDeleteClick}
                className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-2 flex-1 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400"
            >
                {confirmDelete ? "Confirm" : "Delete"}
            </button>
            }
            <button
                onClick={closeModal}
                className="text-orange-500 bg-transparent font-bold p-2 flex-1 bruno-ace-sc-regular rounded-lg border border-orange-500/50 hover:bg-orange-500/10"
            >
                Exit
            </button>
        </div>
    );
};

export default ActionButtons;
