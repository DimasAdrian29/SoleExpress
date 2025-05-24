import React from 'react';

export default function Card({ title, value, percent, percentColor, description, icon, iconBg }) {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center justify-between gap-4">
      <div className="flex flex-col text-[11px] text-[#a1a1a1]">
        <span>{title}</span>
        <span className="font-bold text-[18px] text-[#0f0f0f] mt-1">{value}</span>
        <span className={`${percentColor} mt-1 font-semibold text-[11px]`}>
          {percent}
          <span className="font-normal text-[#a1a1a1]"> {description}</span>
        </span>
      </div>
      <div className={`${iconBg} rounded-full w-10 h-10 flex items-center justify-center`}>
        <i className={`${icon} text-white text-[18px]`}></i>
      </div>
    </div>
  );
}