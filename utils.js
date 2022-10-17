const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user[0]._id,
      name: user[0].name,
      email: user[0].email,
      isAdmin: user[0].isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '3d',
    }
  );
};
module.exports = generateToken;
