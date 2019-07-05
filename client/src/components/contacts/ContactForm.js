import React, { useState, useContext } from 'react';

import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const {
    addContact,
    current,
    setCurrent,
    updateContact,
    clearCurrent
  } = contactContext;

  const initialContact = {
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  };

  const [contact, setContact] = useState(initialContact);

  const { name, email, phone, type } = contact;

  const onChange = e =>
    current
      ? setCurrent({ ...current, [e.target.name]: e.target.value })
      : setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    current ? updateContact(current) : addContact(contact);
    clearCurrent();
    setContact(initialContact);
  };

  const onClear = () => {
    setCurrent({ id: current.id, ...initialContact });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={current ? current.name : name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={current ? current.email : email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={current ? current.phone : phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={current ? current.type === 'personal' : type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={
          current ? current.type === 'professional' : type === 'professional'
        }
        onChange={onChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value={(current ? 'Edit' : 'Add') + ' Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <p className='btn btn-danger btn-block text-center' onClick={onClear}>
            Clear
          </p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
