import { useState, useEffect } from "react";
import { usersAPI } from "../services/usersAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiFillDelete, AiFillEdit, AiOutlineSave, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Header from "../components/Header";

export default function UserList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    gmail: "",
    role: "user"
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersAPI.fetchAllUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data pengguna");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user = null) => {
    if (user) {
      setEditingId(user.id);
      setDataForm({ username: user.username, password: "", gmail: user.gmail, role: user.role });
    } else {
      setEditingId(null);
      setDataForm({ username: "", password: "", gmail: "", role: "user" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setDataForm({ username: "", password: "", gmail: "", role: "user" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editingId) {
        const updateData = { ...dataForm };
        if (!updateData.password) delete updateData.password;
        await usersAPI.updateUser(editingId, updateData);
        setSuccess("Pengguna berhasil diperbarui!");
      } else {
        await usersAPI.createUser(dataForm);
        setSuccess("Pengguna berhasil ditambahkan!");
      }

      await loadUsers();
      closeModal();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;
    try {
      setLoading(true);
      await usersAPI.deleteUser(id);
      setSuccess("Pengguna berhasil dihapus!");
      await loadUsers();
    } catch (err) {
      setError(`Gagal menghapus: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2 relative">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Pengguna" title="Manajemen Pengguna" />

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white">Admin - Manajemen Pengguna</h1>
          <button
            onClick={() => openModal()}
            className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold shadow hover:bg-blue-50 flex items-center gap-2"
          >
            <AiOutlinePlus /> Tambah Pengguna
          </button>
        </div>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari pengguna..."
          className="w-full p-3 mb-6 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">Daftar Pengguna ({filteredUsers.length})</h3>
          </div>

          {loading && <LoadingSpinner text="Memuat data pengguna..." />}
          {!loading && filteredUsers.length === 0 && <EmptyState text="Tidak ada pengguna ditemukan." />}

          {!loading && filteredUsers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Dibuat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, i) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{i + 1}</td>
                      <td className="px-6 py-4 font-semibold text-blue-600">{user.username}</td>
                      <td className="px-6 py-4">{user.gmail}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${user.role === "admin" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(user.created_at).toLocaleString()}</td>
                      <td className="px-6 py-4 flex gap-3">
                        <button onClick={() => openModal(user)} className="text-blue-500 hover:text-blue-700">
                          <AiFillEdit className="text-xl" />
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                          <AiFillDelete className="text-xl" />
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-4 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <AiOutlineClose className="text-xl" />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Pengguna" : "Tambah Pengguna"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                value={dataForm.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full p-3 border rounded-xl"
              />
              <input
                type="password"
                name="password"
                value={dataForm.password}
                onChange={handleChange}
                placeholder={editingId ? "Password baru (opsional)" : "Password"}
                required={!editingId}
                className="w-full p-3 border rounded-xl"
              />
              <input
                type="email"
                name="gmail"
                value={dataForm.gmail}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full p-3 border rounded-xl"
              />
              <select
                name="role"
                value={dataForm.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                >
                  {editingId ? "Simpan Perubahan" : "Tambah"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl font-semibold"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
