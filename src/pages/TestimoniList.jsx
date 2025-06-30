import { useEffect, useState } from "react";
import Header from "../components/Header";
import { testimoniAPI } from "../services/testimoniAPI";

export default function TestimoniList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await testimoniAPI.fetchTestimonials();
      setTestimonials(data);
    } catch (err) {
      alert("Gagal mengambil data testimoni");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus testimoni ini?")) {
      try {
        await testimoniAPI.deleteTestimonial(id);
        await fetchData();
      } catch (err) {
        alert("Gagal menghapus data");
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const paginatedData = testimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-6">
        <Header path="/ Pages / Testimoni" title="Testimoni" />
        
          <h1 className="text-3xl font-bold text-white">Admin - Manajemen Testimoni</h1>
      <br />
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-100 text-left text-gray-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Username</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Image</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-6">Loading...</td></tr>
              ) : paginatedData.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-6">Tidak ada testimoni.</td></tr>
              ) : (
                paginatedData.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{t.username}</td>
                    <td className="px-4 py-2">{t.message}</td>
                    <td className="px-4 py-2">{t.rating} ★</td>
                    <td className="px-4 py-2">
                      {t.image_url && (
                        <img
                          src={t.image_url}
                          alt={t.username}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(t.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="btn btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            « Prev
          </button>
          <span className="text-white">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next »
          </button>
        </div>
      </main>
    </div>
  );
}
