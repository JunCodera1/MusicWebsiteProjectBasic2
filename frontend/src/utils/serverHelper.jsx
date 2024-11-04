import { backendUrl } from "./config.jsx";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    // route: 
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

makeUnauthenticatedPOSTRequest("/auth/login", loginData);