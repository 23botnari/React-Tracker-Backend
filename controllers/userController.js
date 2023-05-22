import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import User from "../models/User.js";
import e from "express";

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(404).json({
        message: "Invalid username/password!",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "SecretKey3000",
      {
        expiresIn: "5d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Authentification failed.",
    });
  }
};
export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      passwordHash: hash,
      role: req.body.role,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "SecretKey3000",
      {
        expiresIn: "5d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Register Failed.",
    });
  }
};

export const authme1 = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found.",
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No access.",
    });
  }
};

export const authme = async (req, res) => {
  console.log(req.userId)
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found.",
      });
    }
    const { name, ...userData } = user._doc; // Assuming username is a property in your User model
    res.json({ name, ...userData }); // Include the username in the response
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No access.",
    });
  }
};
export const checkAuth = async (req, res) => {
  try {
    // Retrieve the user's role based on the authenticated user ID
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Return the user's role in the response
    res.json({
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Middleware function to protect routes that require authentication
export const protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, "SecretKey3000");

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorizeda",
    });
  }
};

