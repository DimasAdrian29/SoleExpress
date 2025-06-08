import axios from 'axios'

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/faq"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation" // Untuk mendapatkan data setelah insert/update
}

export const faqAPI = {
    /**
     * Mengambil semua FAQ
     * @returns {Promise<Array>} Daftar FAQ
     */
    async fetchAllFAQ() {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, pertanyaan, jawaban, created_at',
                order: 'created_at.desc' // Urutkan dari yang terbaru
            }
        })
        return response.data
    },

    /**
     * Membuat FAQ baru
     * @param {Object} faqData - Data FAQ baru (harus mengandung: pertanyaan, jawaban)
     * @returns {Promise<Object>} FAQ yang baru dibuat
     */
    async createFAQ(faqData) {
        const response = await axios.post(API_URL, faqData, { 
            headers,
            params: {
                select: '*' // Mengembalikan semua kolom termasuk created_at
            }
        })
        return response.data[0]
    },

    /**
     * Menghapus FAQ berdasarkan ID
     * @param {number|string} id - ID FAQ yang akan dihapus
     */
    async deleteFAQ(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },

    /**
     * Mengambil FAQ berdasarkan ID
     * @param {number|string} id - ID FAQ
     * @returns {Promise<Object>} Detail FAQ
     */
    async getFAQById(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, {
            headers,
            params: {
                select: 'id, pertanyaan, jawaban, created_at'
            }
        })
        return response.data[0]
    },

    /**
     * Mengupdate FAQ
     * @param {number|string} id - ID FAQ yang akan diupdate
     * @param {Object} updateData - Data pembaruan (bisa berisi: pertanyaan, jawaban)
     * @returns {Promise<Object>} FAQ yang telah diupdate
     */
    async updateFAQ(id, updateData) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, updateData, {
            headers,
            params: {
                select: 'id, pertanyaan, jawaban, created_at'
            }
        })
        return response.data[0]
    },

    /**
     * Mencari FAQ berdasarkan kata kunci dalam pertanyaan atau jawaban
     * @param {string} keyword - Kata kunci pencarian
     * @returns {Promise<Array>} Hasil pencarian
     */
    async searchFAQ(keyword) {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, pertanyaan, jawaban, created_at',
                or: `(pertanyaan.ilike.%${keyword}%,jawaban.ilike.%${keyword}%)`
            }
        })
        return response.data
    }
}