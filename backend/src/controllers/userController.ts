import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constants.js";

const isProd = process.env.NODE_ENV === "production";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({ message: "ok", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User already exists");
    }

    const hashedPassword = await hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: isProd,
      expires,
      signed: true,
      path: "/",
      sameSite: isProd ? "none" : "lax",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      secure: isProd,
      expires,
      httpOnly: true,
      signed: true,
      sameSite: isProd ? "none" : "lax",
    });

    return res.status(201).json({ message: "ok", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).send("Invalid password");
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: isProd,
      expires,
      signed: true,
      path: "/",
      sameSite: isProd ? "none" : "lax",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      secure: isProd,
      expires,
      httpOnly: true,
      signed: true,
      sameSite: isProd ? "none" : "lax",
    });

    return res.status(200).json({ message: "ok", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findById(res.locals.jwtData.id);
    if (!user || user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("User not found or token invalid");
    }

    return res.status(200).json({ message: "ok", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: isProd,
      path: "/",
      signed: true,
      sameSite: isProd ? "none" : "lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
