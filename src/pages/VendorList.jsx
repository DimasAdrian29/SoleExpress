import { useState } from "react";
import { Link } from "react-router-dom";
import vendorsData from "../DataVendor.json";
import Header from "../components/Header";

export default function VendorList() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    selectedLocation: ""
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // Get unique values for filters
  const allCategories = [...new Set(vendorsData.flatMap(vendor => vendor.product_categories))];
  const allLocations = [...new Set(vendorsData.map(vendor => vendor.headquarters_location))];

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredVendors = vendorsData.filter((vendor) => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(_searchTerm) ||
      vendor.headquarters_location.toLowerCase().includes(_searchTerm);

    const matchesCategory = dataForm.selectedCategory
      ? vendor.product_categories.includes(dataForm.selectedCategory)
      : true;

    const matchesLocation = dataForm.selectedLocation
      ? vendor.headquarters_location === dataForm.selectedLocation
      : true;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="flex min-h-screen bg-[#5f73f2]">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <Header path="/ Pages / Vendor" title="Vendor" />
        <h1 className="text-3xl font-bold text-white mb-8">Admin - Vendor Management</h1>

        {/* Filter Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            value={dataForm.searchTerm}
            name="searchTerm"
            placeholder="Search by name or location..."
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 outline-none bg-white"
            onChange={handleChange}
          />

          <select
            value={dataForm.selectedCategory}
            name="selectedCategory"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 outline-none bg-white"
            onChange={handleChange}
          >
            <option value="">All Categories</option>
            {allCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            name="selectedLocation"
            value={dataForm.selectedLocation}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 outline-none bg-white"
            onChange={handleChange}
          >
            <option value="">All Locations</option>
            {allLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-100 text-left text-gray-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Vendor</th>
                <th className="px-4 py-3 font-semibold">Established</th>
                <th className="px-4 py-3 font-semibold">Headquarters</th>
                <th className="px-4 py-3 font-semibold">Categories</th>
                <th className="px-4 py-3 font-semibold">Popular Products</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Website</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-semibold">
                    <Link
                      to={`/vendorlist/${vendor.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {vendor.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{vendor.year_established}</td>
                  <td className="px-4 py-2">{vendor.headquarters_location}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {vendor.product_categories.map((category, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {vendor.popular_products.slice(0, 3).map((product, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col">
                      <span className="text-blue-600">{vendor.contact_info.email}</span>
                      <span className="text-gray-600">{vendor.contact_info.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <a 
                      href={vendor.website} 
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </td>
                </tr>
              ))}
              {filteredVendors.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No vendors found.
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