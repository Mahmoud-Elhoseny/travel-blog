import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  const userExists = await User.findOne({ where: { fullName, email } });
  if (!fullName || !email || !password) {
    res.status(400).json({ error: 'Please fill in all fields' });
    return;
  }
  if (userExists) {
    res
      .status(400)
      .json({ error: 'User already exists', message: 'User already exists' });
    return;
  }

  try {
    const user = await User.create({
      fullName,
      email,
      password: bcrypt.hashSync(password, 8),
      createdAt: new Date(),
    });
    await user.save();
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '72h',
    });
    res.status(201).json({
      user,
      token,
      message: 'User created successfully',
      error: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' });
    return;
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    res.status(401).json({ error: 'Invalid password' });
    return;
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '72h',
  });
  res.status(200).json({
    user,
    token,
    message: 'User logged in successfully',
    error: false,
  });
};

export const getUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  return res.json({ user, error: false, message: 'User found' });
};
