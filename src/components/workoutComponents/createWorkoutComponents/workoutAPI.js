const url = 'http://127.0.0.1:3000/v1';

export const fetchExercisesApi = async (token) => {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + token,
        }
    };
    const response = await fetch(`${url}/workouts/exercise`, fetchOptions);
    return await response.json();
};

export const addExerciseApi = async (exercise, token) => {
    const response = await fetch(`${url}/workouts/exercise/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(exercise),
    });
    const data = await response.json();
    return { status: response.status, data };
};

export const addWorkoutApi = async (workout, token) => {
    const response = await fetch(`${url}/workouts/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(workout),
    });
    const data = await response.json();
    return { status: response.status, data };
};
