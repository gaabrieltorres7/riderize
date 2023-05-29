import { Router } from 'express';
import { Authentication } from '../../Middlewares/Authentication';
import { CreatePedalController, ShowPedalsController, FindPedalByAuthorController } from '../../Controllers/Pedals';

const router = Router();

router.use(Authentication);

router.post('/create', (req, res) => CreatePedalController(req, res));
router.get('/all', (req, res) => ShowPedalsController(req, res));
router.get('/author', (req, res) => FindPedalByAuthorController(req, res));

export default router;
