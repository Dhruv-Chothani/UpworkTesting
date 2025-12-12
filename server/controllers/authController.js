import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const signToken = (admin) =>
  jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(admin);
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    token,
    admin: { id: admin.id, email: admin.email },
  });
};

export const logout = (_req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

export const me = async (req, res) => {
  const admin = await Admin.findById(req.adminId).select('email createdAt');
  if (!admin) return res.status(401).json({ message: 'Invalid session' });
  res.json({ admin });
};

