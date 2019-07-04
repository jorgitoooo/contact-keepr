const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', async (req, res) => {});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ msg: 'User with email ' + email + ' does not exist' });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ msg: 'Incorrect password' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
