export const saveWorkout = async (workoutData) => {
    const token = sessionStorage.getItem("token");
    const url = "http://localhost:3000/v1";

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
        body: JSON.stringify(workoutData),
    };

    try {
        const response = await fetch(url + "/clients/workout/client/add", fetchOptions);
        if (response.status === 200) {
            console.log("update ok");
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error saving workout:", error);
        return false;
    }
};
