import {useEffect, useState} from "react";
import {fetchClientTargets} from "./clientMealService.js";

const url = "http://localhost:3000/v1";

const AdjustTargets = ({ userId, closeModal, onTargetsUpdated }) => {
    const [targets, setTargets] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTargets, setEditedTargets] = useState(null);
    const [successSave, setSuccessSave] = useState("");
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const token = sessionStorage.getItem("token");

    const getTargets = async (userId) => {
        const getTargets = await fetchClientTargets(userId);
        setTargets(getTargets);
        setEditedTargets(getTargets);
    }

    const updateTargets = async () => {
        setIsSaving(true);
        setError("");
        setSuccessSave("");

        try {
            const fetchOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token,
                },
                body: JSON.stringify(editedTargets[0])
            };

            const response = await fetch(url + "/meals/client/targets/" + userId, fetchOptions);

            if (response.ok) {
                setSuccessSave("Targets updated successfully!");
                setIsEditing(false);

                setTargets(editedTargets);
                if (onTargetsUpdated) {
                    onTargetsUpdated(editedTargets);
                }
            } else {
                setError("Failed to update targets. Please try again.");
            }
        } catch (error) {
            console.error("Error updating targets:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleTargetChange = (field, value) => {
        setEditedTargets(prev => {
            const updated = [...prev];
            updated[0] = { ...updated[0], [field]: Number(value) };
            return updated;
        });
    };

    const toggleEditMode = () => {
        if (isEditing) {
            updateTargets();
        } else {
            setIsEditing(true);
        }
    };

    useEffect(() => {
        getTargets(userId);
    }, []);

    if (!targets) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
                <div className="bg-gray-900/90 text-white p-6 rounded-xl shadow-2xl border border-orange-500/30">
                    <p className="text-center text-xl montserrat-text">Loading targets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm overflow-y-auto p-4">
            <div className="bg-gray-900/90 text-white p-6 rounded-xl w-full max-w-6xl shadow-2xl border border-orange-500/30 flex flex-col max-h-[90vh]">
                <div className="text-center mb-6">
                    <h2 className="font-bold montserrat-text text-3xl bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent pb-2">
                        Daily Nutrition Targets
                    </h2>
                    <p className="montserrat-text mt-4 max-w-2xl mx-auto text-gray-300 italic">
                        Set daily calorie and macronutrient goals
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-700/50 mb-6">
                    <table className="w-full text-white">
                        <thead>
                        <tr className="bg-gradient-to-r from-orange-600/60 to-orange-500/40 text-lg font-medium">
                            <th className="p-4 text-center">Calories</th>
                            <th className="p-4 text-center">Protein</th>
                            <th className="p-4 text-center">Carbs</th>
                            <th className="p-4 text-center">Fat</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="bg-gray-800/20">
                            {isEditing ? (
                                <>
                                    <td className="p-4 poppins-text text-center">
                                        <input
                                            type="number"
                                            value={editedTargets[0].calories_target}
                                            onChange={(e) => handleTargetChange("calories_target", e.target.value)}
                                            className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </td>
                                    <td className="p-4 poppins-text text-center">
                                        <input
                                            type="number"
                                            value={editedTargets[0].protein_target}
                                            onChange={(e) => handleTargetChange("protein_target", e.target.value)}
                                            className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </td>
                                    <td className="p-4 poppins-text text-center">
                                        <input
                                            type="number"
                                            value={editedTargets[0].carbs_target}
                                            onChange={(e) => handleTargetChange("carbs_target", e.target.value)}
                                            className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </td>
                                    <td className="p-4 poppins-text text-center">
                                        <input
                                            type="number"
                                            value={editedTargets[0].fat_target}
                                            onChange={(e) => handleTargetChange("fat_target", e.target.value)}
                                            className="p-2 w-full rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="p-4 poppins-text text-center">
                                            <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-300">
                                                {targets[0].calories_target} KCAL
                                            </span>
                                    </td>
                                    <td className="p-4 poppins-text text-center">
                                            <span className="px-2 py-1 bg-green-500/10 rounded text-green-300">
                                                {targets[0].protein_target} G
                                            </span>
                                    </td>
                                    <td className="p-4 poppins-text text-center">
                                            <span className="px-2 py-1 bg-purple-500/10 rounded text-purple-300">
                                                {targets[0].carbs_target} G
                                            </span>
                                    </td>
                                    <td className="p-4 poppins-text text-center">
                                            <span className="px-2 py-1 bg-orange-500/10 rounded text-orange-300">
                                                {targets[0].fat_target} G
                                            </span>
                                    </td>
                                </>
                            )}
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-row mt-6 gap-4">
                    <button
                        onClick={toggleEditMode}
                        disabled={isSaving}
                        className={`text-white bg-gradient-to-r from-orange-600 w-full to-orange-500 font-bold p-3 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isEditing ? "Save" : "Edit"}
                    </button>
                    <button
                        onClick={closeModal}
                        disabled={isSaving}
                        className={`text-orange-500 bg-transparent font-bold w-full p-2 bruno-ace-sc-regular rounded-lg border border-orange-500/50 hover:bg-orange-500/10 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Exit
                    </button>
                </div>

                {successSave && (
                    <div className="mt-5 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 montserrat-text text-center font-medium">{successSave}</p>
                    </div>
                )}

                {error && (
                    <div className="mt-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 montserrat-text text-center font-medium">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdjustTargets;
