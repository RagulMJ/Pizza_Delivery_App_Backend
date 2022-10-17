const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/userModel');
const { generateToken } = require('../utils.js');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
  });

  try {
    const user = await newUser.save();
    res.send('User Registered successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
        token: generateToken(user),
      };
      res.send(currentUser);
    } else {
      return res.status(400).json({ message: 'User Login Failed' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
});

router.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post('/deleteuser', async (req, res) => {
  const userid = req.body.userid;

  try {
    await User.findOneAndDelete({ _id: userid });
    res.send('User Deleted Successfully');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
