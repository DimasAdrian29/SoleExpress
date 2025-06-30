import { useEffect, useState } from "react";
import { teamAPI } from "../services/teamAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";

export default function TeamList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  // Initial state for the form, without 'id'
  const initialFormState = {
    name: "",
    position: "",
    bio: "",
    linkedin: "",
    twitter: "",
    photo: "",
  };
  const [form, setForm] = useState(initialFormState); // Use initialFormState

  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchMembers();
    fetchTotal();
  }, [page]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await teamAPI.fetchTeamMembers({ page, limit });
      setMembers(data);
      setError("");
    } catch (err) {
      console.error("Error fetching members:", err);
      setError("Gagal memuat data tim.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTotal = async () => {
    try {
      const total = await teamAPI.getTotalMembers();
      setTotalItems(total);
    } catch (err) {
      console.error("Error fetching total members:", err);
    }
  };

  const openModal = (member = null) => {
    if (member) {
      setEditingId(member.id);
      // When editing, load all member properties into the form
      setForm({
        name: member.name,
        position: member.position,
        bio: member.bio,
        linkedin: member.linkedin,
        twitter: member.twitter,
        photo: member.photo,
      });
    } else {
      setEditingId(null);
      setForm(initialFormState); // Reset form to its initial empty state
    }
    setIsModalOpen(true);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setEditingId(null);
    setForm(initialFormState); // Reset form to its initial empty state
    setIsModalOpen(false);
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      if (!form.name || !form.position) {
        setError("Nama dan posisi wajib diisi.");
        setLoading(false);
        return;
      }

      // Pastikan hanya properti yang relevan yang dikirim.
      // Kita tidak perlu mengekstrak `id` secara eksplisit dari `form` di sini
      // karena `initialFormState` sudah tidak memiliki `id`.
      // Saat edit, `editingId` yang akan digunakan untuk identifikasi.
      const dataToSave = { ...form }; // Salin semua data dari form

      if (editingId) {
        // Jika dalam mode edit, panggil updateTeamMember dengan editingId dan dataToSave
        await teamAPI.updateTeamMember(editingId, dataToSave);
        setSuccess("Data anggota tim berhasil diperbarui.");
      } else {
        // Jika dalam mode tambah, panggil createTeamMember dengan dataToSave.
        // dataToSave saat ini tidak akan memiliki properti `id` karena berasal dari initialFormState.
        await teamAPI.createTeamMember(dataToSave);
        setSuccess("Anggota tim berhasil ditambahkan.");
      }

      closeModal();
      fetchMembers();
      fetchTotal();
    } catch (err) {
      console.error("Error saving data:", err);
      if (err.response && err.response.status === 409) {
        setError(
          "Terjadi konflik data. Pastikan tidak ada duplikasi ID yang tidak sengaja."
        );
      } else {
        setError("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus anggota ini?");
    if (!confirmDelete) return;

    setError("");
    setSuccess("");

    try {
      setLoading(true);
      await teamAPI.deleteTeamMember(id);
      setSuccess("Anggota berhasil dihapus.");
      fetchMembers();
      fetchTotal();
    } catch (err) {
      console.error("Error deleting data:", err);
      setError("Terjadi kesalahan saat menghapus data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="flex justify-center min-h-screen bg-[#5f73f2] rounded-2xl m-2"> {/* Added justify-center */}
      <main className="flex flex-col p-4 md:p-6 lg:p-8 w-full max-w-screen-xl"> {/* Added w-full and max-w-screen-xl */}
        <Header path="/ Pages / Team" title="Team" />
        <h1 className="text-3xl font-bold text-white mb-8">
          Admin - Manajemen Tim
        </h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <button
          onClick={() => openModal()}
          className="mb-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-blue-100 transition"
        >
          Tambah Anggota Tim
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari anggota berdasarkan nama, posisi, atau bio..."
          className="mb-6 w-full p-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-4">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-xl w-full max-w-lg shadow-2xl relative border border-gray-200">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-label="Tutup modal"
              >
                <AiOutlineClose className="text-2xl" />
              </button>

              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {editingId ? "Edit Anggota Tim" : "Tambah Anggota Tim Baru"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Looping melalui initialFormState keys untuk memastikan properti yang tepat */}
                {Object.keys(initialFormState).map((key) => (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/([A-Z])/g, " $1").trim()}
                      :
                    </label>
                    <input
                      id={key}
                      type="text"
                      name={key}
                      value={form[key]} // Ambil nilai dari form state
                      onChange={handleChange}
                      placeholder={
                        key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/([A-Z])/g, " $1").trim()
                      }
                      className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-semibold transition duration-300 ease-in-out"
                    disabled={loading}
                  >
                    {loading
                      ? "Menyimpan..."
                      : editingId
                      ? "Simpan Perubahan"
                      : "Tambah Anggota"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 bg-white text-gray-600 border border-gray-400 hover:bg-gray-400 hover:text-white rounded-xl font-semibold transition duration-300 ease-in-out"
                    disabled={loading}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex-1 flex flex-col"> {/* Changed to flex flex-col */}
          {loading && <LoadingSpinner text="Memuat data anggota tim..." />}
          {!loading && filteredMembers.length === 0 && (
            <EmptyState text="Tidak ada anggota tim ditemukan." />
          )}
          {!loading && filteredMembers.length > 0 && (
            <>
              <div className="overflow-x-auto">
                {" "}
                {/* This wrapper is crucial for table overflow */}
                <table className="min-w-full divide-y divide-gray-200 table-auto"> {/* Added table-auto */}
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Foto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Nama
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Posisi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Bio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        LinkedIn
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Twitter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMembers.map((member, index) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {(page - 1) * limit + index + 1}
                        </td>
                        <td className="px-6 py-4">
                          {member.photo ? (
                            <img
                              src={member.photo}
                              className="w-10 h-10 rounded-full object-cover"
                              alt={`${member.name}'s photo`}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                              No Pic
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {member.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {member.position}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {member.bio || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"> {/* Added max-w for LinkedIn */}
                          {member.linkedin || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"> {/* Added max-w for Twitter */}
                          {member.twitter || "-"}
                        </td>
                        <td className="px-6 py-4 flex gap-3 items-center">
                          <button
                            onClick={() => openModal(member)}
                            className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                            title="Edit"
                          >
                            <AiFillEdit className="text-xl" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                            title="Hapus"
                          >
                            <AiFillDelete className="text-xl" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center p-4 border-t border-gray-200">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
                >
                  Sebelumnya
                </button>
                <span className="text-sm text-gray-700">
                  Halaman <span className="font-bold">{page}</span> dari{" "}
                  <span className="font-bold">{totalPages}</span>
                </span>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
                >
                  Berikutnya
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}