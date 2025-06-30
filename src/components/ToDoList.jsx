import React, { useEffect, useState } from "react";
import { transaksiAPI } from "../services/transaksiAPI";
import dayjs from "dayjs";

export default function ToDoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetch() {
      const data = await transaksiAPI.getLatest(5);
      const formatted = data.map((item) => ({
        label: item.ekspedisi || "Pengiriman",
        time: dayjs(item.created_at).format("HH:mm"),
        checked: false,
      }));
      setTodos(formatted);
    }
    fetch();
  }, []);

  return (
    <section aria-label="To Do List" className="bg-white rounded-xl p-6 select-none">
      <h3 className="font-semibold text-[13px] mb-4">To Do List</h3>
      <ul className="flex flex-col gap-4 text-[12px] text-[#0f0f0f]">
        {todos.map(({ label, time, checked }, i) => (
          <li key={i} className="flex items-center justify-between">
            <div>
              <span className="font-semibold">{label}</span>
              <div className="text-[10px] text-[#a1a1a1]">{time}</div>
            </div>
            <input
              aria-label={`${label} completed`}
              type="checkbox"
              className="w-4 h-4 text-[#3c50e0] border border-[#a1a1a1] rounded"
              defaultChecked={checked}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
