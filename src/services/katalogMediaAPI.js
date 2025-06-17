// katalogMediaAPI.js
import axios from 'axios';

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/katalog_media";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const katalogMediaAPI = {
  async fetchAll() {
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: 'id, created_at, url_media, judul',
        order: 'id.asc',
      },
    });
    return response.data;
  },

  async create(data) {
    const response = await axios.post(API_URL, data, {
      headers,
      params: {
        select: '*',
      },
    });
    return response.data[0];
  },

  async delete(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });
  },

  async getById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}`, {
      headers,
      params: {
        select: 'id, created_at, url_media, judul',
      },
    });
    return response.data[0];
  },

  async update(id, updateData) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, updateData, {
      headers,
      params: {
        select: '*',
      },
    });
    return response.data[0];
  },

  async searchByJudul(keyword) {
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: 'id, created_at, url_media, judul',
        judul: `ilike.%${keyword}%`,
      },
    });
    return response.data;
  },

  async getLatest(limit = 5) {
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: 'id, created_at, url_media, judul',
        order: 'created_at.desc',
        limit,
      },
    });
    return response.data;
  },

  async getPaginated(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: 'id, created_at, url_media, judul',
        order: 'id.asc',
        offset,
        limit: pageSize,
      },
    });
    return response.data;
  },
};
