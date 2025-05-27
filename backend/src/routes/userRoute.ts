import {Router } from 'express';
import { getAllUsers, userLogin, userSignup, verifyUser, logoutUser } from '../controllers/userController.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';
import { verifyToken } from '../utils/tokenManager.js';
import { COOKIE_NAME } from '../utils/constants.js';

const userRoute = Router();

userRoute.get("/",getAllUsers);
userRoute.post("/signup",validate(signupValidator) ,userSignup);
userRoute.post("/login",validate(loginValidator) ,userLogin);
userRoute.get("/auth-status", verifyToken, verifyUser);
userRoute.post("/logout", logoutUser);

export default userRoute;