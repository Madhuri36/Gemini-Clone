import { Router } from 'express';
import { generateChatResponse } from '../controllers/chatController.js';

const chatRoute = Router();

chatRoute.post('/', generateChatResponse);

export default chatRoute;
