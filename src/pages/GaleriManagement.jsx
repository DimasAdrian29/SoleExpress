import { useState } from "react";
import galeriData from "../dataGaleri.json";
import Header from "../components/Header";
import GaleriForm from "../components/GaleriForm";

export default function GaleriManagement() {
  const [galeriList, setGaleriList] = useState(galeriData);
  const [editingData, setEditingData] = useState(null);

  const handleSave = (data) => {
    if (data.id) {
      // Edit
      setGaleriList((prev) =>
        prev.map((item) => (item.id === data.id ? data : item))
      );
    } else {
      // Add
      const newItem = { ...data, id: Date.now() };
      setGaleriList((prev) => [...prev, newItem]);
    }
    setEditingData(null);
  };

  const handleEdit = (item) => setEditingData(item);

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus gambar ini?")) {
      setGaleriList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-[#5f73f2]">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Galeri" title="Galeri" />
        <h1 className="text-3xl font-bold text-white mb-6">Admin - Manajemen Galeri</h1>

        <GaleriForm
          onSave={handleSave}
          dataToEdit={editingData}
          cancelEdit={() => setEditingData(null)}
        />

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {galeriList.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow-md">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg mt-2 font-semibold">{item.title}</h2>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          {galeriList.length === 0 && (
            <div className="col-span-full text-center text-gray-200">
              Belum ada data galeri.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
