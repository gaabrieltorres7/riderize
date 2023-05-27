import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { CreateUserController, GetUserController, GetAllUsersController, LoginUserController, GetProfileController, RefreshTokenController } from "../../Controllers/Users";
import { PrismaUserRepository } from "../../../Repositories/Prisma/Prisma-UserRepository";
import { Authentication } from '../../Middlewares/';

export const router = Router();

const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const createUserController = new CreateUserController();
const getUserController = new GetUserController(userRepository);
const getAllUsersController = new GetAllUsersController(userRepository);
const loginUserController = new LoginUserController(userRepository);
const getProfileController = new GetProfileController(userRepository);
const refreshTokenController = new RefreshTokenController(userRepository);


router.post("/login", (req, res) => loginUserController.handle(req, res));
router.post("/refresh-token", (req, res) => refreshTokenController.handle(req, res));
router.post("/create", (req, res) => createUserController.handle(req, res));

router.use(Authentication);

router.get("/all", (req, res) => getAllUsersController.handle(req, res));
router.get("/profile", (req, res) => getProfileController.handle(req, res));
router.get("/:id", (req, res) => getUserController.handle(req, res));

export default router;
