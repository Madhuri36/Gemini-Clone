import {Router } from 'express';
import userRoute from './userRoute.js';
import chatRoute from './chatRoutes.js';
const appRouter = Router();

appRouter.use("/user", userRoute); //domain.com/api/v1/user
appRouter.use("/chats", chatRoute); //domain.com/api/v1/chats
export default appRouter;

