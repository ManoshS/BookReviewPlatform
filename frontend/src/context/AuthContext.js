import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import api from '../utils/api';
export const AuthContext = createContext();
//creating AuthContext
export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signin, setSignin] = useState(false);
  const [userReview, setUserReview] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setSignin(true);
      const decodeToken = jwtDecode(token)
      setUsername(decodeToken)
    } else {
      alert("Please login")
      setLoading(false);
    }
  }, []);


  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { message, token, user } = response.data;
      console.log(message)
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUsername(user);

      setSignin(true);
      return user;
    } catch (error) {
      console.log(error)
      throw error;
    }
  };

  const register = async (username, email, password, role) => {
    try {
      const response = await api.post('/auth/register', { username, email, password, role });

      console.log(role)
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    setUsername(null);
    setSignin(false);
  };
  const getUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setSignin(true);
      const decodeToken = jwtDecode(token)
      setUsername(decodeToken)
    } else {
      alert("Please login")
      setLoading(false);
    }
  }
  const getUserReview = async (id) => {
    try {
      const response = await api.get(`/reviews/user?userId=${id}`);
      const { data } = response;

      setUserReview(data);
      return data;
    } catch (error) {
      console.log("error: " + error)
      throw error;
    }
  }
  const value = {
    username,
    loading,
    signin,
    getUser,
    login,
    register,
    logout,
    getUserReview,
    userReview

  };

  return (
    <AuthContext.Provider
      value={value}>
      {children}</AuthContext.Provider>
  );
};