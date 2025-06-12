// src/services/teamAPI.js
import axios from 'axios';

// API_URL ini sudah benar jika nama tabel Anda di Supabase adalah 'datateam'
const API_URL = "https://cdriiahgnydchnvzcvyh.supabase.co/rest/v1/datateam"; 
// PASTIKAN API KEY INI BENAR DAN AKTIF
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcmlpYWhnbnlkY2hudnpjdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTA4MjksImV4cCI6MjA2NDc4NjgyOX0.fF0kG_xmbZSwKp7yVlmUNSDUmEk23sPIYI1IS_OGwxU"; 

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation" 
};

export const teamAPI = { 
    async fetchTeamMembers() {
        try {
            // Hapus bagian "?order=created_at.desc" karena kolomnya tidak ada
            const response = await axios.get(
                API_URL, // <--- Perbaikan di sini!
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching team members from Supabase:", error);
            throw error;
        }
    },

    async fetchTeamMemberById(id) {
        try {
            const response = await axios.get(
                `${API_URL}?id=eq.${id}&limit=1`, 
                { headers }
            );
            
            if (response.data.length === 0) {
                const notFoundError = new Error(`Team member with ID ${id} not found.`);
                notFoundError.name = "NotFoundError"; // Menambahkan nama untuk penanganan error yang lebih baik
                throw notFoundError;
            }

            return response.data[0];
        } catch (error) {
            console.error(`Error fetching team member with ID ${id} from Supabase:`, error);
            throw error;
        }
    }
};