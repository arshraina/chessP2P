import axios from "axios";

const API_URL = `${process.env.BACKEND}/api/user`;

const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        console.error("Error occurred during login:", error);
        throw error;
    }
};

const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error occurred during registration:", error);
        throw error;
    }
};

const getUserDetails = async (token) => {
    try {
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${API_URL}/details`, config);
        return response.data;
    } catch (error) {
        console.error("Error occurred while fetching user details:", error);
        throw error;
    }
};

const createGame = async (gameData, token) => {
    try {
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(`${API_URL}/game`, gameData, config);
        return response.data;
    } catch (error) {
        console.error("Error occurred while creating a game:", error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isLogged");
};

const userService = {
    login,
    register,
    getUserDetails,
    createGame,
    logout,
};

export default userService;
