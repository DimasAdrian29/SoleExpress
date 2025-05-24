import React from 'react';

export default function SalesOverview() {
  return (
    <section
      aria-label="Sales overview"
      className="lg:col-span-8 bg-white rounded-xl p-6 select-none"
    >
      <div className="text-[13px] font-semibold text-[#0f0f0f] mb-2">Sales overview</div>
      <div className="flex items-center gap-1 text-[11px] text-[#3cd68a] font-semibold mb-4">
        <i className="fas fa-arrow-up"></i>
        <span>(+5) more</span>
        <span className="font-normal text-[#a1a1a1] ml-1">in 2021</span>
      </div>
      <svg
        aria-hidden="true"
        className="select-none"
        fill="none"
        height="160"
        viewBox="0 0 600 160"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3c50e0" stopOpacity="0.2"></stop>
            <stop offset="1" stopColor="#3c50e0" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
        <path
          d="M0 120 C40 120 80 80 120 80 C160 80 200 120 240 140 C280 160 320 120 360 100 C400 80 440 120 480 80 C520 40 560 140 600 120"
          fill="url(#gradient)"
          stroke="#3c50e0"
          strokeWidth="3"
        ></path>
        <line stroke="#d1d5db" strokeWidth="1" x1="0" x2="600" y1="140" y2="140"></line>
        <line stroke="#d1d5db" strokeWidth="1" x1="0" x2="600" y1="120" y2="120"></line>
        <line stroke="#d1d5db" strokeWidth="1" x1="0" x2="600" y1="100" y2="100"></line>
        <line stroke="#d1d5db" strokeWidth="1" x1="0" x2="600" y1="80" y2="80"></line>
        <line stroke="#d1d5db" strokeWidth="1" x1="0" x2="600" y1="60" y2="60"></line>
        <line stroke="#d1d5db" strokeWidth="1" x1="0" x2="600" y1="40" y2="40"></line>
        <line stroke="#d1d5db" strokeWidth="1" x1="0" x2="600" y1="20" y2="20"></line>
        <text fill="#a1a1a1" fontFamily="Inter" fontSize="10" x="0" y="155">Apr</text>
        <text fill="#a1a1a1" fontFamily="Inter" fontSize="10" x="50" y="155">May</text>
        <text fill="#a1a1a1" fontFamily="Inter" fontSize="10" x="100" y="155">Jun</text>
        <text fill="#a1a1a1" fontFamily="Inter" fontSize="10" x="150" y="155">Jul</text>
        <text fill="#a1a1a1" fontFamily="Inter" fontSize="10" x="200" y="155">Aug</text>
        <text fill="#a1a1a1" fontFamily="Inter" fontSize="10" x="250" y="155">Sep</text>
        <text fill="#a1a1a1" fontFamily="Inter" fontSize="10" x="300" y="155">Oct</text>
        <text fill="#a1a1a1" fontFamily="Inter" fontSize="10" x="350" y="155">Nov</text>
        <text fill="#a1a1a1" fontFamily="Inter" fontSize="10" x="400" y="155">Dec</text>
      </svg>
    </section>
  );
}