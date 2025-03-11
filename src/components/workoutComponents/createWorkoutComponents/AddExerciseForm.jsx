const AddExerciseForm = ({ onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const newExercise = {
            name: e.target.name.value,
            description: e.target.descri.value
        };
        onSubmit(newExercise);
    };

    return (
        <div className="w-2/3 flex flex-col items-center justify-center bg-gray-900/40 border border-orange-500/30 p-5 m-5 rounded-lg shadow-lg min-h-[300px] text-center">
            <h3 className="w-full text-xl font-bold text-white mb-4 bg-gradient-to-r from-orange-600/80 to-orange-500/60 py-2 rounded-lg montserrat-text">
                New Exercise
            </h3>
            <form onSubmit={handleSubmit} className="w-full">
                <label className="mt-2 text-gray-300 block text-left ml-1 mb-1 montserrat-text">
                    Exercise name
                </label>
                <input
                    type="text"
                    placeholder="Exercise name..."
                    name="name"
                    className="m-1 w-full p-3 border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                    required
                />

                <label className="mt-4 text-gray-300 block text-left ml-1 mb-1 montserrat-text">
                    Description
                </label>
                <textarea
                    placeholder="Description..."
                    name="descri"
                    className="m-1 w-full min-h-24 p-3 border border-orange-500/30 rounded-lg bg-gray-800/60 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                />

                <button
                    type="submit"
                    className="text-white min-w-36 mt-4 bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all duration-300 transform">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddExerciseForm;
