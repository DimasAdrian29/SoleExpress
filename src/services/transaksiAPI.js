import axios from 'axios';

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/transaksi";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation"
};

export const transaksiAPI = {
  // Ambil semua transaksi
  async fetchAll() {
    const response = await axios.get(API_URL, {
      headers,
      params: {
         select: 'id, created_at, id_sepatu, kuantitas, total_pembayaran, ekspedisi,nama,no_hp,alamat',
        order: 'created_at.desc'
      }
    });
    return response.data;
  },

  // Buat transaksi baru
  async create(data) {
    const response = await axios.post(API_URL, data, {
      headers,
      params: {
        select: '*'
      }
    });
    return response.data[0];
  },

  // Hapus transaksi
  async delete(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  // Ambil 1 transaksi berdasarkan ID
  async getById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}`, {
      headers,
      params: {
        select: 'id, created_at, id_sepatu, kuantitas, total_pembayaran, ekspedisi,nama,no_hp,alamat'
      }
    });
    return response.data[0];
  },

  // Update transaksi
  async update(id, updateData) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, updateData, {
      headers,
      params: {
        select: '*'
      }
    });
    return response.data[0];
  },

  // Cari berdasarkan ekspedisi
  async searchByEkspedisi(keyword) {
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: 'id, created_at, id_sepatu, kuantitas, total_pembayaran, ekspedisi',
        ekspedisi: `ilike.%${keyword}%`
      }
    });
    return response.data;
  },

  // Ambil transaksi terbaru
  async getLatest(limit = 5) {
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: 'id, created_at, id_sepatu, kuantitas, total_pembayaran, ekspedisi',
        order: 'created_at.desc',
        limit
      }
    });
    return response.data;
  },

  // Ambil transaksi dengan paginasi
  async getPaginated(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const response = await axios.get(API_URL, {
      headers,
      params: {
        select: 'id, created_at, id_sepatu, kuantitas, total_pembayaran, ekspedisi',
        order: 'created_at.desc',
        offset,
        limit: pageSize
      }
    });
    return response.data;
  }
};
