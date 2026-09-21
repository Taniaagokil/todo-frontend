import { TodoModel } from '../models/todoModel.js';
export const getTodos = async (req, res) => {
    const userId = res.locals.userId; // Ambil dari res.locals
    try {
        const todos = await TodoModel.getByUserId(userId);
        res.status(200).json({ success: true, data: todos });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Gagal mengambil data.' });
    }
};
// GET /api/todos/:id Ambil satu todo berdasarkan ID
export const getTodoById = async (req, res) => {
    const { id } = req.params;
    const userId = res.locals.userId;
    try {
        // Ambil id dari URL, contoh: /todos/14 id = "14"
        const todo = await TodoModel.getById(Number(id), userId);
        // Jika undefined, berarti todo tidak ditemukan atau bukan milik user ini
        if (!todo) {
            res.status(404).json({ success: false, message: 'Tugas tidak ditemukan!' });
            return;
        }
        res.status(200).json({ success: true, data: todo });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Gagal mengambil data.' });
    }
};
export const createTodo = async (req, res) => {
    const { task } = req.body;
    const userId = res.locals.userId; // Ambil dari res.locals
    try {
        const newId = await TodoModel.create(userId, task);
        res.status(201).json({
            success: true,
            message: 'Tugas berhasil ditambahkan!',
            data: { id: newId, task, is_completed: false }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Gagal menambahkan tugas.' });
    }
};
// PUT /api/todos/:id Update todo (ubah task atau tandai selesai)
export const updateTodo = async (req, res) => {
    // id todo dari URL
    const { id } = req.params;
    const { task, is_completed } = req.body;
    const userId = res.locals.userId;
    try {
        const affectedRows = await TodoModel.update(Number(id), task, is_completed, userId);
        // Jika affectedRows === 0, berarti todo tidak ditemukan atau bukan milik user ini
        if (affectedRows === 0) {
            res.status(404).json({ success: false, message: 'Tugas tidak ditemukan!' });
            return;
        }
        res.status(200).json({ success: true, message: 'Tugas berhasil diperbarui!' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Gagal memperbarui tugas.' });
    }
};
// DELETE /api/todos/:id Hapus todo
export const deleteTodo = async (req, res) => {
    // id todo dari URL
    const { id } = req.params;
    const userId = res.locals.userId;
    try {
        const affectedRows = await TodoModel.delete(Number(id), userId);
        // Jika affectedRows === 0, berarti todo tidak ditemukan atau bukan milik user ini
        if (affectedRows === 0) {
            res.status(404).json({ success: false, message: 'Tugas tidak ditemukan!' });
            return;
        }
        res.status(200).json({ success: true, message: 'Tugas berhasil dihapus!' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Gagal menghapus tugas.' });
    }
};
//# sourceMappingURL=todoController.js.map