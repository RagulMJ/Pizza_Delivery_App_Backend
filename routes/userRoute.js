const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils.js');
const expressAsyncHandler = require('express-async-handler');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
  });

  try {
    await newUser.save();
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
      if (bcrypt.compareSync(password, user.password)) {
        res.send({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
          token: jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '30d',
            }
          ),
        });
        return;
      }
    } else {
      return res.status(400).json({ message: 'User Login Failed' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong here' });
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
