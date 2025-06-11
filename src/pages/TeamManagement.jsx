import { useState } from "react";
import { Link } from "react-router-dom";
import karyawanData from "../dataKaryawan.json";
import Header from "../components/Header";
import AddKaryawanForm from "../components/AddKaryawanForm";
import EditKaryawanForm from "../components/EditKaryawanForm";

export default function TeamManagement() {
  const [karyawans, setKaryawans] = useState(karyawanData);
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    jabatan: "",
  });

  const handleAdd = (newKaryawan) => {
    setKaryawans((prev) => [...prev, newKaryawan]);
  };

  const handleDelete = (id) => {
    setKaryawans((prev) => prev.filter((k) => k.id !== id));
  };

  const handleUpdate = (updated) => {
    setKaryawans((prev) =>
      prev.map((k) => (k.id === updated.id ? updated : k))
    );
    setEditing(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const allJabatans = [...new Set(karyawans.map((k) => k.jabatan))];
  const searchLower = filters.search.toLowerCase();

  const filteredKaryawans = karyawans.filter((k) => {
    const matchSearch =
      k.nama.toLowerCase().includes(searchLower) ||
      k.jabatan.toLowerCase().includes(searchLower);

    const matchJabatan = filters.jabatan
      ? k.jabatan === filters.jabatan
      : true;

    return matchSearch && matchJabatan;
  });

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Tim" title="Tim" />
        <h1 className="text-3xl font-bold text-white mb-6">Admin - Manajemen Tim</h1>

        {/* Filter Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Cari nama atau jabatan..."
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 outline-none bg-white"
          />
          <select
            name="jabatan"
            value={filters.jabatan}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 outline-none bg-white"
          >
            <option value="">Semua Jabatan</option>
            {allJabatans.map((jabatan, index) => (
              <option key={index} value={jabatan}>
                {jabatan}
              </option>
            ))}
          </select>
        </div>

        {!editing && <AddKaryawanForm onAdd={handleAdd} />}
        {editing && (
          <EditKaryawanForm
            currentData={editing}
            onUpdate={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}

        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-100 text-left text-gray-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Foto</th>
                <th className="px-4 py-3 font-semibold">Nama</th>
                <th className="px-4 py-3 font-semibold">Jabatan</th>
                <th className="px-4 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredKaryawans.map((karyawan) => (
                <tr key={karyawan.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={karyawan.foto}
                      alt={karyawan.nama}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/Karyawanlist/${karyawan.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {karyawan.nama}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{karyawan.jabatan}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => setEditing(karyawan)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(karyawan.id)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filteredKaryawans.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    Tidak ada karyawan yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}