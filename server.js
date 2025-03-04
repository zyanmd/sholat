import express from 'express';
import cors from 'cors';
import { jadwalSholat } from './scraper.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Mengizinkan akses dari domain lain
app.use(express.static('public'));

// Route utama
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Endpoint untuk mengambil jadwal sholat berdasarkan kota
app.get('/jadwal/:kota', async (req, res) => {
    const { kota } = req.params;
    console.log(`📌 Memproses permintaan jadwal sholat untuk kota: ${kota}`);

    try {
        const data = await jadwalSholat(kota);

        if (data.error) {
            return res.status(404).json({ error: data.error });
        }

        res.json(data);
    } catch (error) {
        console.error("❌ Error mengambil data:", error.message);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

// Ekspor untuk Vercel
export default app;
