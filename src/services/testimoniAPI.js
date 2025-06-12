// services/testimoniAPI.js
import axios from 'axios';

// PASTIKAN URL INI BENAR (Project URL + /rest/v1/testimonial)
// GANTI 'cdriiahgnydchnvzcvyh' DENGAN SUBDOMAIN SUPABASE ANDA
const API_URL = "https://cdriiahgnydchnvzcvyh.supabase.co/rest/v1/testimonial"; 
// PASTIKAN API KEY INI BENAR DAN AKTIF
// GANTI DENGAN ANON KEY PROJECT SUPABASE ANDA
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcmlpYWhnbnlkY2hudnpjdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTA4MjksImV4cCI6MjA2NDc4NjgyOX0.fF0kG_xmbZSwKp7yVlmUNSDUmEk23sPIYI1IS_OGwxU"; 

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation" 
};

export const testimoniAPI = {
    /**
     * Mengambil semua data testimoni dari Supabase.
     *
     * @returns {Promise<Array>} Array of testimonial objects.
     * @throws {Error} Jika terjadi kesalahan saat mengambil data.
     */
    
    async fetchTestimonials() {
        try {
            const response = await axios.get(
                `${API_URL}?order=created_at.desc`, 
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching testimonials from Supabase:", error);
            throw error; // Lempar error agar bisa ditangkap di komponen
        }
    },

    /**
     * Mengirimkan testimoni baru ke Supabase.
     *
     * @param {object} testimonialData - Objek yang berisi data testimoni.
     * @param {string} testimonialData.username
     * @param {string} testimonialData.message
     * @param {number} testimonialData.rating
     * @param {string|null} [testimonialData.image_url]
     * @returns {Promise<object>} Data testimoni yang baru saja disisipkan.
     * @throws {Error} Jika terjadi kesalahan saat mengirim data.
     */

    // Mengupdate testimoni berdasarkan ID
async updateTestimonial(id, updatedData) {
    try {
        const response = await axios.patch(
            `${API_URL}?id=eq.${id}`,
            updatedData,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating testimonial:", error);
        throw error;
    }
},

// Menghapus testimoni berdasarkan ID
async deleteTestimonial(id) {
    try {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        throw error;
    }
},

    async submitTestimonial(testimonialData) { 
        const { username, message, rating, image_url } = testimonialData;
        
        try {
            const response = await axios.post(
                API_URL, 
                { 
                    username: username,
                    message: message,
                    rating: rating,
                    image_url: image_url || null, // Pastikan null jika tidak ada
                }, 
                { headers }
            );
            return response.data; // Mengembalikan data yang baru saja dimasukkan
        } catch (error) {
            console.error("Error submitting testimonial to Supabase:", error);
            throw error;
        }
    }
};