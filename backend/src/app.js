import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
const app = express();
app.use(cors());
app.use(express.json());
console.log("SERVER BARU SUDAH NYALA!");
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Backend Todo Praktikum Berjalan Mulus!' });
});
app.use('/api', apiRoutes);
// 404 Handler dipanggil jika tidak ada route yang cocok
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} tidak ditemukan!` });
});
export default app;
//# sourceMappingURL=app.js.map