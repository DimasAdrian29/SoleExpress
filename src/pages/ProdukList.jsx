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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const initialModal = {
    name: "", img: "", brand: "", category: "", price: 0, discount: 0,
    rating: 0, stock: 0, tag1: "", tag2: "", tag3: "",
    length: 0, width: 0, height: 0,
    upper_material: "", sole_material: "", lining_material: "",
    warranty: "", care_instructions: "", designed_for: ""
  };

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

  const openAdd = () => {
    setModalData({ ...initialModal });
    document.getElementById("product_modal").showModal();
  };
  const openEdit = (prod) => {
    setModalData(prod);
    document.getElementById("product_modal").showModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, ...restData } = modalData;

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
        await dataSepatuAPI.update(id, payload);
      } else {
        await dataSepatuAPI.create(payload);
      }

      await fetchData();
      document.getElementById("product_modal").close();
    } catch (err) {
      console.error("Gagal simpan data:", err?.response?.data || err);
      alert("Error saat simpan data:\n" + (err?.response?.data?.message || err?.message || "Unknown error"));
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus?")) {
      await dataSepatuAPI.delete(id);
      fetchData();
    }
  };

  const allTags = [...new Set(productsData.flatMap(p => [p.tag1, p.tag2, p.tag3].filter(Boolean)))];
  const allBrands = [...new Set(productsData.map(p => p.brand))];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex min-h-screen bg-[#5f73f2] rounded-2xl m-2">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Produk" title="Produk" />
        <h1 className="text-3xl font-bold text-white mb-6">Admin - Product Management</h1>

        <button className="btn mb-4" onClick={openAdd}>+ Tambah Produk</button>

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
              {filteredProducts
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map(p => (
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

          {filteredProducts.length > itemsPerPage && (
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

        <dialog id="product_modal" className="modal">
          <div className="modal-box max-w-2xl bg-white/90 backdrop-blur-xl">
            <h3 className="font-bold text-lg">{modalData?.id ? "Edit Produk" : "Tambah Produk"}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {Object.keys(initialModal).map((key) => (
                <input key={key}
                  type={["price","discount","rating","stock","length","width","height"].includes(key) ? "number" : "text"}
                  name={key} placeholder={key.replace(/_/g," ").toUpperCase()}
                  value={modalData?.[key] || ""} onChange={handleInputChange}
                  className="input input-bordered w-full" required
                />
              ))}
              <div className="col-span-full flex justify-end gap-2 mt-4">
                <button type="submit" className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded hover:bg-blue-100">
                  {modalData?.id ? "Update" : "Simpan"}
                </button>
                <button type="button" className="px-6 py-2 bg-white border border-gray-500 text-gray-600 rounded hover:bg-gray-100" onClick={() => document.getElementById("product_modal").close()}>
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