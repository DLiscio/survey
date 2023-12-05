var express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
var router = express.Router();
var User = require('../models/user');






// POST create a new user
router.post('/', async (req, res, next) => {
  try {
    // Check if required fields are present in the request body
    if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send('Missing required fields');
    }

    
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
      
    });

    await newUser.save();

    res.send('User created successfully');
  } catch (error) {
    next(error);
  }
});

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET a specific user by ID
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    // Find user
    const user = await User.findById(userId);

    // Update user fields
    user.username = username;
    user.email = email;
    user.password = password;

    // Save changes
    await user.save();

    res.send('User updated successfully');
  } catch (error) {
    next(error);
  }
});

// DELETE delete a user
router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Delete user by ID
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).send('User not found');
    }

    res.send('User deleted successfully');
  } catch (error) {
    next(error);
  }
});

// POST login user and generate JWT token
router.post('/login', async (req, res, next) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
          return res.status(401).send('Invalid email or password');
      }

      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
      res.json({ token, message: 'Login successful' });
  } catch (error) {
      next(error);
  }
});

// Protected routes with JWT verification middleware
router.use(authenticateToken);





module.exports = router;