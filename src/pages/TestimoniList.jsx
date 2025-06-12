// pages/TestimoniList.jsx
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { testimoniAPI } from "../services/testimoniAPI";

export default function TestimoniList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);

  const initialModal = {
    username: "",
    message: "",
    rating: 0,
    image_url: "",
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await testimoniAPI.fetchTestimonials();
      setTestimonials(data);
    } catch (err) {
      alert("Gagal mengambil data testimoni");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAdd = () => {
    setModalData({ ...initialModal });
    document.getElementById("testimoni_modal").showModal();
  };

  const openEdit = (data) => {
    setModalData(data);
    document.getElementById("testimoni_modal").showModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalData.id) {
        await testimoniAPI.updateTestimonial(modalData.id, modalData);
      } else {
        await testimoniAPI.submitTestimonial(modalData);
      }
      await fetchData();
      document.getElementById("testimoni_modal").close();
    } catch (err) {
      alert("Gagal menyimpan data: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus testimoni ini?")) {
      try {
        await testimoniAPI.deleteTestimonial(id);
        await fetchData();
      } catch (err) {
        alert("Gagal menghapus data");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-6">
        <Header path="/ Pages / Testimoni" title="Testimoni" />
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin - Manajemen Testimoni</h1>

        <button className="btn  mb-4" onClick={openAdd}>+ Tambah Testimoni</button>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-100 text-left text-gray-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Username</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Image</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-6">Loading...</td></tr>
              ) : testimonials.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-6">Tidak ada testimoni.</td></tr>
              ) : (
                testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{t.username}</td>
                    <td className="px-4 py-2">{t.message}</td>
                    <td className="px-4 py-2">{t.rating} ★</td>
                    <td className="px-4 py-2">
                      {t.image_url && <img src={t.image_url} alt={t.username} className="w-16 h-16 object-cover rounded" />}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button className="btn btn-sm" onClick={() => openEdit(t)}>Edit</button>
                      <button className="btn btn-sm btn-error" onClick={() => handleDelete(t.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <dialog id="testimoni_modal" className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg">{modalData?.id ? "Edit Testimoni" : "Tambah Testimoni"}</h3>
            <form onSubmit={handleSubmit} className="grid gap-3 mt-4">
              <input name="username" type="text" placeholder="Username" value={modalData?.username || ""} onChange={handleInputChange} className="input input-bordered w-full" required />
              <textarea name="message" placeholder="Message" value={modalData?.message || ""} onChange={handleInputChange} className="textarea textarea-bordered w-full" required />
              <input name="rating" type="number" min="1" max="5" placeholder="Rating (1-5)" value={modalData?.rating || ""} onChange={handleInputChange} className="input input-bordered w-full" required />
              <input name="image_url" type="text" placeholder="Image URL (opsional)" value={modalData?.image_url || ""} onChange={handleInputChange} className="input input-bordered w-full" />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">{modalData?.id ? "Update" : "Simpan"}</button>
                <button type="button" className="btn" onClick={() => document.getElementById("testimoni_modal").close()}>Batal</button>
              </div>
            </form>
          </div>
        </dialog>
      </main>
    </div>
  );
}
