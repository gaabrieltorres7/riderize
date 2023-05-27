import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { CreateUserController, GetUserController, GetAllUsersController, LoginUserController, GetProfileController, RefreshTokenController } from "../../Controllers/Users";
import { PrismaUserRepository } from "../../../Repositories/Prisma/Prisma-UserRepository";
import { Authentication } from '../../Middlewares/'; 

export const router = Router();

const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const getUserController = new GetUserController(userRepository);
const loginUserController = new LoginUserController(userRepository);
const refreshTokenController = new RefreshTokenController(userRepository);


router.post("/login", (req, res) => loginUserController.handle(req, res));
router.post("/refresh-token", (req, res) => refreshTokenController.handle(req, res));
router.post("/create", (req, res) => CreateUserController(req, res));

router.use(Authentication);

router.get("/all", (req, res) => GetAllUsersController(req, res));
router.get("/profile", (req, res) => GetProfileController(req, res));
router.get("/:id", (req, res) => getUserController.handle(req, res));

export default router;
