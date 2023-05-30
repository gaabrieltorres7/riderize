import { Router } from "express";
import { SubscriptionController, ListPedalsUserParticipatedController } from "../../Controllers/Subscriptions";
import { Authentication } from '../../Middlewares/';

export const router = Router();

router.use(Authentication);

router.post("/subscribe/:ride_id", (req, res) => SubscriptionController(req, res));
router.get("/listParticipation", (req, res) => ListPedalsUserParticipatedController(req, res));

export default router;
