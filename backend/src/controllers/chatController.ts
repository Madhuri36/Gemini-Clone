import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const generateChatResponse = async (req: Request, res: Response) => {
  try {
    const userInput = req.body.prompt;

    if (!userInput) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const contents = [
      {
        role: 'user',
        parts: [{ text: userInput }],
      },
    ];

    const model = 'gemini-2.0-flash';
    const config = {
      responseMimeType: 'text/plain',
    };

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let result = '';
    for await (const chunk of response) {
      result += chunk.text;
    }

    res.json({ response: result });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
