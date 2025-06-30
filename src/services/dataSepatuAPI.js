import axios from 'axios';

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/data_sepatu";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation"
};

const selectFields = 'id, name, img, brand, category, price, discount, rating, stock, tag1, tag2, tag3, length, width, height, upper_material, sole_material, lining_material, warranty, care_instructions, designed_for';

export const dataSepatuAPI = {
  /**
   * Ambil semua data sepatu
   */
  async fetchAll() {
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: selectFields,
        order: 'id.asc'
      }
    });
    return response.data;
  },

  /**
   * Ambil data sepatu berdasarkan ID
   */
  async fetchById(id) {
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: selectFields,
        id: `eq.${id}`
      }
    });
    return response.data[0] || null;
  },

  /**
   * Buat data sepatu baru
   */
  async create(data) {
    const response = await axios.post(API_URL, data, {
      headers,
      params: {
        select: '*'
      }
    });
    return response.data[0];
  },

  /**
   * Update data sepatu
   */
  async update(id, updateData) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, updateData, {
      headers,
      params: {
        select: '*'
      }
    });
    return response.data[0];
  },

  /**
   * Hapus data sepatu
   */
  async delete(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  /**
   * Cari sepatu berdasarkan nama
   */
  async searchByName(keyword) {
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: selectFields,
        name: `ilike.%${keyword}%`
      }
    });
    return response.data;
  },

  /**
   * Ambil data terbaru
   */
  async getLatest(limit = 5) {
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: selectFields,
        order: 'id.desc',
        limit: limit
      }
    });
    return response.data;
  },

  /**
   * Ambil data paginasi
   */
  async getPaginated(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: selectFields,
        order: 'id.asc',
        offset: offset,
        limit: pageSize
      }
    });
    return response.data;
  }
};
