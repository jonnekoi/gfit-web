const url = "http://localhost:3000/v1";

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
