import React from 'react';

export default function ToDoList() {
  const todos = [
    { label: 'Call with Dave', time: '09:30 AM', checked: true },
    { label: 'Brunch meeting', time: '11:00 AM', checked: false },
    { label: 'Argon Dashboard Lunch', time: '02:00 PM', checked: false },
    { label: 'Winter Hackaton', time: '11:30 AM', checked: true },
  ];
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