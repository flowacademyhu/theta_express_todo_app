import { Router } from 'express';
import * as todoController from '../controllers/todo';

export const router: Router = Router({mergeParams: true});

router.get('/todo', todoController.index);
router.post('/todo', todoController.create); // Create
router.get('/todo/:id', todoController.show); // Read
router.put('/todo/:id', todoController.update); // Update
router.delete('/todo/:id', todoController.destroy); // Delete