const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); // Import the middleware

// REGISTER (Secured)
router.post('/register', auth, async (req, res) => {
  try {
    // 1. Check how many users exist
    const userCount = await User.countDocuments();

    // 2. SECURITY CHECK:
    // If users exist AND the requester is NOT logged in, block them.
    if (userCount > 0 && !req.user) {
      return res.status(403).json("Admin already exists. You must login to create a new admin.");
    }

    // 3. Create the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN (Unchanged)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;