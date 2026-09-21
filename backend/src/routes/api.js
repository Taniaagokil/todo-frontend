import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { getTodos, createTodo } from '../controllers/todoController.js';
import { validateRegister, validateLogin, validateTodo } from '../middlewares/validator.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import express from 'express';
import cors from 'cors';
const router = Router();
const app = express();
app.use(cors());
app.use(express.json());
// Route utama cek apakah server berjalan
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Backend Todo Praktikum Berjalan Mulus!' });
});
// 404 Handler dipanggil jika tidak ada route yang cocok
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} tidak ditemukan!` });
});
// Global Error Handler menangkap error yang tidak tertangani
// Harus ada 4 parameter (err, req, res, next) agar Express mengenalinya sebagai error handler
app.use((err, req, res, next) => {
    console.error('Terjadi error', err.message);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
});
// AUTHENTICATION ROUTES
router.post('/auth/register', validateRegister, register);
router.post('/auth/login', validateLogin, login);
// TODO ROUTES (Protected)
router.get('/todos', verifyToken, getTodos);
router.post('/todos', verifyToken, validateTodo, createTodo);
export default router;
//# sourceMappingURL=api.js.map