import axios from 'axios'

const API_URL = "https://ybbcaxrqgcnjpfvljvwq.supabase.co/rest/v1/tentang_solexpress"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmNheHJxZ2NuanBmdmxqdndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk2MDYsImV4cCI6MjA2NDQ4NTYwNn0.dTQqfLlzwk1GK-ZCavQd1hl-aiukGCjsVY2Ib9FGq0E"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
}

export const tentangAPI = {
  async fetchTentang() {
    const response = await axios.get(API_URL, { headers })
    return response.data
  },

  async createTentang(data) {
    const response = await axios.post(API_URL, data, { headers })
    return response.data
  },

  async deleteTentang(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
  },

  async getTentangById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}&select=*`, {
      headers,
    })
    return response.data[0]
  },

  async updateTentang(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers,
    })
    return response.data
  }
}
