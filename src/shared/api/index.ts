import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
    /*headers: { 'Content-Type': 'application/json', 'Accept': '*!/!*'}*/
});

