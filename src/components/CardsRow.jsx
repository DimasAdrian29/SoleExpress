import React, { useEffect, useState } from "react";
import Card from "./Card";
import { dataSepatuAPI } from "../services/dataSepatuAPI";
import { transaksiAPI } from "../services/transaksiAPI";
import { teamAPI } from "../services/teamAPI";

export default function CardsRow() {
  const [produkCount, setProdukCount] = useState(0);
  const [transaksiCount, setTransaksiCount] = useState(0);
  const [timCount, setTimCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const [sepatu, transaksi, tim] = await Promise.all([
        dataSepatuAPI.fetchAll(),
        transaksiAPI.fetchAll(),
        teamAPI.fetchTeamMembers({ page: 1, limit: 100 })
      ]);
      setProdukCount(sepatu.length);
      setTransaksiCount(transaksi.length);
      setTimCount(tim.length);
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card
        title="Total Produk"
        value={`${produkCount}`}
        percent="+12%"
        percentColor="text-[#3c50e0]"
        description="sepatu terdaftar"
        icon="fas fa-shoe-prints"
        iconBg="bg-[#3c50e0]"
      />
      <Card
        title="Total Transaksi"
        value={`${transaksiCount}`}
        percent="+6%"
        percentColor="text-[#3cd68a]"
        description="proses pembelian"
        icon="fas fa-shopping-bag"
        iconBg="bg-[#f44336]"
      />
      <Card
        title="Anggota Tim"
        value={`${timCount}`}
        percent="+2%"
        percentColor="text-[#f44336]"
        description="aktif saat ini"
        icon="fas fa-user-friends"
        iconBg="bg-[#1abc9c]"
      />
      <Card
        title="Statistik"
        value="Lihat Sales"
        percent="+5%"
        percentColor="text-[#3cd68a]"
        description="trending positif"
        icon="fas fa-chart-line"
        iconBg="bg-[#f57c00]"
      />
    </div>
  );
}
