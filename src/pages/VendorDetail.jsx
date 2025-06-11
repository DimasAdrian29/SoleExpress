import { useParams } from "react-router-dom";
import vendorsData from "../DataVendor.json";

export default function VendorDetail() {
  const { id } = useParams();
  const vendor = vendorsData.find(v => v.id === parseInt(id));

  if (!vendor) {
    return (
      <div className="min-h-screen bg-[#5f73f2] flex items-center justify-center rounded-2xl m-2">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Vendor Not Found</h2>
          <p className="text-gray-600 mb-6">
            The vendor you're looking for doesn't exist or has been removed.
          </p>
          <a 
            href="/vendorlist" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Vendor List
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#5f73f2] py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">{vendor.name}</h1>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {vendor.headquarters_location}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    Since {vendor.year_established}
                  </span>
                </div>
              </div>
              <a 
                href={vendor.website} 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Visit Website
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800">About</h2>
                  <p className="text-gray-600">{vendor.description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800">Contact Information</h2>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-gray-600">{vendor.contact_info.email}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <span className="text-gray-600">{vendor.contact_info.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800">Product Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {vendor.product_categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800">Popular Products</h2>
                  <ul className="space-y-2">
                    {vendor.popular_products.map((product, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-600">{product}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800">Key Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-sm font-semibold text-blue-800">Annual Revenue</h3>
                      <p className="text-lg font-bold text-blue-600">
                        ${(vendor.annual_revenue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-sm font-semibold text-green-800">Employee Count</h3>
                      <p className="text-lg font-bold text-green-600">
                        {vendor.employee_count}+
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Certifications & Partnerships</h2>
              <div className="flex flex-wrap gap-3">
                {vendor.certifications?.map((cert, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                  >
                    {cert}
                  </span>
                ))}
                {vendor.partnerships?.map((partner, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {partner}
                  </span>
                ))}
                 <a 
            href="/vendorlist" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Vendor List
          </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}