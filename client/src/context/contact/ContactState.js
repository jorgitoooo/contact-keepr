import React, { useReducer } from 'react';
import uuid from 'uuid';

import ContactContenxt from './contactContext';
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jorge Garcia',
        email: 'jlg@gmail.com',
        phone: '111-111-1111',
        type: 'professional'
      },
      {
        id: 2,
        name: 'Sophie Vega',
        email: 'scv@gmail.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Alana Hollander',
        email: 'abh@gmail.com',
        phone: '333-333-3333',
        type: 'personal'
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact

  // Delete contact

  // Update contact

  // Set current contact

  // Clear current contact

  // Filter contacts

  // Clear filter

  return (
    <ContactContenxt.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContenxt.Provider>
  );
};

export default ContactState;
