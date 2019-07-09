const express = require('express');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json({ contacts });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const contact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type
      });

      await contact.save();

      res.json(contact);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to modify contact' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/contacts
// @desc    Delete contact
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to modify contact' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.send('Contact removed');
  } catch (err) {
    res.status(500).send('Server error');
  }
});
module.exports = router;
