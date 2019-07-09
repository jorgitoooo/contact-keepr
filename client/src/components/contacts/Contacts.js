import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contact/contactContext';

import Spinner from '../layout/Spinner';

import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4 className='text-center'>No Contacts</h4>;
  }

  return (
    <Fragment>
      {loading || contacts === null ? (
        <Spinner />
      ) : (
        <TransitionGroup>
          {filtered === null
            ? contacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : filtered.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      )}
    </Fragment>
  );
};

export default Contacts;
