import React from 'react';

export default function ProgressTrack() {
  const tracks = [
    {
      icon: 'fab fa-react',
      color: '#3c50e0',
      label: 'React Material Dashboard',
      width: '40%',
    },
    {
      icon: 'fab fa-adobe',
      color: '#f44336',
      label: 'Argon Design System',
      width: '75%',
    },
    {
      icon: 'fab fa-spotify',
      color: '#1abc9c',
      label: 'VueJs Now UI Kit PRO',
      width: '60%',
    },
    {
      icon: 'fab fa-slack',
      color: '#3c50e0',
      label: 'Soft UI Dashboard',
      width: '50%',
    },
  ];
  return (
    <section aria-label="Progress Track" className="bg-white rounded-xl p-6 select-none">
      <h3 className="font-semibold text-[13px] mb-4">Progress Track</h3>
      <ul className="flex flex-col gap-6 text-[12px] text-[#0f0f0f]">
        {tracks.map(({ icon, color, label, width }, i) => (
          <li key={i}>
            <div className="flex items-center gap-2 mb-1">
              <i className={`${icon}`} style={{ color, fontSize: '18px' }}></i>
              <span className="font-semibold">{label}</span>
            </div>
            <div className="w-full h-[3px] bg-[#e5e7eb] rounded-full">
              <div
                className="h-[3px] rounded-full"
                style={{ backgroundColor: color, width }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}