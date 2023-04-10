import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { CreateUserController, GetUserController, GetAllUsersController, LoginUserController } from "../../Controllers/Users";
import { UserRepository } from "../../Models/Users/Repositories/UserRepository";
import { Authentication } from '../../Middlewares/Authentication';

export const router = Router();

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const createUserController = new CreateUserController(userRepository);
const getUserController = new GetUserController(userRepository);
const getAllUsersController = new GetAllUsersController(userRepository);
const loginUserController = new LoginUserController(userRepository);
// const getMeController = new GetMeController(userRepository);


router.post("/login", (req, res) => loginUserController.handle(req, res));

router.use(Authentication);

router.get("/all", (req, res) => getAllUsersController.handle(req, res));
router.post("/create", (req, res) => createUserController.handle(req, res));
router.get("/:id", (req, res) => getUserController.handle(req, res));
// router.get("/profile", (req, res) => getMeController.handle(req, res));

export default router;
