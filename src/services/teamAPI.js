
// src/services/teamAPI.js
import axios from 'axios';

// Ganti dengan URL Supabase dan API KEY milikmu
const API_URL = "https://cdriiahgnydchnvzcvyh.supabase.co/rest/v1/datateam";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcmlpYWhnbnlkY2hudnpjdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTA4MjksImV4cCI6MjA2NDc4NjgyOX0.fF0kG_xmbZSwKp7yVlmUNSDUmEk23sPIYI1IS_OGwxU";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation"
};

export const teamAPI = {
  baseURL: API_URL,
  headers,

  // Pagination: default limit 5
  async fetchTeamMembers({ page = 1, limit = 5 }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const res = await axios.get(`${API_URL}?order=id.desc&offset=${from}&limit=${limit}`, {
      headers,
    });
    return res.data;
  },

  async fetchTeamMemberById(id) {
    const res = await axios.get(`${API_URL}?id=eq.${id}&limit=1`, { headers });
    if (res.data.length === 0) throw new Error("Data tidak ditemukan");
    return res.data[0];
  },

  async createTeamMember(data) {
    const res = await axios.post(API_URL, data, { headers });
    return res.data[0];
  },

  async updateTeamMember(id, data) {
    const res = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return res.data[0];
  },

  async deleteTeamMember(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  // Untuk hitung total
  async getTotalMembers() {
    const res = await axios.get(`${API_URL}?select=id`, { headers });
    return res.data.length;
  }
};
