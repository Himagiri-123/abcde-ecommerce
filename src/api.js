import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// ప్రతిసారి రిక్వెస్ట్ పంపేటప్పుడు టోకెన్ ని కూడా పంపడానికి ఇది వాడతాం
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;