import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ success: false, message: 'Akses ditolak. Token tidak ditemukan!' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(403).json({ success: false, message: 'Sesi tidak valid atau kedaluwarsa!' });
    }
};
//# sourceMappingURL=authMiddleware.js.map