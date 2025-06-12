import { useEffect, useState } from "react";
import { teamAPI } from "../services/teamAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function TeamList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    position: "",
    bio: "",
    linkedin: "",
    twitter: "",
    photo: ""
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await teamAPI.fetchTeamMembers();
      setMembers(data);
    } catch (err) {
      setError("Gagal memuat data tim.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (member = null) => {
    if (member) {
      setEditingId(member.id);
      setForm({
        name: member.name,
        position: member.position,
        bio: member.bio,
        linkedin: member.linkedin,
        twitter: member.twitter,
        photo: member.photo
      });
    } else {
      setEditingId(null);
      setForm({ name: "", position: "", bio: "", linkedin: "", twitter: "", photo: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setForm({ name: "", position: "", bio: "", linkedin: "", twitter: "", photo: "" });
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const method = editingId ? "PATCH" : "POST";
      const url = editingId
        ? `${teamAPI.baseURL}?id=eq.${editingId}`
        : teamAPI.baseURL;

      await fetch(url, {
        method,
        headers: teamAPI.headers,
        body: JSON.stringify(form),
      });
      setSuccess(editingId ? "Data berhasil diperbarui." : "Anggota tim berhasil ditambahkan.");
      closeModal();
      fetchMembers();
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus anggota ini?");
    if (!confirmDelete) return;
    try {
      setLoading(true);
      await fetch(`${teamAPI.baseURL}?id=eq.${id}`, {
        method: "DELETE",
        headers: teamAPI.headers,
      });
      setSuccess("Anggota berhasil dihapus.");
      fetchMembers();
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus data.");
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

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Team" title="Team" />
        <h1 className="text-3xl font-bold text-white mb-8">Admin - Manajemen Tim</h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <button
          onClick={() => openModal()}
          className="mb-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
        >
          Tambah Anggota Tim
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari anggota..."
          className="mb-6 w-full p-3 bg-white rounded-xl border border-gray-200"
        />

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
              <h3 className="text-lg font-semibold mb-4">{editingId ? "Edit Anggota" : "Tambah Anggota"}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {Object.entries(form).map(([key, value]) => (
                  <input
                    key={key}
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                  />
                ))}
                <div className="flex gap-3 justify-end">
                  <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl">
                    {loading ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Tambah"}
                  </button>
                  <button type="button" onClick={closeModal} className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl">
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading && <LoadingSpinner text="Memuat data..." />}
          {!loading && filteredMembers.length === 0 && <EmptyState text="Tidak ada anggota ditemukan." />}

          {!loading && filteredMembers.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Foto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Posisi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Bio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">LinkedIn</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Twitter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member, index) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {member.photo ? <img src={member.photo} alt="foto" className="w-12 h-12 rounded-full object-cover" /> : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{member.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{member.position}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{member.bio}</td>
                    <td className="px-6 py-4 text-sm text-blue-600">
                      {member.linkedin ? <a href={member.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600">
                      {member.twitter ? <a href={member.twitter} target="_blank" rel="noreferrer">Twitter</a> : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => openModal(member)} className="text-blue-500 hover:text-blue-700">
                          <AiFillEdit className="text-2xl" />
                        </button>
                        <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-700">
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
