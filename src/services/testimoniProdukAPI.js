// src/services/testimoniProdukAPI.js
import axios from 'axios';

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/testimoni_produk";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation"
};

export const testimoniProdukAPI = {
    async fetchAll() {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, data_sepatu_id, created_at, username, message, rating, image_url',
                order: 'id.asc'
            }
        });
        return response.data;
    },

    async create(data) {
        const response = await axios.post(API_URL, data, {
            headers,
            params: {
                select: '*'
            }
        });
        return response.data[0];
    },

    async delete(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    },

    async getById(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, {
            headers,
            params: {
                select: 'id, data_sepatu_id, created_at, username, message, rating, image_url'
            }
        });
        return response.data[0];
    },

    async update(id, updateData) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, updateData, {
            headers,
            params: {
                select: '*'
            }
        });
        return response.data[0];
    },

    async searchByUsername(keyword) {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, data_sepatu_id, created_at, username, message, rating, image_url',
                username: `ilike.%${keyword}%`
            }
        });
        return response.data;
    },

    async getByProductId(productId) {
        const response = await axios.get(API_URL, {
            headers,
            params: {
                select: 'id, data_sepatu_id, created_at, username, message, rating, image_url',
                data_sepatu_id: `eq.${productId}`
            }
        });
        return response.data;
    }
};
