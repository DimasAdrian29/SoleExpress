import React from 'react';

export default function GetStarted() {
  return (
    <section
      aria-label="Get started with Argon"
      className="lg:col-span-4 bg-gradient-to-tr from-[#7f4fff] to-[#b56fff] rounded-xl p-6 relative text-white select-none"
    >
      <img
        alt="Person wearing a VR headset with purple lighting and futuristic background"
        className="rounded-xl object-cover w-full h-full absolute inset-0 -z-10"
        draggable="false"
        height="240"
        src="https://storage.googleapis.com/a1aa/image/7bd5ef23-cd61-419d-7bf1-4bb7a89f9330.jpg"
        width="400"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7f4fff]/90 to-[#b56fff]/90 rounded-xl -z-5"></div>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-white bg-opacity-20 rounded p-1 flex items-center justify-center w-7 h-7">
          <i className="fas fa-camera text-white text-[12px]"></i>
        </div>
      </div>
      <h2 className="font-semibold text-[15px] mb-1">Get started with Argon</h2>
      <p className="text-[11px] leading-tight max-w-[280px]">
        There’s nothing I really wanted to do in life that I wasn’t able to get good at.
      </p>
    </section>
  );
}