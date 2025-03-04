import express from 'express';
import { jadwalSholat } from './scraper.js'; // Simpan kode scrapper di scraper.js

const app = express();
const PORT = 3000;

// Middleware untuk menggunakan static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Endpoint untuk mengambil jadwal sholat
app.get('/jadwal/:kota', async (req, res) => {
    const { kota } = req.params;
    const data = await jadwalSholat(kota);
    res.json(data);
});

// Jalankan server di Vercel
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  
  export default app;
