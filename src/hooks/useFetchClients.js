import { useEffect, useState } from "react";

const URL = "http://127.0.0.1:3000/v1";

const useFetchClients = (type) => {
    const [clients, setClients] = useState(null);
    const token = sessionStorage.getItem("token");


    const fetchClients = async () => {
        try {
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            };

            const response = await fetch(`${URL}/clients?type=${type}`, fetchOptions);
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchClients();
    },[type] );

    return clients;
};

export default useFetchClients;
