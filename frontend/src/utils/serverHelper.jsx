import { backendUrl } from "./config";

export const makeUnAuthenticatedPOSTRequest = async (route, body) => {
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

export const makeAuthenticatedPOSTRequest = async (route, body) => {
  const token = getToken();
  const response = await fetch(backendUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken(); // Get the token, ensure it's defined

  if (!token) {
    throw new Error("No token found. User may not be authenticated.");
  }

  try {
    const response = await fetch(backendUrl + route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch data.");
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error making authenticated GET request:", error);
    throw error;
  }
};

export const makeAuthenticatedPUTRequest = async (route, body) => {
  const token = getToken(); // Get the token, ensure it's defined

  if (!token) {
    throw new Error("No token found. User may not be authenticated.");
  }

  try {
    const response = await fetch(backendUrl + route, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body), // Send the request body with the data to update
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to update data.");
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error making authenticated PUT request:", error);
    throw error;
  }
};

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken ? decodeURIComponent(accessToken) : null; // Decode and handle absence of token
};
