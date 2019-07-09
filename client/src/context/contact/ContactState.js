import React, { useReducer } from 'react';

import axios from 'axios';

import ContactContenxt from './contactContext';
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get contacts
  const getContacts = async () => {
    try {
      const users = await axios.get('/api/contacts');

      dispatch({
        type: GET_CONTACTS,
        payload: users.data.contacts
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear contacts
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  // Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const user = await axios.post('/api/contacts', contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: user.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete contact
  const deleteContact = async id => {
    const config = {
      headers: {
        'Content-Type': 'application/text',
        'x-auth-token': localStorage.getItem('token')
      }
    };

    try {
      const res = await axios.delete(`/api/contacts/${id}`, config);

      console.log(res.data);

      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    };

    try {
      const user = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      console.log(user.data);

      dispatch({
        type: UPDATE_CONTACT,
        payload: user.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set current contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  // Clear current contact
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  // Filter contacts
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    });
  };

  // Clear filter
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <ContactContenxt.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        getContacts,
        clearContacts,
        deleteContact,
        setCurrent,
        updateContact,
        clearCurrent,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContenxt.Provider>
  );
};

export default ContactState;
