import { Router } from 'express';
import { Authentication } from '../../Middlewares/Authentication';
import { CreatePedalController, ShowPedalsController, FindPedalByAuthorController } from '../../Controllers/Pedals';
import { PrismaPedalRepository } from '../../../Repositories/Prisma/Prisma-PedalRepository';
import { PrismaClient } from '@prisma/client';

const router = Router();

const prisma = new PrismaClient();
const pedalRepository = new PrismaPedalRepository(prisma);
const createPedalController = new CreatePedalController(pedalRepository);
const findPedalByAuthorController = new FindPedalByAuthorController(pedalRepository);

router.use(Authentication);

router.post('/create', (req, res) => createPedalController.handle(req, res));
router.get('/all', (req, res) => ShowPedalsController(req, res));
router.get('/author', (req, res) => findPedalByAuthorController.handle(req, res));

export default router;
