const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');
const CryptoJs = require('crypto-js');
const User = require('../Models/User');
const { verifyToken, verifyAuthorization } = require('../Middlewares/verifyToken');

// Get user by ID
router.get('/:id', verifyAuthorization, verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...userPublicInfo } = user._doc;
    res.status(200).json(userPublicInfo);
  } catch (error) {
    res.status(403).json('There has been an error');
  }
});

// Get parameters for cocos_username and cocos_password
router.get('/parameters', verifyAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      const { cocos_username, cocos_password } = user;
      if (cocos_username && cocos_password) {
        const parameters = { cocos_username, cocos_password };
        return res.status(200).json(parameters);
      }
    }
    res.status(200).json('Please add your credentials in the config section');
  } catch (error) {
    res.status(403).json('There has been an error');
  }
});

// Update user by ID
router.put('/:id', verifyAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET.toString());
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(`User updated successfully: ${updatedUser}`);
  } catch (error) {
    res.status(403).json('There has been an error');
  }
});

// Update username by ID
router.put('/:id/username', verifyAuthorization, async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.body.username }, { username: true });
    if (userExists) {
      throw {
        status: 401,
        json: {
          status: 'Failed',
          message: 'We are sorry but that username already exists',
          data: null,
        },
      };
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: { username: req.body.username } }, { new: false });
    res.status(200).json({
      status: 'Success',
      message: 'Username has been modified!',
      data: updatedUser,
    });
  } catch (error) {
    throw {
      status: 401,
      json: {
        status: 'Failed',
        message: "We are sorry but we couldn't modify your username. Please try again later",
        data: null,
      },
    };
  }
});

module.exports = router;
