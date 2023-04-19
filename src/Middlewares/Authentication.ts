import { UserRepository } from "../Models/Users/Repositories/UserRepository";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../Errors/AppError";

type jwtPayload = {
  id: number;
};

export function Authentication(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError("Token not provided", 401);
  }

  try {
    const [, token] = authorization.split(" ");
    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? "") as jwtPayload;

    const prisma = new PrismaClient();
    const userRepository = new UserRepository(prisma);
    const user = userRepository.findById(id);

    if (!user) {
      throw new AppError("Invalid Token", 401);
    }

    req.user = {
      id: id
    }

    return next();
  } catch (error) {
    throw new AppError(error.message, 401);
  }
}
