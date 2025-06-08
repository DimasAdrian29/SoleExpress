import { useState, useEffect } from "react";
import { usersAPI } from "../services/usersAPI"; // Pastikan path ini sesuai
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiFillDelete, AiFillEdit, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import Header from "../components/Header";

export default function UserList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk form tambah/edit
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    gmail: "",
    role: "user"
  });

  // State untuk mode edit
  const [editingId, setEditingId] = useState(null);

  // Load data saat pertama di-render
  useEffect(() => {
    loadUsers();
  }, []);

  // Fungsi untuk memuat user
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await usersAPI.fetchAllUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data pengguna");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle untuk aksi hapus data
  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus pengguna ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await usersAPI.deleteUser(id);
      setSuccess("Pengguna berhasil dihapus!");

      // Refresh data
      loadUsers();
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
  const startEdit = (user) => {
    setEditingId(user.id);
    setDataForm({
      username: user.username,
      password: "", // Kosongkan password saat edit
      gmail: user.gmail,
      role: user.role
    });
  };

  // Handle untuk membatalkan edit
  const cancelEdit = () => {
    setEditingId(null);
    setDataForm({
      username: "",
      password: "",
      gmail: "",
      role: "user"
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
        // Mode edit: update user
        // Jika password kosong, hapus dari data yang dikirim
        const updateData = { ...dataForm };
        if (updateData.password === "") {
          delete updateData.password;
        }
        
        await usersAPI.updateUser(editingId, updateData);
        setSuccess("Data pengguna berhasil diperbarui!");
      } else {
        // Mode tambah: buat user baru
        await usersAPI.createUser(dataForm);
        setSuccess("Pengguna baru berhasil ditambahkan!");
      }

      // Reset form
      setDataForm({ 
        username: "", 
        password: "", 
        gmail: "", 
        role: "user" 
      });
      setEditingId(null);

      // Refresh data
      loadUsers();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter user berdasarkan pencarian
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#5f73f2]">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Pengguna" title="Manajemen Pengguna" />
        <h1 className="text-3xl font-bold text-white mb-8">Admin - Manajemen Pengguna</h1>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingId ? "Edit Pengguna" : "Tambah Pengguna Baru"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="username"
                value={dataForm.username}
                placeholder="Username"
                onChange={handleChange}
                disabled={loading}
                required
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                          duration-200"
              />
              
              <input
                type="password"
                name="password"
                value={dataForm.password}
                placeholder={editingId ? "Password baru (kosongkan jika tidak diubah)" : "Password"}
                onChange={handleChange}
                disabled={loading}
                required={!editingId} // Wajib hanya untuk tambah user
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                          duration-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="gmail"
                value={dataForm.gmail}
                placeholder="Email"
                onChange={handleChange}
                disabled={loading}
                required
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                          duration-200"
              />
              
              <select
                name="role"
                value={dataForm.role}
                onChange={handleChange}
                disabled={loading}
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                          duration-200"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                          rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                          focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                          transition-all duration-200 shadow-lg flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  "Mohon Tunggu..."
                ) : editingId ? (
                  <>
                    <AiOutlineSave className="text-xl" /> Simpan Perubahan
                  </>
                ) : (
                  "Tambah Pengguna"
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
                  disabled={loading}
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
            placeholder="Cari pengguna (username, email, role)..."
            className="w-full p-3 bg-white rounded-xl border border-gray-200 focus:outline-none
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">
              Daftar Pengguna ({filteredUsers.length})
            </h3>
          </div>

          {loading && <LoadingSpinner text="Memuat data pengguna..." />}

          {!loading && error && (
            <EmptyState text="Terjadi kesalahan saat memuat data pengguna" />
          )}

          {!loading && !error && filteredUsers.length === 0 && (
            <EmptyState text="Tidak ada pengguna yang ditemukan" />
          )}

          {!loading && !error && filteredUsers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Tanggal Dibuat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-blue-600">
                          {user.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {user.gmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3">
                          <button
                            onClick={() => startEdit(user)}
                            disabled={loading}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <AiFillEdit className="text-2xl" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
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