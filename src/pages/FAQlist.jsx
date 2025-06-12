import { useState, useEffect } from "react";
import { faqAPI } from "../services/faqAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import Header from "../components/Header";

export default function FAQList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dataForm, setDataForm] = useState({
    name: "",
    question: "",
    answer: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await faqAPI.fetchFAQs();
      setFaqs(data);
    } catch (err) {
      setError("Gagal memuat FAQ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus FAQ ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await fetch(`${faqAPI.baseURL}/${id}`, {
        method: "DELETE",
        headers: faqAPI.headers,
      });
      setSuccess("FAQ berhasil dihapus!");
      loadFAQs();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const openModal = (faq = null) => {
    if (faq) {
      setEditingId(faq.id);
      setDataForm({
        name: faq.name,
        question: faq.question,
        answer: faq.answer || ""
      });
    } else {
      setEditingId(null);
      setDataForm({ name: "", question: "", answer: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setDataForm({ name: "", question: "", answer: "" });
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editingId) {
        await fetch(`${faqAPI.baseURL}?id=eq.${editingId}`, {
          method: "PATCH",
          headers: faqAPI.headers,
          body: JSON.stringify(dataForm),
        });
        setSuccess("FAQ berhasil diperbarui!");
      } else {
        await faqAPI.submitVisitorQuestion(dataForm);
        setSuccess("FAQ berhasil ditambahkan!");
      }

      closeModal();
      loadFAQs();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (faq.answer || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / FAQ" title="FAQ" />
        <h1 className="text-3xl font-bold text-white mb-8">Admin - Manajemen FAQ</h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <button
          onClick={() => openModal()}
          className="mb-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
        >
          Tambah FAQ Baru
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? "Edit FAQ" : "Tambah FAQ Baru"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={dataForm.name}
                  onChange={handleChange}
                  placeholder="Nama"
                  required
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                />
                <input
                  type="text"
                  name="question"
                  value={dataForm.question}
                  onChange={handleChange}
                  placeholder="Pertanyaan"
                  required
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                />
                <textarea
                  name="answer"
                  value={dataForm.answer}
                  onChange={handleChange}
                  placeholder="Jawaban"
                  rows="4"
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
            placeholder="Cari FAQ..."
            className="w-full p-3 bg-white rounded-xl border border-gray-200"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading && <LoadingSpinner text="Memuat FAQ..." />}
          {!loading && error && <EmptyState text="Terjadi kesalahan saat memuat FAQ" />}
          {!loading && !error && filteredFAQs.length === 0 && <EmptyState text="Tidak ada FAQ yang ditemukan" />}

          {!loading && !error && filteredFAQs.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Pertanyaan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Jawaban</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFAQs.map((faq, index) => (
                  <tr key={faq.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{faq.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{faq.question}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{faq.answer || "-"}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openModal(faq)}
                          disabled={loading}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <AiFillEdit className="text-2xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
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
