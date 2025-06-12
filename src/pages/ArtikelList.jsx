import { useState, useEffect } from "react";
import { newsAPI } from "../services/newsAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Header from "../components/Header";

export default function ArtikelList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dataForm, setDataForm] = useState({
    title: "",
    content: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await newsAPI.fetchNews();
      setArticles(data);
    } catch (err) {
      setError("Gagal memuat artikel");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus artikel ini?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await fetch(`${newsAPI.API_URL}?id=eq.${id}`, {
        method: "DELETE",
        headers: newsAPI.headers
      });
      setSuccess("Artikel berhasil dihapus!");
      loadArticles();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setDataForm({
        title: item.title,
        content: item.content
      });
    } else {
      setEditingId(null);
      setDataForm({ title: "", content: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setDataForm({ title: "", content: "" });
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editingId) {
        await fetch(`${newsAPI.API_URL}?id=eq.${editingId}`, {
          method: "PATCH",
          headers: newsAPI.headers,
          body: JSON.stringify(dataForm)
        });
        setSuccess("Artikel berhasil diperbarui!");
      } else {
        await fetch(newsAPI.API_URL, {
          method: "POST",
          headers: newsAPI.headers,
          body: JSON.stringify(dataForm)
        });
        setSuccess("Artikel berhasil ditambahkan!");
      }

      closeModal();
      loadArticles();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
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
        <h1 className="text-3xl font-bold text-white mb-8">Admin - Manajemen Artikel</h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <button
          onClick={() => openModal()}
          className="mb-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
        >
          Tambah Artikel
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? "Edit Artikel" : "Tambah Artikel Baru"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={dataForm.title}
                  onChange={handleChange}
                  placeholder="Judul Artikel"
                  required
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                />
                <textarea
                  name="content"
                  value={dataForm.content}
                  onChange={handleChange}
                  placeholder="Konten Artikel"
                  rows="6"
                  required
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                />
                <div className="flex gap-3 justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
                  >
                    {loading ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Tambah"}
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

        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full p-3 bg-white rounded-xl border border-gray-200"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading && <LoadingSpinner text="Memuat artikel..." />}
          {!loading && error && <EmptyState text="Terjadi kesalahan saat memuat artikel" />}
          {!loading && !error && filteredArticles.length === 0 && <EmptyState text="Tidak ada artikel ditemukan" />}

          {!loading && !error && filteredArticles.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Judul</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Konten</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArticles.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-sm">{item.content}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openModal(item)}
                          disabled={loading}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <AiFillEdit className="text-2xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={loading}
                          className="text-red-500 hover:text-red-700"
                        >
                          <AiFillDelete className="text-2xl" />
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
