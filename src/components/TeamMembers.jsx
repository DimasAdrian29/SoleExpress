import React, { useEffect, useState } from "react";
import { teamAPI } from "../services/teamAPI";

export default function TeamMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      const data = await teamAPI.fetchTeamMembers({ page: 1, limit: 5 });
      setMembers(data);
    }
    fetchMembers();
  }, []);

  return (
    <section aria-label="Team Members" className="bg-white rounded-xl p-6 select-none">
      <h3 className="font-semibold text-[13px] mb-4">Team Members</h3>
      <ul className="flex flex-col gap-4">
        {members.map(({ id, name, position, photo }) => (
          <li key={id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                alt={`Profile of ${name}`}
                className="rounded-full w-8 h-8 object-cover"
                src={photo}
                height="32"
                width="32"
              />
              <div className="flex flex-col text-[12px]">
                <span className="font-semibold text-[#0f0f0f]">{name}</span>
                <span className="text-[10px] text-gray-500">{position}</span>
              </div>
            </div>
            <button className="text-[#3c50e0] text-[10px] font-semibold border border-[#3c50e0] rounded px-3 py-1 select-none">
              ADD
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
