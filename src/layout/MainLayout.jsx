import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout(){
    return(
        <div id="app-container" className="bg-gray-100 min-h-screen flex">
<Sidebar />
    <div id="layout-wrapper" className="flex flex-row flex-1">
      
      <div id="main-content" className="flex-1 p-4">
       
      <Outlet/>
      </div>
    </div>
  </div>
    )
}