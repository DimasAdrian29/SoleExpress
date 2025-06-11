import { useParams } from "react-router-dom";
import productsData from "../dataSepatu.json";

export default function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#5f73f2] flex items-center justify-center rounded-2xl m-2">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The requested product does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#5f73f2]">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Brand</h3>
                  <p className="text-lg">{product.brand}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Category</h3>
                  <p className="text-lg">{product.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Price</h3>
                  <p className="text-xl font-bold text-blue-600">
                    ${product.price}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Discount</h3>
                  <p className="text-lg text-red-500">{product.discount}% OFF</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500">Description</h3>
                <p className="text-gray-700">{product.description || "No description available"}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500">Rating</h3>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-xl mr-2">
                    {"★".repeat(Math.floor(product.rating))}
                  </span>
                  <span className="text-gray-700 text-lg">
                    {product.rating} / 5.0
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500">Stock</h3>
                <p className={`text-lg ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                  
                   <a 
            href="/produklist" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Produk List
          </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}