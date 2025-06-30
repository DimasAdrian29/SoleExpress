import React, { useEffect, useState } from "react";
import { transaksiAPI } from "../services/transaksiAPI";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

export default function SalesOverview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAndProcess() {
      const transaksi = await transaksiAPI.fetchAll();

      // Group by date
      const grouped = {};
      transaksi.forEach((trx) => {
        const date = dayjs(trx.created_at).format("YYYY-MM-DD");
        if (!grouped[date]) {
          grouped[date] = 1;
        } else {
          grouped[date]++;
        }
      });

      // Convert to array and sort by date
      const result = Object.keys(grouped)
        .sort()
        .map((date) => ({
          date,
          transaksi: grouped[date],
        }));

      setData(result);
    }

    fetchAndProcess();
  }, []);

  return (
    <section
      aria-label="Sales overview"
      className="lg:col-span-8 bg-white rounded-xl p-6 select-none"
    >
      <div className="text-[13px] font-semibold text-[#0f0f0f] mb-2">Sales Overview</div>
      <div className="flex items-center gap-1 text-[11px] text-[#3cd68a] font-semibold mb-4">
        <i className="fas fa-arrow-up"></i>
        <span>{data.reduce((acc, d) => acc + d.transaksi, 0)} transaksi</span>
        <span className="font-normal text-[#a1a1a1] ml-1">tercatat</span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTransaksi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3c50e0" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3c50e0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" fontSize={10} />
          <YAxis allowDecimals={false} fontSize={10} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="transaksi"
            stroke="#3c50e0"
            fillOpacity={1}
            fill="url(#colorTransaksi)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}
