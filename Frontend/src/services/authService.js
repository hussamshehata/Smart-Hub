import api from "./api.js";


export const login = async (email, password) => {
    const response = await api.post("/auth/login", {
        email: email.trim(),
        password: password.trim()
    });
    return response.data;
};


export const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
};

export const getProfile = async () => {
    const res = await api.get("/auth/profile");
    return res.data;
};
