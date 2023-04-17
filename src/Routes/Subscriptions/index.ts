import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { CreateSubscriptionController } from "../../Controllers/Subscriptions";
import { SubscriptionsRepository } from "../../Models/Subscriptions/Repositories/SubscriptionsRepository";
import { PedalRepository } from "../../Models/Pedals/Repositories/PedalRepository";
import { Authentication } from '../../Middlewares/';

export const router = Router();

const prisma = new PrismaClient();
const pedalRepository = new PedalRepository(prisma);
const subscriptionsRepository = new SubscriptionsRepository(prisma);
const createSubscriptionController = new CreateSubscriptionController(subscriptionsRepository, pedalRepository);

router.use(Authentication);

router.post("/subscribe", (req, res) => createSubscriptionController.handle(req, res));

export default router;
