const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');


exports.register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400); // Bad Request
        throw new Error('User with that email already exists');
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    if (user) {
        // Generate JWT
        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check for user by email
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401); // Unauthorized
        throw new Error('Invalid email or password');
    }
    
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
});

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});