import React from "react";
import { createContext, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/AuthReducer";
import { apiUrl } from "./constants";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [authState,dispatch] = useReducer(authReducer,{
        authLoading:true,
        isAuthenticated : false,
        user:null
    });
// Login
const loginUser = async userForm=>{
    try {
        const response = await axios.post(`${apiUrl}/auth/login`)
    } catch (error) {
        
    }
}
};
