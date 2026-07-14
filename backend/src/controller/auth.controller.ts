import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth.middleware';

// =======================
// Login
// =======================
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Read request body
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and Password are required',
      });
      return;
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      res.status(401).json({
        success: false,
        message: 'Invalid Password',
      });
      return;
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '7d',
      }
    );

    // Success Response
    res.status(200).json({
      success: true,
      message: 'Login Successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Login Error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// =======================
// Register
// =======================
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Read request body
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password || !role) {
      res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
      return;
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Success response
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register Error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// =======================
// Profile
// =======================
export const profile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Profile Error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
