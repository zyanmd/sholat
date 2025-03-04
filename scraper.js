import axios from 'axios';
import * as cheerio from 'cheerio';

export async function jadwalSholat(kota) {
    try {
        const {
            data
        } = await axios.get(`https://jadwal-sholat.tirto.id/kota-${kota}`);
        const $ = cheerio.load(data);
        const jadwalHariIni = $('tr.currDate td')
            .map((i, el) => $(el)
                .text())
            .get();

        if (jadwalHariIni.length === 7) {
            const [tanggal, subuh, duha, dzuhur, ashar, maghrib, isya] =
            jadwalHariIni;
            return {
                tanggal,
                subuh,
                duha,
                dzuhur,
                ashar,
                maghrib,
                isya
            };
        } else {
            return {
                error: 'Jadwal sholat tidak ditemukan'
            };
        }
    } catch (error) {
        return {
            error: 'Terjadi kesalahan saat mengambil data'
        };
    }
}
