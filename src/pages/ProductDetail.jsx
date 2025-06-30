import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { dataSepatuAPI } from "../services/dataSepatuAPI";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const data = await dataSepatuAPI.fetchById(id);
      setProduct(data);
    } catch (error) {
      console.error("Gagal ambil data produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#5f73f2] text-white text-xl font-bold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#5f73f2] flex items-center justify-center rounded-2xl m-2">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="text-gray-600">The requested product does not exist.</p>
          <Link to="/produklist" className="text-blue-600 mt-4 inline-block hover:underline">Back to Produk List</Link>
        </div>
      </div>
    );
  }

  const tags = [product.tag1, product.tag2, product.tag3].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#5f73f2] p-4 md:p-6 lg:p-8 rounded-2xl m-2">
      <Header path="/ Pages / Produk / Detail" title="Detail Produk" />

              <h1 className="text-3xl font-bold text-white mb-6">Admin - Detail Produk</h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <img src={product.img} alt={product.name} className="w-full h-auto object-cover rounded-xl" />
          </div>
          <div className="md:w-1/2 p-6 space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Brand" value={product.brand} />
              <DetailItem label="Category" value={product.category} />
              <DetailItem label="Price" value={`Rp${product.price}`} />
              <DetailItem label="Discount" value={`${product.discount}%`} />
              <DetailItem label="Stock" value={product.stock > 0 ? `${product.stock} available` : 'Out of stock'} color={product.stock > 0 ? 'text-green-600' : 'text-red-600'} />
              <DetailItem label="Rating" value={`${product.rating} / 5.0`} />
              <DetailItem label="Size (L x W x H)" value={`${product.length} x ${product.width} x ${product.height} cm`} />
              <DetailItem label="Warranty" value={product.warranty} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">Description</h3>
              <p className="text-gray-700">{product.description || 'No description available.'}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span key={i} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Upper Material" value={product.upper_material} />
              <DetailItem label="Sole Material" value={product.sole_material} />
              <DetailItem label="Lining Material" value={product.lining_material} />
              <DetailItem label="Care Instructions" value={product.care_instructions} />
              <DetailItem label="Designed For" value={product.designed_for} />
            </div>

            <Link to="/produklist" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Back to Produk List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, color = "text-gray-800" }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500">{label}</h3>
      <p className={`text-md font-medium ${color}`}>{value}</p>
    </div>
  );
}
