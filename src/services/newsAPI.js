// src/services/newsAPI.js
import axios from 'axios';

// API_URL ini menunjuk ke tabel 'artikel' di Supabase, SESUAI PERMINTAAN ANDA
const API_URL = "https://cdriiahgnydchnvzcvyh.supabase.co/rest/v1/artikel"; 
// API_KEY ini adalah kunci yang Anda berikan, TETAP SAMA
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcmlpYWhnbnlkY2hudnpjdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTA4MjksImV4cCI6MjA2NDc4NjgyOX0.fF0kG_xmbZSwKp7yVlmUNSDUmEk23sPIYI1IS_OGwxU"; 

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation" 
};

export const newsAPI = { 
    // Tambahkan di newsAPI (src/services/newsAPI.js)

async createNews(data) {
    try {
        const response = await axios.post(API_URL, data, { headers });
        return response.data[0];
    } catch (error) {
        console.error("Error creating article:", error);
        throw error;
    }
},

async updateNews(id, data) {
    try {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
        return response.data[0];
    } catch (error) {
        console.error("Error updating article:", error);
        throw error;
    }
},

async deleteNews(id) {
    try {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    } catch (error) {
        console.error("Error deleting article:", error);
        throw error;
    }
},

    async fetchNews() {
        try {
            // Mengambil semua data dari tabel 'artikel', diurutkan berdasarkan 'created_at' terbaru
            const response = await axios.get(
                `${API_URL}?order=created_at.desc`, 
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching articles from Supabase:", error); // Pesan error disesuaikan
            throw error;
        }
    },

    async fetchNewsById(id) {
        try {
            // Mengambil satu artikel berdasarkan ID
            const response = await axios.get(
                `${API_URL}?id=eq.${id}&limit=1`, 
                { headers }
            );
            
            if (response.data.length === 0) {
                // Melempar error dengan nama 'NotFoundError' agar bisa ditangkap di komponen
                const notFoundError = new Error(`Article with ID ${id} not found.`); // Pesan error disesuaikan
                notFoundError.name = "NotFoundError";
                throw notFoundError;
            }

            return response.data[0];
        } catch (error) {
            console.error(`Error fetching article with ID ${id} from Supabase:`, error); // Pesan error disesuaikan
            throw error;
        }
    }
};