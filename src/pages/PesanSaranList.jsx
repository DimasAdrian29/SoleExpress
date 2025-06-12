import { useState, useEffect } from "react";
import { pesansaranAPI } from "../services/pesansaranAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiFillDelete } from "react-icons/ai";
import Header from "../components/Header";

export default function PesanSaranList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pesanList, setPesanList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [dataForm, setDataForm] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  useEffect(() => {
    loadPesan();
  }, []);

  const loadPesan = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await pesansaranAPI.fetchAll();
      setPesanList(data);
    } catch (err) {
      setError("Gagal memuat pesan dan saran");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus pesan ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await pesansaranAPI.delete(id);
      setSuccess("Pesan berhasil dihapus!");

      loadPesan();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await pesansaranAPI.create(dataForm);
      setSuccess("Pesan berhasil dikirim!");
      setDataForm({ nama: "", email: "", pesan: "" });

      loadPesan();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredPesan = pesanList.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.pesan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Pesan & Saran" title="Pesan & Saran" />
        <h1 className="text-3xl font-bold text-white mb-8">Kontak Masuk</h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        
       

        {/* Pencarian */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari pesan berdasarkan nama/email/isi..."
            className="w-full p-3 bg-white rounded-xl border border-gray-200 shadow-lg"
          />
        </div>

        {/* Tabel Pesan */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">
              Daftar Pesan & Saran ({filteredPesan.length})
            </h3>
          </div>

          {loading && <LoadingSpinner text="Memuat data..." />}
          {!loading && error && <EmptyState text="Terjadi kesalahan saat memuat data" />}
          {!loading && !error && filteredPesan.length === 0 && (
            <EmptyState text="Belum ada pesan atau saran" />
          )}

          {!loading && !error && filteredPesan.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Pesan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPesan.map((p, index) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4 font-semibold text-blue-600">{p.nama}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{p.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md whitespace-pre-wrap">{p.pesan}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={loading}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <AiFillDelete className="text-2xl" />
                        </button>
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