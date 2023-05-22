const router = require('express').Router();
const User = require('../Models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./verifyToken');

// Register
router.post('/register', async (req, res) => {
  // Check that all inputs are completed
  if (req.body.username === '' || req.body.password == '' || req.body.email === '') {
    return res.status(404).json('All inputs must be completed');
  }

  // Check that there are no existing users with the given username or email
  const existingUsername = await User.countDocuments({ username: req.body.username });
  const existingEmail = await User.countDocuments({ email: req.body.email });
  if (existingUsername > 0 || existingEmail > 0) {
    return res.status(401).json('There are already users registered with that data');
  }

  // Encrypt the password before saving the new user
  const encryptedPassword = CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET);

  // Create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: encryptedPassword,
  });

  try {
    // Save the new user to the database
    let savedUser = await newUser.save();
    res.status(201).json({ success: 'User Created!', username: savedUser.username });
    console.log(`User created: ${savedUser.username}`);
  } catch (error) {
    // Handle any errors that occur while saving the user
    res.status(500).json('There was an error:' + error);
  }
});

// Login
// Login
router.post('/login', async (req, res) => {
  try {
    // Find the user with the given username
    const user = await User.findOne({ username: req.body.username });

    // Return an error if the user doesn't exist
    if (!user) {
      return res.status(401).json('Please review your credentials and enter again');
    }

    // Decrypt the user's password
    const decryptedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASSWORD_SECRET).toString(CryptoJs.enc.Utf8);

    // Return an error if the passwords don't match
    if (decryptedPassword !== req.body.password) {
      return res.status(401).json('Please review your credentials and enter again');
    }

    // Generate an access token for the user and set the expiration time of the JWT code to 3 days
    const accessToken = jwt.sign(
      {
        id: user._id,
        admin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    // Return the user's public data and the access token
    const publicData = { ...user._doc };
    delete publicData.password; // Remove password from the public data
    res.status(200).json({ userInfo: publicData, token: accessToken });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json('Sorry, there has been an internal server error');
    console.log('An error occurred');
  }
});

module.exports = router;
