import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
// 1. Tambahkan import updateTodo dan deleteTodo dari controller
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js'; 
import { validateRegister, validateLogin, validateTodo } from '../middlewares/validator.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import todoRoutes from './todoRoutes.js';
import authRoutes from './authRoutes.js';
const router = Router();
router.use('/auth', authRoutes);
router.use('/todos', todoRoutes)
// AUTHENTICATION ROUTES
router.post('/auth/register', validateRegister, register);
router.post('/auth/login', validateLogin, login);

// TODO ROUTES (Protected)
router.get('/todos', verifyToken, getTodos);
router.post('/todos', verifyToken, validateTodo, createTodo);

// 2. Tambahkan 2 rute ini yang sebelumnya hilang:
router.put('/todos/:id', verifyToken, updateTodo);
router.delete('/todos/:id', verifyToken, deleteTodo);
router.use('/todos', verifyToken, todoRoutes);
export default router;