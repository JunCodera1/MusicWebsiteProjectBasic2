// src/config.jsx

export const backendUrl =
  "http://localhost:" + (import.meta.env.VITE_BACKEND_PORT || "3000"); // Default to 3000 if VITE_BACKEND_PORT is undefined
