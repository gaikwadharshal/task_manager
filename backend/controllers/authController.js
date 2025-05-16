import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, { httpOnly: true }).json({ message: 'User registered' });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Set cookie and respond with user info (omit sensitive info like password)
    res
        .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // use secure cookie in prod
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        .status(200)
        .json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                // add other safe user fields if needed
            },
        });
};


export const logout = (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out' });
};

export const getMe = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
