import axios from 'axios'

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/artikel"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation" // Untuk mendapatkan data setelah operasi
}

export const artikelAPI = {
    /**
     * Mengambil semua artikel
     * @returns {Promise<Array>} Daftar artikel
     */
    async fetchAll() {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, created_at, url_image, judul, isi',
                order: 'created_at.desc' // Urutkan dari yang terbaru
            }
        })
        return response.data
    },

    /**
     * Membuat artikel baru
     * @param {Object} data - Data artikel baru {url_image, judul, isi}
     * @returns {Promise<Object>} Artikel yang baru dibuat
     */
    async create(data) {
        const response = await axios.post(API_URL, data, { 
            headers,
            params: {
                select: '*' // Mengembalikan semua kolom termasuk created_at
            }
        })
        return response.data[0]
    },

    /**
     * Menghapus artikel berdasarkan ID
     * @param {number|string} id - ID artikel yang akan dihapus
     */
    async delete(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },

    /**
     * Mengambil artikel berdasarkan ID
     * @param {number|string} id - ID artikel
     * @returns {Promise<Object>} Detail artikel
     */
    async getById(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, {
            headers,
            params: {
                select: 'id, created_at, url_image, judul, isi'
            }
        })
        return response.data[0]
    },

    /**
     * Mengupdate artikel
     * @param {number|string} id - ID artikel yang akan diupdate
     * @param {Object} updateData - Data pembaruan
     * @returns {Promise<Object>} Artikel yang telah diupdate
     */
    async update(id, updateData) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, updateData, {
            headers,
            params: {
                select: '*' // Mengembalikan data terupdate
            }
        })
        return response.data[0]
    },

    /**
     * Mencari artikel berdasarkan kata kunci judul
     * @param {string} keyword - Kata kunci pencarian
     * @returns {Promise<Array>} Hasil pencarian
     */
    async searchByTitle(keyword) {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, created_at, url_image, judul, isi',
                judul: `ilike.%${keyword}%` // Pencarian case-insensitive
            }
        })
        return response.data
    },

    /**
     * Mengambil artikel terbaru (limit jumlah)
     * @param {number} limit - Jumlah artikel yang diambil
     * @returns {Promise<Array>} Artikel terbaru
     */
    async getLatest(limit = 5) {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, created_at, url_image, judul, isi',
                order: 'created_at.desc',
                limit: limit
            }
        })
        return response.data
    },

    /**
     * Mengambil artikel dengan paginasi
     * @param {number} page - Halaman saat ini
     * @param {number} pageSize - Jumlah item per halaman
     * @returns {Promise<Array>} Artikel untuk halaman tertentu
     */
    async getPaginated(page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, created_at, url_image, judul, isi',
                order: 'created_at.desc',
                offset: offset,
                limit: pageSize
            }
        })
        return response.data
    }
}