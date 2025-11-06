import express from 'express';
import { getNotas, addNota, mediaAluno } from '../controllers/notasController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', getNotas);
router.post('/', addNota);
router.get('/:nomeAluno/media', mediaAluno);

export default router;
