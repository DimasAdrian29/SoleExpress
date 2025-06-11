import React from 'react';

export default function Header({ path = "/ Pages / Default", title = "Default" }) {
  return (
    <div className="flex items-center gap-4 mb-6 text-white text-[13px] select-none relative">
      <div className="flex items-center gap-1">
        <i className="fas fa-lock text-[12px]"></i>
        <span>{path}</span>
      </div>
      <span className="font-semibold">{title}</span>

      <button
        aria-label="Toggle menu"
        className="ml-auto p-2 rounded hover:bg-[#4a5edb] md:hidden"
        type="button"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className="hidden md:flex items-center gap-4 absolute top-0 right-0 mt-1 text-white text-[13px]">
        <div className="relative">
          <input
            aria-label="Search input"
            className="bg-white rounded-md py-1 px-3 text-black text-[13px] w-40 focus:outline-none"
            placeholder="Type here..."
            type="search"
          />
          <i className="fas fa-search absolute right-2 top-1/2 -translate-y-1/2 text-[#a1a1a1] pointer-events-none"></i>
        </div>
        <button
          aria-label="Logout"
          onClick={() => window.location.href = "https://solexpress.vercel.app/"}
          className="flex items-center gap-1 text-white text-[13px] font-semibold"
          type="button"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
        <button
          aria-label="Settings"
          className="text-white text-[15px]"
          title="Settings"
          type="button"
        >
          <i className="fas fa-cog"></i>
        </button>
        <button
          aria-label="Notifications"
          className="text-white text-[15px]"
          title="Notifications"
          type="button"
        >
          <i className="fas fa-bell"></i>
        </button>
      </div>
    </div>
  );
}
