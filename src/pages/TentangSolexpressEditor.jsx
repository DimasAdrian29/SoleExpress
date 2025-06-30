import { useEffect, useState } from "react";
import { tentangAPI } from "../services/tentangAPI";
import Header from "../components/Header";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { IoClose } from "react-icons/io5";

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
        <h1 className="text-3xl font-bold text-white mb-8">
          Admin - Tentang Solexpress
        </h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <div className="bg-white p-6 rounded-xl shadow-lg">
          {data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p><strong>Sejarah:</strong><br />{data.sejarah}</p>
                <p className="mt-2"><strong>Visi:</strong><br />{data.visi}</p>
                <p className="mt-2"><strong>Misi:</strong>
                  <ul className="list-disc list-inside">
                    <li>{data.misi_1}</li>
                    <li>{data.misi_2}</li>
                    <li>{data.misi_3}</li>
                    <li>{data.misi_4}</li>
                  </ul>
                </p>
              </div>
              <div>
                <p><strong>Nama Perusahaan:</strong><br />{data.nama_perusahaan}</p>
                <p className="mt-2"><strong>Alamat:</strong><br />{data.alamat}</p>
                <p className="mt-2"><strong>Email:</strong><br />{data.email}</p>
                <p className="mt-2"><strong>Telepon:</strong><br />{data.telepon}</p>
                <p className="mt-2"><strong>Website:</strong><br />{data.website}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">Tidak ada data yang tersedia.</p>
          )}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border border-blue-600 hover:bg-blue-600 hover:text-white transition"
            >
              Edit Informasi
            </button>
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="relative bg-white p-8 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-700 hover:text-red-600"
              >
                <IoClose className="text-3xl" />
              </button>

              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Edit Tentang Solexpress
              </h3>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(form).map(([key, value]) => (
                  <div key={key}>
                    <label className="block mb-2 font-medium text-sm capitalize">
                      {key.replace(/_/g, " ")}
                    </label>
                    <textarea
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl resize-none"
                      rows={3}
                    />
                  </div>
                ))}
                <div className="col-span-full flex justify-end gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-semibold transition"
                  >
                    Simpan Perubahan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 bg-white text-gray-600 border border-gray-400 hover:bg-gray-400 hover:text-white rounded-xl font-semibold transition"
                  >
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
