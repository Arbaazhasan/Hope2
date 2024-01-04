import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const logIn = (formData) => API.post('/api/v1/user/login', formData);
export const signUp = (formData) => API.post('/api/v1/user/register', formData);