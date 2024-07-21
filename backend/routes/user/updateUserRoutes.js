import express from 'express';
import { addAddress } from '../../controller/usersController.js';

const router = express.Router();

router.put('/addAddress',addAddress);

export default router