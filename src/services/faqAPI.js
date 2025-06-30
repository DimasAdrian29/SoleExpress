
// services/faqAPI.js
import axios from 'axios';


// PASTIKAN URL INI BENAR (Project URL + /rest/v1/FAQ)
const API_URL = "https://cdriiahgnydchnvzcvyh.supabase.co/rest/v1/FAQ"; 
// PASTIKAN API KEY INI BENAR DAN AKTIF
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcmlpYWhnbnlkY2hudnpjdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTA4MjksImV4cCI6MjA2NDc4NjgyOX0.fF0kG_xmbZSwKp7yVlmUNSDUmEk23sPIYI1IS_OGwxU"; 

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation" 
};

export const faqAPI = {
    // READ - Ambil semua FAQ
    async fetchFAQs() {
        try {
            const response = await axios.get(`${API_URL}?order=created_at.desc`, { headers });
            return response.data;
        } catch (error) {
            console.error("Error fetching all FAQs from Supabase:", error);
            throw error;
        }
    },

    // CREATE - Tambah pertanyaan (misal dari pengunjung)
    async createFAQ(data) {
        try {
            const response = await axios.post(API_URL, data, { headers });
            return response.data;
        } catch (error) {
            console.error("Error creating FAQ:", error);
            throw error;
        }
    },

    // UPDATE - Edit jawaban atau pertanyaan
    async updateFAQ(id, updatedData) {
        try {
            const response = await axios.patch(`${API_URL}?id=eq.${id}`, updatedData, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error updating FAQ with id ${id}:`, error);
            throw error;
        }
    },

    // DELETE - Hapus pertanyaan
    async deleteFAQ(id) {
        try {
            const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error deleting FAQ with id ${id}:`, error);
            throw error;
        }
    }
};
