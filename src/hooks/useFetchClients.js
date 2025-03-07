// src/hooks/useFetchClients.js
import { useEffect, useState } from "react";

const URL = "http://127.0.0.1:3000/v1";

const useFetchClients = (type) => {
    const [clients, setClients] = useState(null);

    const fetchClients = async () => {
        try {
            const response = await fetch(`${URL}/clients?type=${type}`);
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, [type]);

    return clients;
};

export default useFetchClients;
