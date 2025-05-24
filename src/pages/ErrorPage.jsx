export default function ErrorPage({
  errorCode = "404",
  errorTitle = "OOOPS ! PAGE NOT FOUND",
  errorDescription = "Sorry the page you are looking for does not exist, if you think something is broken, report a problem",
}) {
  // Confetti positions array
  const confetti = [
    { top: "top-10", left: "left-5", size: "w-4 h-4", rotate: "rotate-12" },
    { top: "top-20", right: "right-10", size: "w-3 h-3", rotate: "rotate-45" },
    { top: "top-28", left: "left-20", size: "w-4 h-4", rotate: "rotate-6" },
    { top: "top-36", right: "right-28", size: "w-3 h-3", rotate: "rotate-45" },
    { top: "top-44", left: "left-10", size: "w-4 h-4", rotate: "rotate-12" },
    { top: "top-52", right: "right-20", size: "w-3 h-3", rotate: "rotate-45" },
    { top: "top-60", left: "left-28", size: "w-4 h-4", rotate: "rotate-6" },
    { top: "top-72", right: "right-5", size: "w-3 h-3", rotate: "rotate-45" },
    { top: "top-80", left: "left-16", size: "w-4 h-4", rotate: "rotate-12" },
    { top: "top-96", right: "right-24", size: "w-3 h-3", rotate: "rotate-45" },
    { top: "top-96", left: "left-5", size: "w-4 h-4", rotate: "rotate-6" },
    { top: "top-10", right: "right-40", size: "w-3 h-3", rotate: "rotate-45" },
    { top: "top-24", left: "left-36", size: "w-4 h-4", rotate: "rotate-12" },
    { top: "top-40", right: "right-36", size: "w-3 h-3", rotate: "rotate-45" },
    { top: "top-56", left: "left-40", size: "w-4 h-4", rotate: "rotate-6" },
  ];

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden px-4">
      {/* Confetti squares */}
      {confetti.map((c, idx) => (
        <div
          key={idx}
          className={`pointer-events-none absolute ${c.top} ${c.left || c.right} ${c.size} bg-blue-300 ${c.rotate}`}
        />
      ))}

      {/* Content */}
      <div className="text-center max-w-xl">
        <h1 className="text-[96px] font-extrabold text-[#1e3a8a] leading-none">{errorCode}</h1>
        <h2 className="text-xl font-semibold text-black mt-2">{errorTitle}</h2>
        <p className="text-base text-black mt-2">{errorDescription}</p>

        <div className="mt-8 flex justify-center gap-12 flex-wrap">
          <a
            href="/"
            className="px-4 py-2 border border-blue-600 rounded text-black text-sm hover:bg-blue-50 transition"
          >
            Return Home
          </a>
          <a
            href="/report"
            className="px-4 py-2 bg-blue-600 rounded text-white text-sm hover:bg-blue-700 transition"
          >
            Report Problem
          </a>
        </div>
      </div>
    </div>
  );
}