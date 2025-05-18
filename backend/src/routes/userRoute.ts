import {Router } from 'express';
import { getAllUsers, userLogin, userSignup, verifyUser } from '../controllers/userController.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';
import { verifyToken } from '../utils/tokenManager.js';
import { COOKIE_NAME } from '../utils/constants.js';

const userRoute = Router();

userRoute.get("/",getAllUsers);
userRoute.post("/signup",validate(signupValidator) ,userSignup);
userRoute.post("/login",validate(loginValidator) ,userLogin);
userRoute.get("/auth-status", verifyToken, verifyUser);

userRoute.post("/logout", (req, res) => {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost", // adjust for production
      path: "/",
      signed: true,
    });
    return res.status(200).json({ message: "Logged out successfully" });
  });
  

export default userRoute;