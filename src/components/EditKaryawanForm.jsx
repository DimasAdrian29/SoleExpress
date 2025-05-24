import { useState, useEffect } from "react";

export default function EditKaryawanForm({ currentData, onUpdate, onCancel }) {
  const [formData, setFormData] = useState(currentData);

  useEffect(() => {
    setFormData(currentData);
  }, [currentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-8 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Karyawan</h2>
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
      <div className="mt-4 space-x-2">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Simpan
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Batal
        </button>
      </div>
    </div>
  );
}
