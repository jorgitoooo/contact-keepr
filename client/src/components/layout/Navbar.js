import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        {!authContext.isAuthenticated && (
          <li>
            <Link to='/register'>Register</Link>
          </li>
        )}
        {!authContext.isAuthenticated && (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
        {authContext.isAuthenticated && (
          <li>
            <Link to='/logout'>Logout</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contact Keepr',
  icon: 'fas fa-id-card-alt'
};
export default Navbar;
