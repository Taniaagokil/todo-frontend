import { Router } from 'express';
import { validateTodo, validateUpdateTodo } from '../middlewares/validator.js';
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';
const router = Router();

// GET /api/todos Ambil semua todo milik user
router.get('/:id', getTodos);
router.get('/:id', getTodoById);
// POST /api/todos Tambah todo baru
router.post('/:id', validateTodo, createTodo);

// PUT /api/todos/:id Update todo (task atau status selesai)
router.put('/:id', validateUpdateTodo, updateTodo);

// DELETE /api/todos/:id - Hapus todo
router.delete('/:id', deleteTodo);

export default router;