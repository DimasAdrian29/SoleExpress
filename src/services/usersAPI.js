import axios from 'axios'

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/users"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation"
}

export const usersAPI = {
    /**
     * Mengambil semua pengguna
     * @returns {Promise<Array>} Daftar pengguna
     */
    async fetchAllUsers() {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, created_at, username, password, gmail, role',
                order: 'created_at.desc'
            }
        })
        return response.data
    },

    /**
     * Membuat pengguna baru
     * @param {Object} userData - Data pengguna baru
     * @returns {Promise<Object>} Pengguna yang baru dibuat
     */
    async createUser(userData) {
        const response = await axios.post(API_URL, userData, { 
            headers,
            params: {
                select: '*' // Mengembalikan semua kolom termasuk created_at
            }
        })
        return response.data[0]
    },

    /**
     * Menghapus pengguna berdasarkan ID
     * @param {number|string} id - ID pengguna yang akan dihapus
     */
    async deleteUser(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },

    /**
     * Mengambil pengguna berdasarkan ID
     * @param {number|string} id - ID pengguna
     * @returns {Promise<Object>} Detail pengguna
     */
    async getUserById(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, {
            headers,
            params: {
                select: 'id, created_at, username, password, gmail, role'
            }
        })
        return response.data[0]
    },

    /**
     * Mengupdate pengguna
     * @param {number|string} id - ID pengguna yang akan diupdate
     * @param {Object} updateData - Data pembaruan
     * @returns {Promise<Object>} Pengguna yang telah diupdate
     */
    async updateUser(id, updateData) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, updateData, {
            headers,
            params: {
                select: '*' // Mengembalikan data terupdate
            }
        })
        return response.data[0]
    },

    /**
     * Mengambil pengguna berdasarkan username
     * @param {string} username - Username pengguna
     * @returns {Promise<Object>} Detail pengguna
     */
    async getUserByUsername(username) {
        const response = await axios.get(`${API_URL}?username=eq.${username}`, {
            headers,
            params: {
                select: 'id, created_at, username, password, gmail, role',
                limit: 1
            }
        })
        return response.data[0]
    },

    /**
     * Mengambil pengguna berdasarkan email
     * @param {string} email - Email pengguna
     * @returns {Promise<Object>} Detail pengguna
     */
    async getUserByEmail(email) {
        const response = await axios.get(`${API_URL}?gmail=eq.${email}`, {
            headers,
            params: {
                select: 'id, created_at, username, password, gmail, role',
                limit: 1
            }
        })
        return response.data[0]
    },

    /**
     * Memeriksa kredensial login
     * @param {string} identifier - Username atau email
     * @param {string} password - Password
     * @returns {Promise<Object|null>} Data pengguna jika valid, null jika tidak
     */
    async login(identifier, password) {
        // Coba cari berdasarkan username
        let user = await this.getUserByUsername(identifier)
        
        // Jika tidak ditemukan, cari berdasarkan email
        if (!user) {
            user = await this.getUserByEmail(identifier)
        }
        
        // Verifikasi password jika pengguna ditemukan
        if (user && user.password === password) {
            return user
        }
        
        return null
    },

    /**
     * Mengubah password pengguna
     * @param {number|string} id - ID pengguna
     * @param {string} newPassword - Password baru
     * @returns {Promise<Object>} Pengguna yang telah diupdate
     */
    async changePassword(id, newPassword) {
        return this.updateUser(id, { password: newPassword })
    },

    /**
     * Mengubah role pengguna
     * @param {number|string} id - ID pengguna
     * @param {string} newRole - Role baru (admin/user/etc)
     * @returns {Promise<Object>} Pengguna yang telah diupdate
     */
    async changeUserRole(id, newRole) {
        return this.updateUser(id, { role: newRole })
    }
}