import axios from "axios";

const TOKEN = 'Bearer';
let ACCESS_TOKEN = localStorage.getItem("accessToken");

export const AuthApi = axios.create ({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN} ${ACCESS_TOKEN}`
    }
});

export const login = async ({ username, password }) => {
    const data = {username, password};
    const response = await AuthApi.post(`/api/auth/login`, data);
    return response.data;
}

export const signUp = async ({ username, password }) => {
    const data = {username, password};
    const response = await AuthApi.post(`/api/auth/signup`, data);
    return response.data;
}