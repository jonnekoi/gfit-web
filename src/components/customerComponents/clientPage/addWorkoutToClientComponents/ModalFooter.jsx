const ModalFooter = ({ selectedWorkout, isEditMode, toggleEditMode, handleSave, close }) => {
    return (
        <div className="flex flex-row mt-6 gap-4">
            {selectedWorkout && (
                <button
                    onClick={toggleEditMode}
                    className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 w-full bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all"
                >
                    {isEditMode ? "Cancel" : "Customize"}
                </button>
            )}
            {isEditMode && (
                <button
                    onClick={handleSave}
                    className="text-white bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 w-full bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all"
                >
                    Save
                </button>
            )}

            <button
                onClick={close}
                className="text-orange-500 bg-transparent font-bold p-3 w-full bruno-ace-sc-regular rounded-lg border border-orange-500/50 hover:bg-orange-500/10"
            >
                Exit
            </button>
        </div>
    );
};

export default ModalFooter;
