import { useState, useEffect } from "react";
import { careersAPI } from "../services/careersAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function CareerList() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "Full-Time",
    responsibilities_1: "",
    responsibilities_2: "",
    responsibilities_3: "",
    responsibilities_4: "",
    requirements_1: "",
    requirements_2: "",
    requirements_3: "",
    requirements_4: "",
  });

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    try {
      setLoading(true);
      const data = await careersAPI.fetchAll();
      setCareers(data);
    } catch (err) {
      setError("Gagal memuat data karir");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (career = null) => {
    if (career) {
      setEditingId(career.id);
      setForm(career);
    } else {
      setEditingId(null);
      setForm({
        title: "",
        description: "",
        location: "",
        type: "Full-Time",
        responsibilities_1: "",
        responsibilities_2: "",
        responsibilities_3: "",
        responsibilities_4: "",
        requirements_1: "",
        requirements_2: "",
        requirements_3: "",
        requirements_4: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      if (editingId) {
        await careersAPI.update(editingId, form);
        setSuccess("Karir berhasil diperbarui!");
      } else {
        await careersAPI.create(form);
        setSuccess("Karir berhasil ditambahkan!");
      }
      closeModal();
      loadCareers();
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data karir");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus karir ini?");
    if (!konfirmasi) return;
    try {
      setLoading(true);
      await careersAPI.delete(id);
      setSuccess("Karir berhasil dihapus!");
      loadCareers();
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus data karir");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Karir" title="Karir" />
        <h1 className="text-3xl font-bold text-white mb-8">Admin - Manajemen Karir</h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <button
          onClick={() => openModal()}
          className="mb-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
        >
          Tambah Karir
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-xl overflow-y-auto max-h-[90vh]">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? "Edit Karir" : "Tambah Karir"}
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Judul" className="border p-2" required />
                <input name="location" value={form.location} onChange={handleChange} placeholder="Lokasi" className="border p-2" required />
                <select name="type" value={form.type} onChange={handleChange} className="border p-2 col-span-2">
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi" className="border p-2 col-span-2" />
                {[1, 2, 3, 4].map((n) => (
                  <input key={n} name={`responsibilities_${n}`} value={form[`responsibilities_${n}`]} onChange={handleChange} placeholder={`Tanggung Jawab ${n}`} className="border p-2" />
                ))}
                {[1, 2, 3, 4].map((n) => (
                  <input key={n} name={`requirements_${n}`} value={form[`requirements_${n}`]} onChange={handleChange} placeholder={`Persyaratan ${n}`} className="border p-2" />
                ))}
                <div className="col-span-2 flex justify-end space-x-2 mt-4">
                  <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded">Batal</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {loading ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading && <LoadingSpinner text="Memuat data karir..." />}
          {!loading && error && <EmptyState text="Terjadi kesalahan saat memuat karir" />}
          {!loading && !error && careers.length === 0 && <EmptyState text="Tidak ada data karir" />}
          {!loading && !error && careers.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Judul</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Lokasi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Tipe</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {careers.map((career) => (
                  <tr key={career.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{career.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{career.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{career.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openModal(career)}
                          disabled={loading}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <AiFillEdit className="text-2xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(career.id)}
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