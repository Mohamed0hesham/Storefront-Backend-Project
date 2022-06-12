import express from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!.split(" ")[1];
    const decoded = Jwt.verify(token, process.env.TOKEN_SECRET!);

    next();
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

export default verifyAuthToken;
