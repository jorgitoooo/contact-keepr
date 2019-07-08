import React, { useReducer } from 'react';

import axios from 'axios';

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
    } catch (err) {
      console.error(err.response.config.data);
      disptach({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login user

  // Logout user

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
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
