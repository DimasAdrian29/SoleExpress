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
    // FUNGSI INI HARUS MENGAMBIL SEMUA DATA DARI TABEL FAQ, TANPA FILTER APA PUN PADA KOLOM 'answer'
    async fetchFAQs() {
        try {
            // Parameter '?order=created_at.desc' hanya untuk pengurutan, BUKAN filter.
            // Pastikan TIDAK ADA filter seperti '.not('answer', 'is', null)' di sini.
            const response = await axios.get(
                `${API_URL}?order=created_at.desc`, 
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching all FAQs from Supabase:", error);
            throw error;
        }
    },

    async submitVisitorQuestion(formData) { 
        const { name, question } = formData;
        
        try {
            const response = await axios.post(
                API_URL, 
                { 
                    question: question,
                    answer: null,       // Ini HARUS null agar bisa ditandai 'Belum Dijawab'
                    name: name          
                }, 
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error("Error submitting visitor question to Supabase:", error);
            throw error;
        }
    }
};