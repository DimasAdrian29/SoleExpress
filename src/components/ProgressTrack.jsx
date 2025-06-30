import React, { useEffect, useState } from "react";
import { dataSepatuAPI } from "../services/dataSepatuAPI";

export default function ProgressTrack() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await dataSepatuAPI.getLatest(4);
      const maxStok = Math.max(...data.map((item) => item.stock || 0), 1); // hindari div by 0
      const colorList = ["#3c50e0", "#f44336", "#1abc9c", "#ff9800"];

      const transformed = data.map((item, index) => ({
        label: item.name,
        icon: "fas fa-shoe-prints",
        color: colorList[index % colorList.length],
        width: `${Math.round((item.stock / maxStok) * 100)}%`,
      }));

      setTracks(transformed);
    }

    fetchData();
  }, []);

  return (
    <section aria-label="Progress Track" className="bg-white rounded-xl p-6 select-none">
      <h3 className="font-semibold text-[13px] mb-4">Progress Track</h3>
      <ul className="flex flex-col gap-6 text-[12px] text-[#0f0f0f]">
        {tracks.map(({ icon, color, label, width }, i) => (
          <li key={i}>
            <div className="flex items-center gap-2 mb-1">
              <i className={icon} style={{ color, fontSize: "18px" }}></i>
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
