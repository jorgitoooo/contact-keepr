import React, { useReducer } from 'react';

import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

import authReducer from './authReducer';
import AuthContext from './authContext';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null
  };

  const [state, disptach] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      disptach({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      disptach({ type: AUTH_ERROR });
    }
  };

  // Register user
  const register = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users', user, config);

      disptach({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      disptach({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login user
  const login = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', user, config);

      disptach({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      disptach({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout user
  const logout = () => disptach({ type: LOGOUT });

  // Clear errors
  const clearErrors = () => disptach({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        clearErrors,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
