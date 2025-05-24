import React from "react";
import MenuList from "./MenuList";


export default function Sidebar() {
  return (
    <aside className="flex flex-col bg-[#3c50e0] w-64 min-h-screen pt-6 pb-8 px-5 text-[13px] text-[#0f0f0f]">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded border border-[#0f0f0f] flex items-center justify-center text-[#0f0f0f]">
          <i className="fas fa-smile-beam text-[18px]"></i>
        </div>
        <span className="font-bold text-[13px] text-[#0f0f0f] select-none">
          SoleExpress Admin
        </span>
      </div>

      {/* Menu List */}
      <MenuList />
    </aside>
  );
}
