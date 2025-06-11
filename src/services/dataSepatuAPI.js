import axios from 'axios';

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/data_sepatu";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation" // Untuk mendapatkan data setelah operasi
}

export const dataSepatuAPI = {
    /**
     * Mengambil semua sepatu
     * @returns {Promise<Array>} Daftar sepatu
     */
    async fetchAll() {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, name, img, brand, category, price, discount, rating, stock, tag1, tag2, tag3, length, width, height, upper_material, sole_material, lining_material, warranty, care_instructions, designed_for',
                order: 'id.asc' // Urutkan berdasarkan ID
            }
        });
        return response.data;
    },

    /**
     * Membuat sepatu baru
     * @param {Object} data - Data sepatu baru
     * @returns {Promise<Object>} Sepatu yang baru dibuat
     */
    async create(data) {
        const response = await axios.post(API_URL, data, { 
            headers,
            params: {
                select: '*' // Mengembalikan semua kolom termasuk ID
            }
        });
        return response.data[0];
    },

    /**
     * Menghapus sepatu berdasarkan ID
     * @param {number|string} id - ID sepatu yang akan dihapus
     */
    async delete(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    },

    /**
     * Mengambil sepatu berdasarkan ID
     * @param {number|string} id - ID sepatu
     * @returns {Promise<Object>} Detail sepatu
     */
    async getById(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, {
            headers,
            params: {
                select: 'id, name, img, brand, category, price, discount, rating, stock, tag1, tag2, tag3, length, width, height, upper_material, sole_material, lining_material, warranty, care_instructions, designed_for'
            }
        });
        return response.data[0];
    },

    /**
     * Mengupdate sepatu
     * @param {number|string} id - ID sepatu yang akan diupdate
     * @param {Object} updateData - Data pembaruan
     * @returns {Promise<Object>} Sepatu yang telah diupdate
     */
    async update(id, updateData) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, updateData, {
            headers,
            params: {
                select: '*' // Mengembalikan data terupdate
            }
        });
        return response.data[0];
    },

    /**
     * Mencari sepatu berdasarkan kata kunci nama
     * @param {string} keyword - Kata kunci pencarian
     * @returns {Promise<Array>} Hasil pencarian
     */
    async searchByName(keyword) {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, name, img, brand, category, price, discount, rating, stock, tag1, tag2, tag3, length, width, height, upper_material, sole_material, lining_material, warranty, care_instructions, designed_for',
                name: `ilike.%${keyword}%` // Pencarian case-insensitive
            }
        });
        return response.data;
    },

    /**
     * Mengambil sepatu terbaru (limit jumlah)
     * @param {number} limit - Jumlah sepatu yang diambil
     * @returns {Promise<Array>} Sepatu terbaru
     */
    async getLatest(limit = 5) {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, name, img, brand, category, price, discount, rating, stock, tag1, tag2, tag3, length, width, height, upper_material, sole_material, lining_material, warranty, care_instructions, designed_for',
                order: 'id.desc',
                limit: limit
            }
        });
        return response.data;
    },

    /**
     * Mengambil sepatu dengan paginasi
     * @param {number} page - Halaman saat ini
     * @param {number} pageSize - Jumlah item per halaman
     * @returns {Promise<Array>} Sepatu untuk halaman tertentu
     */
    async getPaginated(page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, name, img, brand, category, price, discount, rating, stock, tag1, tag2, tag3, length, width, height, upper_material, sole_material, lining_material, warranty, care_instructions, designed_for',
                order: 'id.asc',
                offset: offset,
                limit: pageSize
            }
        });
        return response.data;
    }
}
