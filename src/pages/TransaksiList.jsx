import { useEffect, useState } from "react";
import Header from "../components/Header";
import { transaksiAPI } from "../services/transaksiAPI";

export default function TransaksiList() {
  const [transaksiData, setTransaksiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEkspedisi, setSelectedEkspedisi] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const initialModal = {
    id_sepatu: "",
    kuantitas: 0,
    total_pembayaran: 0,
    ekspedisi: "",
    nama: "",
    no_hp: "",
    alamat: ""
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await transaksiAPI.fetchAll();
    setTransaksiData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEdit = (item) => {
    setModalData(item);
    document.getElementById("transaksi_modal").showModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...rest } = modalData;
    try {
      if (id) {
        await transaksiAPI.update(id, {
          ...rest,
          kuantitas: Number(rest.kuantitas),
          total_pembayaran: Number(rest.total_pembayaran)
        });
      }
      await fetchData();
      document.getElementById("transaksi_modal").close();
    } catch (err) {
      alert("Gagal menyimpan data");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus transaksi ini?")) {
      await transaksiAPI.delete(id);
      fetchData();
    }
  };

  // Filter dan search
  const filteredData = transaksiData.filter((tx) => {
    const matchSearch =
      tx.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.no_hp?.includes(searchTerm) ||
      tx.alamat?.toLowerCase().includes(searchTerm);
    const matchEkspedisi = selectedEkspedisi
      ? tx.ekspedisi === selectedEkspedisi
      : true;
    return matchSearch && matchEkspedisi;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Transaksi" title="Transaksi" />
        <h1 className="text-3xl font-bold text-white mb-6">Admin - Manajemen Transaksi</h1>

        {/* Filter dan Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Cari nama, no hp, atau alamat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border rounded-md bg-white"
          />
          <select
            value={selectedEkspedisi}
            onChange={(e) => setSelectedEkspedisi(e.target.value)}
            className="p-3 border rounded-md bg-white"
          >
            <option value="">Semua Ekspedisi</option>
            {Array.from(new Set(transaksiData.map(tx => tx.ekspedisi)))
              .filter(Boolean)
              .map((exp, i) => (
                <option key={i} value={exp}>{exp}</option>
              ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-100 text-left text-gray-800">
              <tr>
                {[
                  "ID", "ID Sepatu", "Kuantitas", "Total", "Ekspedisi",
                  "Nama", "No HP", "Alamat", "Tanggal", "Aksi"
                ].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!loading && filteredData.length === 0 && (
                <tr><td colSpan="10" className="text-center py-6">Tidak ada transaksi.</td></tr>
              )}
              {filteredData
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{tx.id}</td>
                    <td className="px-4 py-2">{tx.id_sepatu}</td>
                    <td className="px-4 py-2">{tx.kuantitas}</td>
                    <td className="px-4 py-2">$ {tx.total_pembayaran}</td>
                    <td className="px-4 py-2">{tx.ekspedisi}</td>
                    <td className="px-4 py-2">{tx.nama}</td>
                    <td className="px-4 py-2">{tx.no_hp}</td>
                    <td className="px-4 py-2">{tx.alamat}</td>
                    <td className="px-4 py-2">{new Date(tx.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button className="btn btn-sm" onClick={() => openEdit(tx)}>Edit</button>
                      <button className="btn btn-sm btn-error" onClick={() => handleDelete(tx.id)}>Hapus</button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {filteredData.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-2 py-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-100"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-100'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-100"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Modal Edit */}
        <dialog id="transaksi_modal" className="modal">
          <div className="modal-box max-w-lg bg-white/90 backdrop-blur-xl">
            <h3 className="font-bold text-lg">{modalData?.id ? "Edit Transaksi" : "Tambah Transaksi"}</h3>
            <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
              {Object.keys(initialModal).map((field) => (
                <input
                  key={field}
                  type={["kuantitas", "total_pembayaran"].includes(field) ? "number" : "text"}
                  name={field}
                  value={modalData?.[field] || ""}
                  onChange={handleInputChange}
                  placeholder={field.replace(/_/g, " ").toUpperCase()}
                  className="input input-bordered w-full"
                  required
                />
              ))}
              <div className="flex justify-end gap-2 mt-4">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Simpan
                </button>
                <button type="button" className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  onClick={() => document.getElementById("transaksi_modal").close()}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </main>
    </div>
  );
}
