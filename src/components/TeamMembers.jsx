import React from 'react';

export default function TeamMembers() {
  const members = [
    {
      name: 'John Michael',
      status: 'ONLINE',
      statusColor: 'bg-[#3cd68a]',
      img: 'https://storage.googleapis.com/a1aa/image/5dc78e83-ad1b-4ed1-d98d-bf09fc0b74a0.jpg',
    },
    {
      name: 'Alex Smith',
      status: 'ONLINE',
      statusColor: 'bg-[#f44336]',
      img: 'https://storage.googleapis.com/a1aa/image/f2caa7d8-c15d-4228-bdad-2b7b10f7c0fb.jpg',
    },
    {
      name: 'Samantha Ivy',
      status: 'ONLINE',
      statusColor: 'bg-[#f44336]',
      img: 'https://storage.googleapis.com/a1aa/image/fd2ea66f-1d4f-41ae-dd4e-28022a53b7bc.jpg',
    },
    {
      name: 'John Michael',
      status: 'ONLINE',
      statusColor: 'bg-[#3cd68a]',
      img: 'https://storage.googleapis.com/a1aa/image/5dc78e83-ad1b-4ed1-d98d-bf09fc0b74a0.jpg',
    },
  ];
  return (
    <section aria-label="Team Members" className="bg-white rounded-xl p-6 select-none">
      <h3 className="font-semibold text-[13px] mb-4">Team Members</h3>
      <ul className="flex flex-col gap-4">
        {members.map(({ name, status, statusColor, img }, i) => (
          <li key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                alt={`Profile picture of ${name}`}
                className="rounded-full w-8 h-8 object-cover"
                draggable="false"
                height="32"
                src={img}
                width="32"
              />
              <div className="flex flex-col text-[12px]">
                <span className="font-semibold text-[#0f0f0f]">{name}</span>
                <span
                  className={`${statusColor} text-white text-[9px] font-semibold rounded px-1 select-none`}
                >
                  {status}
                </span>
              </div>
            </div>
            <button
              className="text-[#3c50e0] text-[10px] font-semibold border border-[#3c50e0] rounded px-3 py-1 select-none"
              type="button"
            >
              ADD
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}