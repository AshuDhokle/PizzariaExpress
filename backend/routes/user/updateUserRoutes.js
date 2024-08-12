import express from 'express';
import { addAddress, getAllAddress } from '../../controller/usersController.js';

const router = express.Router();

router.get('/getAllAddress',getAllAddress);

router.put('/addAddress',addAddress);

export default router