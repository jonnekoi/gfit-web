const url = "http://localhost:3000/v1";
const token = sessionStorage.getItem("token");

export const fetchClientMeals = async (id) => {
    try {
        const response = await fetch(url + '/meals/' + id);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching client meals:", error);
        throw error;
    }
}

export const fetchClientTargets = async (id) => {
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token,
        }
    };
    try {
        const response = await fetch(url + '/meals/client/targets/' + id, fetchOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching client targets:", error);
        throw error;
    }
}

