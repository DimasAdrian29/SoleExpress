import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { katalogMediaAPI } from "../services/katalogMediaAPI";
import Header from "../components/Header";

export default function GaleriManagement() {
  const [galeriList, setGaleriList] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [formData, setFormData] = useState({ judul: "", url_media: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadGaleri();
  }, []);

  const loadGaleri = async () => {
    try {
      setLoading(true);
      const data = await katalogMediaAPI.fetchAll();
      setGaleriList(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data galeri.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingData(item);
      setFormData({ judul: item.judul, url_media: item.url_media });
    } else {
      setEditingData(null);
      setFormData({ judul: "", url_media: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingData(null);
    setFormData({ judul: "", url_media: "" });
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingData) {
        await katalogMediaAPI.update(editingData.id, formData);
      } else {
        await katalogMediaAPI.create(formData);
      }
      closeModal();
      await loadGaleri();
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus gambar ini?")) return;
    try {
      setLoading(true);
      await katalogMediaAPI.delete(id);
      setGaleriList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Galeri" title="Galeri" />
        <h1 className="text-3xl font-bold text-white mb-6">Admin - Manajemen Galeri</h1>

        <button
          onClick={() => openModal()}
           className="btn mb-4"
        >
          Tambah Gambar
        </button>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
              <h3 className="text-lg font-semibold mb-4">
                {editingData ? "Edit Gambar" : "Tambah Gambar Baru"}
              </h3>
              <form onSubmit={handleSave} className="space-y-4">
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  placeholder="Judul Gambar"
                  required
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                />
                <input
                  type="text"
                  name="url_media"
                  value={formData.url_media}
                  onChange={handleChange}
                  placeholder="URL Gambar"
                  required
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                />
                <div className="flex gap-3 justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
                  >
                    {loading ? "Menyimpan..." : editingData ? "Simpan Perubahan" : "Tambah"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Galeri List */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {galeriList.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow-md">
              <Link to={`/galeri/${item.id}`}>
                <img
                  src={item.url_media}
                  alt={item.judul}
                  className="w-full h-48 object-cover rounded hover:opacity-90 transition-opacity"
                />
              </Link>
              <div className="flex justify-between items-start mt-2">
                <p className="text-lg font-semibold">{item.judul}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(item)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
          {galeriList.length === 0 && (
            <div className="col-span-full text-center text-gray-200">
              Belum ada data galeri.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
