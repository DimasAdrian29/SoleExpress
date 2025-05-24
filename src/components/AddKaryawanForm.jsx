import { useState } from "react";

export default function AddKaryawanForm({ onAdd }) {
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    foto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.nama && formData.jabatan && formData.foto) {
      onAdd({ ...formData, id: Date.now() });
      setFormData({ nama: "", jabatan: "", foto: "" });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-8 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tambah Karyawan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={formData.nama}
          onChange={handleChange}
          className="p-3 border rounded shadow-sm"
        />
        <input
          type="text"
          name="jabatan"
          placeholder="Jabatan"
          value={formData.jabatan}
          onChange={handleChange}
          className="p-3 border rounded shadow-sm"
        />
        <input
          type="text"
          name="foto"
          placeholder="Link Foto"
          value={formData.foto}
          onChange={handleChange}
          className="p-3 border rounded shadow-sm"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Tambah
      </button>
    </div>
  );
}
