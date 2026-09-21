import pool from '../config/db.js';
export const TodoModel = {
    getByUserId: async (userId) => {
        const [rows] = await pool.query('SELECT * FROM todos WHERE user_id = ?', [userId]);
        return rows;
    },
    getById: async (id, userId) => {
        const [rows] = await pool.query('SELECT * FROM todos WHERE id = ? AND user_id = ?', [id, userId]);
        return rows[0]; // Kembalikan 1 data, atau undefined jika tidak ditemukan
    },
    create: async (userId, task) => {
        const [result] = await pool.query('INSERT INTO todos (user_id, task) VALUES (?, ?)', [userId, task]);
        return result.insertId;
    },
    // Update task atau status is_completed
    update: async (id, task, isCompleted, userId) => {
        const [result] = await pool.query('UPDATE todos SET task = ?, is_completed = ? WHERE id = ? AND user_id = ?', [task, isCompleted, id, userId]);
        return result.affectedRows;
    },
    // Hapus todo berdasarkan id dan user Id
    delete: async (id, userId) => {
        const [result] = await pool.query('DELETE FROM todos WHERE id = ? AND user_id = ?', [id, userId]);
        return result.affectedRows;
    }
};
//# sourceMappingURL=todoModel.js.map