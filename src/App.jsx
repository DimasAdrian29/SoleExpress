
import React, { Suspense } from "react";
import "./assets/tailwind.css";

import { Route, Routes } from 'react-router-dom';
import Loading from "./components/Loading";
import '@fortawesome/fontawesome-free/css/all.css';
import ProductDetail from "./pages/ProductDetail";
import VendorDetail from "./pages/VendorDetail";
import DetailKaryawan from "./pages/DetailKaryawan";
import GaleriDetail from "./pages/GaleriDetail";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const ProductList = React.lazy(() => import("./pages/ProdukList"));
const TeamManagement = React.lazy(() => import("./pages/TeamManagement"));
const GaleriManagement = React.lazy(() => import("./pages/GaleriManagement"));
const VendorList = React.lazy(() => import("./pages/VendorList"));
const MainLayout = React.lazy(() => import("./layout/MainLayout"));
const AuthLayout = React.lazy(() => import("./layout/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));


function App() {


  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produklist" element={<ProductList />} />
          <Route path="/vendorlist" element={<VendorList />} />
          <Route path="/Karyawanlist" element={<TeamManagement />} />
          <Route path="/galerilist" element={<GaleriManagement />} />
        <Route path="/produklist/:id" element={<ProductDetail />} />
         <Route path="/vendorlist/:id" element={<VendorDetail />} />
          <Route path="/Karyawanlist/:id" element={<DetailKaryawan />} />
          <Route path="/galerilist/:id" element={<GaleriDetail />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/*" element={<ErrorPage
          errorCode="halaman tidak ada"
          errorTitle="Halaman Tidak Ditemukan"
          errorDescription="Halaman yang Anda cari mungkin telah dihapus atau dipindahkan."
          image="/images/404-error.png"
        />} />
        <Route path="/ErrorPage400" element={<ErrorPage
          errorCode="400"
          errorTitle="Halaman Tidak Ditemukan"
          errorDescription="Halaman yang Anda cari mungkin telah dihapus atau dipindahkan."
          image="/images/404-error.png"
        />} />
        <Route path="/ErrorPage401" element={<ErrorPage
          errorCode="401"
          errorTitle="Halaman Tidak Ditemukan"
          errorDescription="Halaman yang Anda cari mungkin telah dihapus atau dipindahkan."
          image="/images/404-error.png"
        />} />
        <Route path="/ErrorPage403" element={<ErrorPage
          errorCode="403"
          errorTitle="Halaman Tidak Ditemukan"
          errorDescription="Halaman yang Anda cari mungkin telah dihapus atau dipindahkan."
          image="/images/404-error.png"
        />} />


      </Routes>
    </Suspense>
  )
}

export default App
