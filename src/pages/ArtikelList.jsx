import { useState, useEffect } from "react";
import { newsAPI } from "../services/newsAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import Header from "../components/Header";

export default function ArtikelList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [dataForm, setDataForm] = useState({
    title: "",
    content: "",
    image_url: "",
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await newsAPI.fetchNews();
      setArticles(data);
    } catch (err) {
      setError("Gagal memuat artikel");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setDataForm({
        title: item.title,
        content: item.content,
        image_url: item.image_url || "",
      });
    } else {
      setEditingId(null);
      setDataForm({ title: "", content: "", image_url: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setDataForm({ title: "", content: "", image_url: "" });
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        const updatedItem = await newsAPI.updateNews(editingId, dataForm);
        setArticles((prev) =>
          prev.map((item) => (item.id === editingId ? updatedItem : item))
        );
        setSuccess("Artikel berhasil diperbarui!");
      } else {
        const newItem = await newsAPI.createNews(dataForm);
        setArticles((prev) => [newItem, ...prev]);
        setSuccess("Artikel berhasil ditambahkan!");
      }
      closeModal();
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan artikel.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await newsAPI.deleteNews(id);
      setArticles((prev) => prev.filter((item) => item.id !== id));
      setSuccess("Artikel berhasil dihapus!");
    } catch (err) {
      setError("Gagal menghapus artikel");
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Artikel" title="Artikel" />
        <h1 className="text-3xl font-bold text-white mb-8">
          Admin - Manajemen Artikel
        </h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <button
          onClick={() => openModal()}
          className="mb-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-blue-100 transition"
        >
          Tambah Artikel
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-xl w-full max-w-lg shadow-2xl relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              >
                <AiOutlineClose className="text-2xl" />
              </button>

              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {editingId ? "Edit Artikel" : "Tambah Artikel"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={dataForm.title}
                  onChange={handleChange}
                  placeholder="Judul Artikel"
                  required
                  className="w-full p-3 rounded-xl bg-white border border-gray-300"
                />
                <textarea
                  name="content"
                  value={dataForm.content}
                  onChange={handleChange}
                  placeholder="Konten Artikel"
                  rows="6"
                  required
                  className="w-full p-3 rounded-xl bg-white border border-gray-300"
                />
                <input
                  type="text"
                  name="image_url"
                  value={dataForm.image_url}
                  onChange={handleChange}
                  placeholder="URL Gambar (opsional)"
                  className="w-full p-3 rounded-xl bg-white border border-gray-300"
                />
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-semibold transition"
                  >
                    {editingId ? "Simpan" : "Tambah"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 bg-white text-gray-600 border border-gray-400 hover:bg-gray-400 hover:text-white rounded-xl font-semibold transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full p-3 bg-white rounded-xl border border-gray-200"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-auto">
          {loading && <LoadingSpinner text="Memuat artikel..." />}
          {!loading && error && (
            <EmptyState text="Terjadi kesalahan saat memuat artikel" />
          )}
          {!loading && !error && filteredArticles.length === 0 && (
            <EmptyState text="Tidak ada artikel ditemukan" />
          )}
          {!loading && !error && filteredArticles.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">Judul</th>
                  <th className="px-4 py-2 text-left font-semibold">Konten</th>
                  <th className="px-4 py-2 text-left font-semibold">Gambar</th>
                  <th className="px-4 py-2 text-left font-semibold">Tanggal</th>
                  <th className="px-4 py-2 text-left font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredArticles.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{item.title}</td>
                    <td className="px-4 py-3 max-w-xs truncate text-gray-700">
                      {item.content}
                    </td>
                    <td className="px-4 py-3">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="h-12 rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(item.created_at).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(item)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <AiFillEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <AiFillDelete className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
