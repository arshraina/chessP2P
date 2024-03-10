import axios from "axios";
import dotenv from "dotenv";

const API_URL = `http://localhost:5000/api/user`;

const api = axios.create({
  baseURL: "http://localhost:5000/api/user",
  withCredentials: true,
});

const login = async (userData) => {
  try {
    const response = await api.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error occurred during login:", error);
    throw error;
  }
};

const register = async (userData) => {
  try {
    const response = await api.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw error;
  }
};

const getUserDetails = async () => {
  try {
    const response = await api.get(`${API_URL}/details`);
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching user details:", error);
    throw error;
  }
};

// const createGame = async (gameData) => {
//   try {
//     const response = await api.post(`${API_URL}/game`, gameData);
//     return response.data;
//   } catch (error) {
//     console.error("Error occurred while creating a game:", error);
//     throw error;
//   }
// };

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
  //   createGame,
  logout,
};

export default userService;
