import axios from 'axios'

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/pesansaran"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation"
}

export const pesansaranAPI = {
    /**
     * Mengambil semua pesan/saran
     * @returns {Promise<Array>} Daftar pesan/saran
     */
    async fetchAll() {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, created_at, nama, email, pesan',
                order: 'created_at.desc'
            }
        })
        return response.data
    },

    /**
     * Mengirim pesan/saran baru
     * @param {Object} data - Data saran baru {nama, email, pesan}
     * @returns {Promise<Object>} Saran yang baru dibuat
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
     * Menghapus saran berdasarkan ID
     * @param {number|string} id - ID saran yang akan dihapus
     */
    async delete(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },

    /**
     * Mengambil saran berdasarkan ID
     * @param {number|string} id - ID saran
     * @returns {Promise<Object>} Detail saran
     */
    async getById(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, {
            headers,
            params: {
                select: 'id, created_at, nama, email, pesan'
            }
        })
        return response.data[0]
    },

    /**
     * Mencari saran berdasarkan kata kunci
     * @param {string} keyword - Kata kunci pencarian
     * @returns {Promise<Array>} Hasil pencarian
     */
    async search(keyword) {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, created_at, nama, email, pesan',
                or: `(nama.ilike.%${keyword}%,email.ilike.%${keyword}%,pesan.ilike.%${keyword}%)`
            }
        })
        return response.data
    },

    /**
     * Mengambil saran berdasarkan email
     * @param {string} email - Email pengirim
     * @returns {Promise<Array>} Saran dari email tertentu
     */
    async getByEmail(email) {
        const response = await axios.get(`${API_URL}?email=eq.${email}`, {
            headers,
            params: {
                select: 'id, created_at, nama, email, pesan',
                order: 'created_at.desc'
            }
        })
        return response.data
    }
}