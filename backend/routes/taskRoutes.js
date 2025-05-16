import express from 'express';
import authenticateUser from '../middleware/authMiddleware.js';
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();
router.use(authenticateUser);
router.route('/').get(getTasks).post(addTask);
router.route('/:id').put(updateTask).delete(deleteTask);

export default router;
