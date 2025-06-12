import { useEffect, useState } from "react";
import { tentangAPI } from "../services/tentangAPI";
import Header from "../components/Header";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TentangSolexpressEditor() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    sejarah: "",
    visi: "",
    misi_1: "",
    misi_2: "",
    misi_3: "",
    misi_4: "",
    nama_perusahaan: "",
    alamat: "",
    email: "",
    telepon: "",
    website: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await tentangAPI.fetchTentang();
      const singleData = result[0];
      setData(singleData);
      setForm(singleData);
    } catch (err) {
      setError("Gagal memuat data tentang Solexpress.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await tentangAPI.updateTentang(data.id, form);
      setSuccess("Data berhasil diperbarui.");
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      setError("Gagal memperbarui data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat data..." />;

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Tentang" title="Tentang Solexpress" />
        <h1 className="text-3xl font-bold text-white mb-8">Admin - Tentang Solexpress</h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <div className="bg-white p-6 rounded-xl shadow-lg">
          {data ? (
            <>
              <p className="mb-2"><strong>Sejarah:</strong> {data.sejarah}</p>
              <p className="mb-2"><strong>Visi:</strong> {data.visi}</p>
              <p className="mb-2"><strong>Misi 1:</strong> {data.misi_1}</p>
              <p className="mb-2"><strong>Misi 2:</strong> {data.misi_2}</p>
              <p className="mb-2"><strong>Misi 3:</strong> {data.misi_3}</p>
              <p className="mb-2"><strong>Misi 4:</strong> {data.misi_4}</p>
              <p className="mb-2"><strong>Nama Perusahaan:</strong> {data.nama_perusahaan}</p>
              <p className="mb-2"><strong>Alamat:</strong> {data.alamat}</p>
              <p className="mb-2"><strong>Email:</strong> {data.email}</p>
              <p className="mb-2"><strong>Telepon:</strong> {data.telepon}</p>
              <p className="mb-2"><strong>Website:</strong> {data.website}</p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
              >
                Edit Informasi
              </button>
            </>
          ) : (
            <p className="text-gray-700">Tidak ada data yang tersedia.</p>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-xl">
              <h3 className="text-lg font-semibold mb-4">Edit Tentang Solexpress</h3>
              <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                {Object.entries(form).map(([key, value]) => (
                  <div key={key}>
                    <label className="block mb-1 font-medium text-sm capitalize">{key.replace(/_/g, " ")}</label>
                    <textarea
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                      rows={2}
                    />
                  </div>
                ))}
                <div className="flex gap-3 justify-end">
                  <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl">
                    Simpan Perubahan
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl">
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}