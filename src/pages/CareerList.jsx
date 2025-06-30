import { useState, useEffect } from "react";
import { careersAPI } from "../services/careersAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import { AiFillEdit, AiFillDelete, AiOutlineClose } from "react-icons/ai";

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
          className="mb-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-blue-100 transition"
        >
          Tambah Karir
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-xl w-full max-w-4xl shadow-2xl relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              >
                <AiOutlineClose className="text-2xl" />
              </button>

              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {editingId ? "Edit Karir" : "Tambah Karir"}
              </h3>

              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Judul" required className="p-3 rounded-xl bg-white border border-gray-300" />
                <input name="location" value={form.location} onChange={handleChange} placeholder="Lokasi" required className="p-3 rounded-xl bg-white border border-gray-300" />
                <select name="type" value={form.type} onChange={handleChange} className="p-3 rounded-xl bg-white border border-gray-300 col-span-2">
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi" rows="4" className="p-3 rounded-xl bg-white border border-gray-300 col-span-2" />
                {[1, 2, 3, 4].map((n) => (
                  <input key={`r${n}`} name={`responsibilities_${n}`} value={form[`responsibilities_${n}`]} onChange={handleChange} placeholder={`Tanggung Jawab ${n}`} className="p-3 rounded-xl bg-white border border-gray-300" />
                ))}
                {[1, 2, 3, 4].map((n) => (
                  <input key={`q${n}`} name={`requirements_${n}`} value={form[`requirements_${n}`]} onChange={handleChange} placeholder={`Persyaratan ${n}`} className="p-3 rounded-xl bg-white border border-gray-300" />
                ))}
                <div className="col-span-2 flex justify-end gap-3 mt-2">
                  <button type="submit" className="px-6 py-2 bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-semibold transition">
                    {loading ? "Menyimpan..." : editingId ? "Simpan" : "Tambah"}
                  </button>
                  <button type="button" onClick={closeModal} className="px-6 py-2 bg-white text-gray-600 border border-gray-400 hover:bg-gray-400 hover:text-white rounded-xl font-semibold transition">
                    Batal
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
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-800">Judul</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-800">Lokasi</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-800">Tipe</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {careers.map((career) => (
                  <tr key={career.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{career.title}</td>
                    <td className="px-6 py-4">{career.location}</td>
                    <td className="px-6 py-4">{career.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openModal(career)} className="text-blue-500 hover:text-blue-700">
                          <AiFillEdit className="text-xl" />
                        </button>
                        <button onClick={() => handleDelete(career.id)} className="text-red-500 hover:text-red-700">
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