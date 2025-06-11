import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GaleriDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulasi fetch data dari localStorage
    try {
      const galeriData = JSON.parse(localStorage.getItem('galeriData')) || [];
      const foundItem = galeriData.find(item => item.id === parseInt(id));
      
      if (foundItem) {
        setItem(foundItem);
      } else {
        setError("Gambar tidak ditemukan");
      }
    } catch (err) {
      setError("Gagal memuat data");
    }
  }, [id]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!item) return <div className="p-4">Memuat...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6 rounded-2xl m-2">
      <img
        src={item.image}
        alt={item.title}
        className="rounded-xl mb-4 w-full h-64 object-cover"
      />
      <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <p className="text-gray-600 mb-4"> {item.date}</p>
     
      
      <a 
            href="/galerilist" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to galeri list
          </a>
    </div>
  );
}