import { useState, useEffect } from "react";
import { artikelAPI } from "../services/artikelAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiFillDelete, AiFillEdit, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import Header from "../components/Header";

export default function ArtikelList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk form tambah/edit
  const [dataForm, setDataForm] = useState({
    judul: "",
    isi: "",
    url_image: ""
  });

  // State untuk mode edit
  const [editingId, setEditingId] = useState(null);

  // Load data saat pertama di-render
  useEffect(() => {
    loadArticles();
  }, []);

  // Fungsi untuk memuat artikel
  const loadArticles = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await artikelAPI.fetchAll();
      setArticles(data);
    } catch (err) {
      setError("Gagal memuat artikel");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle untuk aksi hapus data
  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus artikel ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await artikelAPI.delete(id);
      setSuccess("Artikel berhasil dihapus!");

      // Refresh data
      loadArticles();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // Handle untuk memulai edit
  const startEdit = (article) => {
    setEditingId(article.id);
    setDataForm({
      judul: article.judul,
      isi: article.isi,
      url_image: article.url_image || ""
    });
  };

  // Handle untuk membatalkan edit
  const cancelEdit = () => {
    setEditingId(null);
    setDataForm({
      judul: "",
      isi: "",
      url_image: ""
    });
  };

  // Handle untuk submit form (create dan update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editingId) {
        // Mode edit: update artikel
        await artikelAPI.update(editingId, dataForm);
        setSuccess("Artikel berhasil diperbarui!");
      } else {
        // Mode tambah: buat artikel baru
        await artikelAPI.create(dataForm);
        setSuccess("Artikel berhasil ditambahkan!");
      }

      // Reset form
      setDataForm({ judul: "", isi: "", url_image: "" });
      setEditingId(null);

      // Refresh data
      loadArticles();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter artikel berdasarkan pencarian
  const filteredArticles = articles.filter(
    (article) =>
      article.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.isi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#5f73f2]">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Artikel" title="Artikel" />
        <h1 className="text-3xl font-bold text-white mb-8">Admin - Manajemen Artikel</h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingId ? "Edit Artikel" : "Tambah Artikel Baru"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="judul"
              value={dataForm.judul}
              placeholder="Judul artikel"
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                        duration-200"
            />

            <textarea
              name="isi"
              value={dataForm.isi}
              placeholder="Isi artikel"
              onChange={handleChange}
              disabled={loading}
              required
              rows="4"
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                        duration-200 resize-none"
            />

            <input
              type="text"
              name="url_image"
              value={dataForm.url_image}
              placeholder="URL Gambar (opsional)"
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                        duration-200"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                          rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                          focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                          transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                {loading ? (
                  "Mohon Tunggu..."
                ) : editingId ? (
                  <>
                    <AiOutlineSave className="text-xl" /> Simpan Perubahan
                  </>
                ) : (
                  "Tambah Artikel"
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold
                            rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500
                            focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-200 shadow-lg flex items-center gap-2"
                >
                  <AiOutlineClose /> Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full p-3 bg-white rounded-xl border border-gray-200 focus:outline-none
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
          />
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">
              Daftar Artikel ({filteredArticles.length})
            </h3>
          </div>

          {loading && <LoadingSpinner text="Memuat artikel..." />}

          {!loading && error && (
            <EmptyState text="Terjadi kesalahan saat memuat artikel" />
          )}

          {!loading && !error && filteredArticles.length === 0 && (
            <EmptyState text="Tidak ada artikel yang ditemukan" />
          )}

          {!loading && !error && filteredArticles.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Judul</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Gambar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredArticles.map((article, index) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-blue-600">
                          {article.judul}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {article.isi}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(article.created_at).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {article.url_image && (
                          <img 
                            src={article.url_image} 
                            alt={article.judul}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3">
                          <button
                            onClick={() => startEdit(article)}
                            disabled={loading}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <AiFillEdit className="text-2xl" />
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            disabled={loading}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <AiFillDelete className="text-2xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}