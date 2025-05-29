import { useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../dataSepatu.json";
import Header from "../components/Header";

export default function ProductList() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
    selectedBrand: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const allTags = [...new Set(productsData.flatMap((product) => product.tags))];
  const allBrands = [...new Set(productsData.map((product) => product.brand))];

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(_searchTerm) ||
      product.brand.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? product.tags.includes(dataForm.selectedTag)
      : true;

    const matchesBrand = dataForm.selectedBrand
      ? product.brand === dataForm.selectedBrand
      : true;

    return matchesSearch && matchesTag && matchesBrand;
  });

  return (
    <div className="flex min-h-screen bg-[#5f73f2]">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Produk" title="Produk" />
        <h1 className="text-3xl font-bold text-white mb-8">
          Admin - Product Management
        </h1>

        {/* Filter Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            value={dataForm.searchTerm}
            name="searchTerm"
            placeholder="Search by name or brand..."
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 outline-none bg-white"
            onChange={handleChange}
          />

          <select
            value={dataForm.selectedTag}
            name="selectedTag"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 outline-none bg-white"
            onChange={handleChange}
          >
            <option value="">All Tags</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <select
            name="selectedBrand"
            value={dataForm.selectedBrand}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 outline-none bg-white"
            onChange={handleChange}
          >
            <option value="">All Brands</option>
            {allBrands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-100 text-left text-gray-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Image</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Brand</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Discount</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/produklist/${item.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{item.brand}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2 font-bold">${item.price}</td>
                  <td className="px-4 py-2 text-red-600">{item.discount}%</td>
                  <td className="px-4 py-2 text-yellow-600">
                    {item.rating} ★
                  </td>
                  <td className="px-4 py-2">{item.stock}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No products found.
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