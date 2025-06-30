import { GiConverseShoe, GiSonicShoes } from "react-icons/gi"; 
import React from "react";
import MenuList from "./MenuList";

export default function Sidebar() {
  return (
    <aside className="flex flex-col bg-[#5f73f2] w-64 min-h-screen pt-6 pb-8 px-5 text-[13px] text-[#0f0f0f] rounded-2xl m-2">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
      
       <GiSonicShoes  className="text-xl"/>
        <span className="font-bold text-[13px] text-white select-none">
          SoleExpress Admin
        </span>
      </div>

      {/* Menu List */}
      <MenuList />
    </aside>
  );
}
