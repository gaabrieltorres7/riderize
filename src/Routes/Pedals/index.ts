import { Router } from 'express';
import { CreatePedalController, ShowPedalsController, FindPedalByAuthorController } from '../../Controllers/Pedals';
import { PedalRepository } from '../../Models/Pedals/Repositories/PedalRepository';
import { PrismaClient } from '@prisma/client';

const router = Router();

const prisma = new PrismaClient();
const pedalRepository = new PedalRepository(prisma);
const createPedalController = new CreatePedalController(pedalRepository);
const showPedalsController = new ShowPedalsController(pedalRepository);
const findPedalByAuthorController = new FindPedalByAuthorController(pedalRepository);

router.post('/create', (req, res) => createPedalController.handle(req, res));
router.get('/all', (req, res) => showPedalsController.handle(req, res));
router.get('/author', (req, res) => findPedalByAuthorController.handle(req, res));

export default router;
