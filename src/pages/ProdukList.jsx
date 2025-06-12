import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { dataSepatuAPI } from "../services/dataSepatuAPI"; // pastikan path benar

export default function ProductList() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
    selectedBrand: "",
  });
  const [modalData, setModalData] = useState(null);

  const initialModal = {
    name: "", img: "", brand: "", category: "", price: 0, discount: 0,
    rating: 0, stock: 0, tag1: "", tag2: "", tag3: "",
    length: 0, width: 0, height: 0,
    upper_material: "", sole_material: "", lining_material: "",
    warranty: "", care_instructions: "", designed_for: ""
  };

  // Fetch semua data dari Supabase
  const fetchData = async () => {
    setLoading(true);
    const data = await dataSepatuAPI.fetchAll();
    setProductsData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeFilter = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const filteredProducts = productsData.filter((prod) => {
    const st = dataForm.searchTerm.toLowerCase();
    const matchesSearch =
      prod.name.toLowerCase().includes(st) ||
      prod.brand.toLowerCase().includes(st);

    const matchesTag = dataForm.selectedTag
      ? [prod.tag1, prod.tag2, prod.tag3].includes(dataForm.selectedTag)
      : true;

    const matchesBrand = dataForm.selectedBrand
      ? prod.brand === dataForm.selectedBrand
      : true;

    return matchesSearch && matchesTag && matchesBrand;
  });

  // Open modal untuk tambah atau edit
  const openAdd = () => {
    setModalData({ ...initialModal });
    document.getElementById("product_modal").showModal();
  };
  const openEdit = (prod) => {
    setModalData(prod);
    document.getElementById("product_modal").showModal();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    id, // ambil id terpisah
    ...restData // sisanya masuk ke payload
  } = modalData;

  const payload = {
    ...restData,
    price: Number(restData.price) || 0,
    discount: Number(restData.discount) || 0,
    rating: Number(restData.rating) || 0,
    stock: Number(restData.stock) || 0,
    length: Number(restData.length) || 0,
    width: Number(restData.width) || 0,
    height: Number(restData.height) || 0,
    name: restData.name || '',
    img: restData.img || '',
    brand: restData.brand || '',
    category: restData.category || '',
    tag1: restData.tag1 || '',
    tag2: restData.tag2 || '',
    tag3: restData.tag3 || '',
    upper_material: restData.upper_material || '',
    sole_material: restData.sole_material || '',
    lining_material: restData.lining_material || '',
    warranty: restData.warranty || '',
    care_instructions: restData.care_instructions || '',
    designed_for: restData.designed_for || ''
  };

  try {
    if (id) {
      await dataSepatuAPI.update(id, payload); // hanya kirim payload tanpa id
    } else {
      await dataSepatuAPI.create(payload); // id juga tidak perlu dikirim saat create
    }

    await fetchData();
    document.getElementById("product_modal").close();
  } catch (err) {
    console.error("Gagal simpan data:", err?.response?.data || err);
    alert("Error saat simpan data:\n" + (err?.response?.data?.message || err?.message || "Unknown error"));
  }
};



  // Hapus produk sesuai ID
  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus?")) {
      await dataSepatuAPI.delete(id);
      fetchData();
    }
  };

  // Tag dan brand unik untuk filter dropdown
  const allTags = [...new Set(productsData.flatMap(p => [p.tag1, p.tag2, p.tag3].filter(Boolean)))];
  const allBrands = [...new Set(productsData.map(p => p.brand))];

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Produk" title="Produk" />
        <h1 className="text-3xl font-bold text-white mb-6">Admin - Product Management</h1>

        {/* Tombol Tambah */}
        <button className="btn mb-4" onClick={openAdd}>+ Tambah Produk</button>

        {/* Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <input name="searchTerm" value={dataForm.searchTerm} onChange={handleChangeFilter}
            placeholder="Search name or brand..." className="p-3 border rounded-md bg-white" />
          <select name="selectedTag" value={dataForm.selectedTag} onChange={handleChangeFilter}
            className="p-3 border rounded-md bg-white">
            <option value="">All Tags</option>
            {allTags.map((t, i) => <option key={i}>{t}</option>)}
          </select>
          <select name="selectedBrand" value={dataForm.selectedBrand} onChange={handleChangeFilter}
            className="p-3 border rounded-md bg-white">
            <option value="">All Brands</option>
            {allBrands.map((b, i) => <option key={i}>{b}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-100 text-left text-gray-800">
              <tr>
                {["Image","Name","Brand","Category","Price","Discount","Rating","Stock","Tags","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!loading && filteredProducts.length === 0 && (
                <tr><td colSpan="10" className="text-center py-6">No products found.</td></tr>
              )}
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2"><img src={p.img} alt={p.name} className="w-16 h-16 rounded-md" /></td>
                  <td className="px-4 py-2"><Link to={`/produklist/${p.id}`} className="text-blue-500 hover:underline">{p.name}</Link></td>
                  <td className="px-4 py-2">{p.brand}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">Rp{p.price}</td>
                  <td className="px-4 py-2">{p.discount}%</td>
                  <td className="px-4 py-2">{p.rating} ★</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2">
                    {[p.tag1,p.tag2,p.tag3].filter(Boolean).map((t,i) => (
                      <span key={i} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs mr-1">{t}</span>
                    ))}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="btn btn-sm" onClick={() => openEdit(p)}>Edit</button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        <dialog id="product_modal" className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg">{modalData?.id ? "Edit Produk" : "Tambah Produk"}</h3>
            <form onSubmit={handleSubmit} className="grid gap-3 mt-4">
              {Object.keys(initialModal).map((key) => (
                <input key={key}
                  type={["price","discount","rating","stock","length","width","height"].includes(key) ? "number" : "text"}
                  name={key} placeholder={key.replace(/_/g," ").toUpperCase()}
                  value={modalData?.[key] || ""} onChange={handleInputChange}
                  className="input input-bordered w-full" required
                />
              ))}
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  {modalData?.id ? "Update" : "Simpan"}
                </button>
                <button type="button" className="btn" onClick={() => document.getElementById("product_modal").close()}>
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
