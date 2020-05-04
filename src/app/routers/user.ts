import { Router } from 'express';
import * as userController from '../controllers/user';

export const router: Router = Router({mergeParams: true});

router.get('/user', userController.index);
router.post('/user', userController.create); // Create
router.get('/user/:id', userController.show); // Read
router.put('/user/:id', userController.update); // Update
router.delete('/user/:id', userController.destroy); // Delete