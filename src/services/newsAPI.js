// src/services/newsAPI.js
import axios from "axios";

const API_URL = "https://cdriiahgnydchnvzcvyh.supabase.co/rest/v1/artikel";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcmlpYWhnbnlkY2hudnpjdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTA4MjksImV4cCI6MjA2NDc4NjgyOX0.fF0kG_xmbZSwKp7yVlmUNSDUmEk23sPIYI1IS_OGwxU";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation", // agar data yang disimpan dikembalikan
};

export const newsAPI = {
  async fetchNews() {
    const res = await axios.get(`${API_URL}?order=created_at.desc`, { headers });
    return res.data;
  },

  async createNews(data) {
    const res = await axios.post(API_URL, [data], { headers }); // array!
    return res.data[0];
  },

  async updateNews(id, data) {
    const res = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return res.data[0];
  },

  async deleteNews(id) {
    const res = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    return res.data;
  },
};
