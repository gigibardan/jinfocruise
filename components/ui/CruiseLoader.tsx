// components/ui/CruiseLoader.tsx
// Vaporas SVG animat pe valuri — înlocuiește spinner-ul plictisitor

interface CruiseLoaderProps {
  message?: string;
  submessage?: string;
}

export function CruiseLoader({
  message = "Se încarcă croazierele...",
  submessage = "Căutăm cele mai bune oferte pentru tine",
}: CruiseLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 select-none">
      <style>{`
        @keyframes ship-sail {
          0%   { transform: translateX(-8px) rotate(-1deg); }
          25%  { transform: translateX(0px)  rotate(0.5deg); }
          50%  { transform: translateX(8px)  rotate(1deg); }
          75%  { transform: translateX(0px)  rotate(-0.5deg); }
          100% { transform: translateX(-8px) rotate(-1deg); }
        }
        @keyframes wave-move {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave-move-slow {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes smoke-rise {
          0%   { opacity: 0.7; transform: translateY(0) scale(1); }
          100% { opacity: 0;   transform: translateY(-18px) scale(1.6); }
        }
        @keyframes smoke-rise-2 {
          0%   { opacity: 0.5; transform: translateY(0) scale(1); }
          100% { opacity: 0;   transform: translateY(-14px) scale(1.4); }
        }
        @keyframes flag-wave {
          0%, 100% { transform-origin: left center; transform: skewX(0deg); }
          50%       { transform-origin: left center; transform: skewX(12deg); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1; }
        }

        .ship-animate     { animation: ship-sail 3s ease-in-out infinite; }
        .wave-fast        { animation: wave-move 2.5s linear infinite; }
        .wave-slow        { animation: wave-move-slow 4s linear infinite; }
        .smoke-1          { animation: smoke-rise 2s ease-out infinite; }
        .smoke-2          { animation: smoke-rise 2s ease-out 0.7s infinite; }
        .smoke-3          { animation: smoke-rise-2 1.8s ease-out 1.3s infinite; }
        .flag-anim        { animation: flag-wave 1.2s ease-in-out infinite; }
        .dot-1            { animation: dot-bounce 1.4s ease-in-out 0s infinite; }
        .dot-2            { animation: dot-bounce 1.4s ease-in-out 0.2s infinite; }
        .dot-3            { animation: dot-bounce 1.4s ease-in-out 0.4s infinite; }
      `}</style>

      {/* SVG Scene */}
      <div className="relative w-72 h-40 mb-6">
        <svg
          viewBox="0 0 320 160"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Sky gradient */}
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1628"/>
              <stop offset="100%" stopColor="#0d3060"/>
            </linearGradient>
            <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d4b8c"/>
              <stop offset="100%" stopColor="#0a2a5e"/>
            </linearGradient>
            <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#d4e8f8"/>
            </linearGradient>
            <linearGradient id="hull-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a3a6b"/>
              <stop offset="100%" stopColor="#0d2549"/>
            </linearGradient>
            <clipPath id="sea-clip">
              <rect x="0" y="95" width="320" height="65"/>
            </clipPath>
          </defs>

          {/* Background */}
          <rect width="320" height="160" fill="url(#sky)"/>

          {/* Stars */}
          {[[20,15],[60,8],[100,20],[150,5],[200,18],[250,10],[290,22],[35,30],[180,28]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="1" fill="white" opacity="0.5"/>
          ))}

          {/* Moon */}
          <circle cx="270" cy="25" r="10" fill="#fef3c7" opacity="0.9"/>
          <circle cx="275" cy="22" r="8"  fill="#0a1628" opacity="0.95"/>

          {/* Sea base */}
          <rect x="0" y="100" width="320" height="60" fill="url(#sea)"/>

          {/* Wave layer 1 (back, slow) */}
          <g clipPath="url(#sea-clip)">
            <g className="wave-slow" style={{ willChange: "transform" }}>
              {/* Double wide for seamless loop */}
              <path
                d="M0,100 Q20,94 40,100 Q60,106 80,100 Q100,94 120,100 Q140,106 160,100 Q180,94 200,100 Q220,106 240,100 Q260,94 280,100 Q300,106 320,100
                   M320,100 Q340,94 360,100 Q380,106 400,100 Q420,94 440,100 Q460,106 480,100 Q500,94 520,100 Q540,106 560,100 Q580,94 600,100 Q620,106 640,100"
                fill="none"
                stroke="#1a5fa8"
                strokeWidth="2"
                opacity="0.5"
              />
            </g>

            {/* Wave layer 2 (front, fast, bright) */}
            <g className="wave-fast" style={{ willChange: "transform" }}>
              <path
                d="M0,108 Q16,102 32,108 Q48,114 64,108 Q80,102 96,108 Q112,114 128,108 Q144,102 160,108 Q176,114 192,108 Q208,102 224,108 Q240,114 256,108 Q272,102 288,108 Q304,114 320,108
                   M320,108 Q336,102 352,108 Q368,114 384,108 Q400,102 416,108 Q432,114 448,108 Q464,102 480,108 Q496,114 512,108 Q528,102 544,108 Q560,114 576,108 Q592,102 608,108 Q624,114 640,108"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                opacity="0.7"
              />
            </g>

            {/* Foam crests */}
            <g className="wave-fast" style={{ willChange: "transform" }}>
              {[16,80,144,208,272,336,400,464,528,592].map((x, i) => (
                <ellipse key={i} cx={x} cy={108} rx="6" ry="2" fill="white" opacity="0.3"/>
              ))}
            </g>
          </g>

          {/* ── SHIP ── */}
          <g className="ship-animate" style={{ willChange: "transform" }}>
            {/* Hull dark (waterline) */}
            <path d="M90,103 L95,115 L225,115 L230,103 Z" fill="url(#hull-dark)"/>
            {/* Hull white (above waterline) */}
            <rect x="95" y="88" width="130" height="16" rx="2" fill="url(#hull)"/>
            {/* Red stripe */}
            <rect x="95" y="98" width="130" height="4" fill="#dc2626" opacity="0.8"/>
            {/* Portholes */}
            {[115, 135, 155, 175, 195, 215].map((x) => (
              <circle key={x} cx={x} cy="93" r="3" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="0.5"/>
            ))}

            {/* Superstructure deck 1 */}
            <rect x="110" y="72" width="100" height="18" rx="2" fill="#f8fafc"/>
            <rect x="110" y="82" width="100" height="4" fill="#e2e8f0"/>
            {/* Portholes deck 1 */}
            {[124, 144, 164, 184, 200].map((x) => (
              <circle key={x} cx={x} cy="77" r="2.5" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="0.5"/>
            ))}

            {/* Superstructure deck 2 */}
            <rect x="125" y="58" width="70" height="16" rx="2" fill="#f1f5f9"/>
            <rect x="125" y="66" width="70" height="3" fill="#cbd5e1"/>
            {[138, 154, 170, 186].map((x) => (
              <circle key={x} cx={x} cy="62" r="2" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="0.5"/>
            ))}

            {/* Bridge deck */}
            <rect x="142" y="46" width="36" height="14" rx="2" fill="#e0eeff"/>
            <rect x="144" y="48" width="12" height="8" rx="1" fill="#bfdbfe" opacity="0.8"/>
            <rect x="158" y="48" width="12" height="8" rx="1" fill="#bfdbfe" opacity="0.8"/>

            {/* Funnel */}
            <rect x="172" y="36" width="12" height="18" rx="2" fill="#1e3a5f"/>
            <rect x="172" y="36" width="12" height="5" rx="1" fill="#dc2626"/>
            {/* MSC stripe on funnel */}
            <rect x="172" y="41" width="12" height="3" fill="#fbbf24"/>

            {/* Smoke particles */}
            <circle className="smoke-1" cx="178" cy="34" r="3" fill="#94a3b8" opacity="0.7"/>
            <circle className="smoke-2" cx="175" cy="32" r="2.5" fill="#94a3b8" opacity="0.5"/>
            <circle className="smoke-3" cx="181" cy="33" r="2" fill="#cbd5e1" opacity="0.5"/>

            {/* Mast */}
            <line x1="160" y1="46" x2="160" y2="22" stroke="#94a3b8" strokeWidth="1.5"/>
            {/* Flag */}
            <g className="flag-anim">
              <rect x="160" y="22" width="14" height="9" rx="1" fill="#185FA5"/>
              <rect x="160" y="22" width="14" height="3" fill="#185FA5"/>
              <rect x="160" y="25" width="14" height="3" fill="white"/>
              <rect x="160" y="28" width="14" height="3" fill="#dc2626"/>
            </g>

            {/* Anchor light */}
            <circle cx="160" cy="21" r="1.5" fill="#fef08a" opacity="0.9"/>

            {/* Wake / bow wave */}
            <path d="M90,107 Q80,105 70,108 Q60,111 50,108" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>
            <path d="M230,107 Q240,105 250,108 Q260,111 270,108" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
          </g>

          {/* Reflection shimmer */}
          <g clipPath="url(#sea-clip)" opacity="0.15">
            <path d="M130,118 Q160,115 190,118 Q160,122 130,118 Z" fill="white"/>
          </g>
        </svg>
      </div>

      {/* Text */}
      <p className="text-gray-800 font-bold text-lg mb-1">{message}</p>
      <p className="text-gray-400 text-sm mb-5">{submessage}</p>

      {/* Animated dots */}
      <div className="flex items-center gap-2">
        <div className="dot-1 w-2.5 h-2.5 rounded-full bg-[#185FA5]"/>
        <div className="dot-2 w-2.5 h-2.5 rounded-full bg-[#185FA5]"/>
        <div className="dot-3 w-2.5 h-2.5 rounded-full bg-[#185FA5]"/>
      </div>
    </div>
  );
}