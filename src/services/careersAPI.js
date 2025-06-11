import axios from 'axios';

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/careers";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation"
};

// Daftar semua kolom yang didefinisikan secara eksplisit
const ALL_COLUMNS = [
    'id',
    'title',
    'description',
    'location',
    'type',
    'responsibilities_1',
    'responsibilities_2',
    'responsibilities_3',
    'responsibilities_4',
    'requirements_1',
    'requirements_2',
    'requirements_3',
    'requirements_4'
].join(',');

export const careersAPI = {
    /**
     * Mengambil semua karir
     * @returns {Promise<Array>} Daftar karir
     */
    async fetchAll() {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: ALL_COLUMNS,
                order: 'id.asc'
            }
        });
        return response.data;
    },

    /**
     * Membuat karir baru
     * @param {Object} data - Data karir baru
     * @returns {Promise<Object>} Karir yang baru dibuat
     */
    async create(data) {
        const response = await axios.post(API_URL, data, { 
            headers,
            params: {
                select: ALL_COLUMNS
            }
        });
        return response.data[0];
    },

    /**
     * Menghapus karir berdasarkan ID
     * @param {number|string} id - ID karir yang akan dihapus
     */
    async delete(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    },

    /**
     * Mengambil karir berdasarkan ID
     * @param {number|string} id - ID karir
     * @returns {Promise<Object>} Detail karir
     */
    async getById(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, {
            headers,
            params: {
                select: ALL_COLUMNS
            }
        });
        return response.data[0];
    },

    /**
     * Mengupdate karir
     * @param {number|string} id - ID karir yang akan diupdate
     * @param {Object} updateData - Data pembaruan
     * @returns {Promise<Object>} Karir yang telah diupdate
     */
    async update(id, updateData) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, updateData, {
            headers,
            params: {
                select: ALL_COLUMNS
            }
        });
        return response.data[0];
    },

    /**
     * Mencari karir berdasarkan lokasi atau judul
     * @param {string} keyword - Kata kunci pencarian
     * @returns {Promise<Array>} Hasil pencarian
     */
    async search(keyword) {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: ALL_COLUMNS,
                or: `(location.ilike.%${keyword}%,title.ilike.%${keyword}%)`
            }
        });
        return response.data;
    },

    /**
     * Mengambil karir berdasarkan tipe pekerjaan
     * @param {string} type - Tipe pekerjaan (Full-Time/Part-Time)
     * @returns {Promise<Array>} Karir dengan tipe tertentu
     */
    async getByType(type) {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: ALL_COLUMNS,
                type: `eq.${type}`
            }
        });
        return response.data;
    },

    /**
     * Mengambil karir dengan paginasi
     * @param {number} page - Halaman saat ini
     * @param {number} pageSize - Jumlah item per halaman
     * @returns {Promise<Array>} Karir untuk halaman tertentu
     */
    async getPaginated(page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: ALL_COLUMNS,
                order: 'id.asc',
                offset: offset,
                limit: pageSize
            }
        });
        return response.data;
    }
};