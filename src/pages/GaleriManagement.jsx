import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Tambahkan impor Link
import galeriData from "../dataGaleri.json";
import Header from "../components/Header";
import GaleriForm from "../components/GaleriForm";

export default function GaleriManagement() {
  const [galeriList, setGaleriList] = useState(() => {
    // Load data dari localStorage jika ada
    const savedData = localStorage.getItem('galeriData');
    return savedData ? JSON.parse(savedData) : galeriData;
  });
  const [editingData, setEditingData] = useState(null);

  // Simpan data ke localStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('galeriData', JSON.stringify(galeriList));
  }, [galeriList]);

  const handleSave = (data) => {
    if (data.id) {
      // Edit
      setGaleriList((prev) =>
        prev.map((item) => (item.id === data.id ? data : item))
      );
    } else {
      // Add
      const newItem = { 
        ...data, 
        id: Date.now(),
        date: new Date().toISOString() // Tambahkan timestamp
      };
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
              {/* Tambahkan Link untuk dynamic route */}
              <Link to={`/galeri/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded hover:opacity-90 transition-opacity"
                />
              </Link>
              
              <div className="flex justify-between items-start mt-2">
                {/* Link untuk judul */}
                <Link 
                  to={`/galerilist/${item.id}`}
                  className="text-lg font-semibold hover:text-blue-500 transition-colors"
                >
                  {item.title}
                </Link>
                
                <div className="flex gap-2">
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
              
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {item.description}
              </p>
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