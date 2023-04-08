import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { CreateUserController, GetUserController, GetAllUsersController } from "../../Controllers/Users";
import { UserRepository } from "../../Models/Users/Repositories/UserRepository";

export const router = Router();

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const createUserController = new CreateUserController(userRepository);
const getUserController = new GetUserController(userRepository);
const getAllUsersController = new GetAllUsersController(userRepository);

router.get("/all", (req, res) => getAllUsersController.handle(req, res));
router.get("/:id", (req, res) => getUserController.handle(req, res));
router.post("/create", (req, res) => createUserController.handle(req, res));

export default router;


