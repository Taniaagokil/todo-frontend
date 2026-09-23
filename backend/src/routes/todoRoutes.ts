import { Router } from 'express';
import { validateTodo, validateUpdateTodo } from '../middlewares/validator.js';
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

// GET /api/todos - Ambil semua todo milik user (pakai '/')
router.get('/', verifyToken, getTodos);

// GET /api/todos/:id - Ambil spesifik 1 todo berdasarkan ID
router.get('/:id', verifyToken, getTodoById);

// POST /api/todos - Tambah todo baru (pakai '/')
router.post('/', verifyToken, validateTodo, createTodo);

// PUT /api/todos/:id - Update todo
router.put('/:id', verifyToken, validateUpdateTodo, updateTodo);

// DELETE /api/todos/:id - Hapus todo
router.delete('/:id', verifyToken, deleteTodo);

export default router;