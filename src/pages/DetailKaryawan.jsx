import { useParams } from "react-router-dom";
import karyawanData from "../dataKaryawan.json";

export default function DetailKaryawan() {
  const { id } = useParams();
  const karyawan = karyawanData.find(k => k.id === parseInt(id));

  if (!karyawan) {
    return (
      <div className="min-h-screen bg-[#5f73f2] flex items-center justify-center rounded-2xl m-2">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Karyawan Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">
            Karyawan yang Anda cari tidak ditemukan di database.
          </p>
          <a 
            href="/team" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Daftar Tim
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
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={karyawan.foto}
                alt={karyawan.nama}
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-6"
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{karyawan.nama}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {karyawan.jabatan}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    ID: {karyawan.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Kolom Kiri - Informasi Pribadi */}
              <div className="md:col-span-1">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">
                    Informasi Pribadi
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-700">{karyawan.email || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">No. Telepon</p>
                      <p className="text-gray-700">{karyawan.telepon || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Lahir</p>
                      <p className="text-gray-700">{karyawan.tanggal_lahir || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Alamat</p>
                      <p className="text-gray-700">{karyawan.alamat || "-"}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">
                    Keahlian
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {karyawan.keahlian?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {(!karyawan.keahlian || karyawan.keahlian.length === 0) && (
                      <p className="text-gray-500">Tidak ada data keahlian</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Kolom Kanan - Informasi Profesional */}
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">
                    Profil Profesional
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {karyawan.deskripsi || "Tidak ada deskripsi profil."}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">Tanggal Bergabung</p>
                      <p className="text-lg font-bold text-blue-600">
                        {karyawan.tanggal_bergabung || "-"}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">Status</p>
                      <p className="text-lg font-bold text-green-600">
                        {karyawan.status || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">
                    Riwayat Pendidikan
                  </h2>
                  {karyawan.pendidikan?.length > 0 ? (
                    <ul className="space-y-3">
                      {karyawan.pendidikan.map((edu, index) => (
                        <li key={index} className="border-l-4 border-blue-500 pl-4 py-1">
                          <p className="font-semibold">{edu.jenjang} - {edu.jurusan}</p>
                          <p className="text-gray-600">{edu.institusi}</p>
                          <p className="text-sm text-gray-500">{edu.tahun}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Tidak ada data pendidikan</p>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">
                    Pengalaman Kerja
                  </h2>
                  {karyawan.pengalaman?.length > 0 ? (
                    <ul className="space-y-4">
                      {karyawan.pengalaman.map((exp, index) => (
                        <li key={index} className="border-l-4 border-green-500 pl-4 py-1">
                          <p className="font-semibold">{exp.posisi}</p>
                          <p className="text-gray-600">{exp.perusahaan}</p>
                          <p className="text-sm text-gray-500">{exp.durasi}</p>
                          <p className="text-gray-700 mt-1">{exp.deskripsi}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Tidak ada data pengalaman kerja</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bagian Prestasi */}
            {karyawan.prestasi && karyawan.prestasi.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Prestasi</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {karyawan.prestasi.map((achievement, index) => (
                    <div key={index} className="bg-yellow-50 p-4 rounded-lg">
                      <p className="font-semibold text-yellow-700">{achievement.nama}</p>
                      <p className="text-sm text-gray-600">{achievement.tahun}</p>
                      <p className="text-gray-700 mt-2">{achievement.deskripsi}</p>
                    </div>
                  ))}
              
                  
                </div>
              </div>
            )} <br />
            <a 
            href="/Karyawanlist" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Karyawan list
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}