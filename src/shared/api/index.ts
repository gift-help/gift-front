import axios from "axios";

export const BASE_URL = 'https://gift.dubskilw.beget.tech'

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
    /*withCredentials: true, // ДОБАВЬТЕ ЭТУ СТРОЧКУ
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }*/
    headers: { 'Content-Type': 'application/json', }
});

