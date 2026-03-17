"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getShipImage, getShipName, getPortName } from "@/lib/msc-mappings";
import { translateCanvas } from "@/lib/msc-translations";
import type { WorkstreamCruiseDetail } from "@/app/api/msc/workstream/cruise-detail/route";

function formatDate(str: string): string {
  if (!str) return "—";
  const d = new Date(str);
  return isNaN(d.getTime())
    ? str
    : d.toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
}

interface ItineraryDay {
  date: string;
  port?: { code: string; name: string };
  atSea?: boolean;
}

interface Props {
  cruise: WorkstreamCruiseDetail;
  onBack: () => void;
}

export function CruiseHero({ cruise, onBack }: Props) {
  const [itinPorts, setItinPorts] = useState<string[]>([]);
  const [loadingItin, setLoadingItin] = useState(true);

  useEffect(() => {
    async function fetchPorts() {
      try {
        const res = await fetch("/api/msc/itinerary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cruiseId: cruise.cruiseId }),
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        const days: ItineraryDay[] = data.days ?? [];
        const ports: string[] = [];
        for (const day of days) {
          if (!day.atSea && day.port?.name) {
            if (ports[ports.length - 1] !== day.port.name) {
              ports.push(day.port.name);
            }
          }
        }
        setItinPorts(ports);
      } catch {
        setItinPorts([]);
      } finally {
        setLoadingItin(false);
      }
    }
    fetchPorts();
  }, [cruise.cruiseId]);

  const fallbackPorts = cruise.canvasDesc
    ? cruise.canvasDesc.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const ports = itinPorts.length > 0 ? itinPorts : fallbackPorts;
  const destinationLabel = translateCanvas(cruise.canvasDesc) || getPortName(cruise.departurePort);
  const shipName = getShipName(cruise.shipCode, cruise.shipName);

  return (
    <div className="relative overflow-hidden" style={{ minHeight: "500px" }}>
      <div className="absolute inset-0">
        <Image src={getShipImage(cruise.shipCode)} alt={shipName} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a3a]/95 via-[#001a3a]/50 to-[#001a3a]/20" />
        <div className="absolute inset-0 opacity-[0.15]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")", backgroundSize: "128px" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-6 pb-8 flex flex-col justify-end min-h-[500px]">
        <button onClick={onBack} className="mb-auto flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors group w-fit">
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          Înapoi la rezultate
        </button>

        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full">
            🚢 {shipName}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
          {cruise.nights} nopți în{" "}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #60b8ff, #a5d8ff)" }}>
            {destinationLabel}
          </span>
        </h1>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-xs px-3 py-1.5 rounded-full">
            📅 {formatDate(cruise.sailingDate)}
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-xs px-3 py-1.5 rounded-full">
            🌙 {cruise.nights} nopți / {cruise.nights + 1} zile
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-xs px-3 py-1.5 rounded-full">
            ⚓ {cruise.departurePortDesc || getPortName(cruise.departurePort)}
          </span>
        </div>

        <div>
          <p className="text-white/40 text-[11px] uppercase tracking-widest mb-2.5 font-semibold">
            {loadingItin ? "Se încarcă circuitul..." : ports.length > 0 ? "Circuit complet" : ""}
          </p>
          {!loadingItin && ports.length > 0 && (
            <div className="flex flex-wrap items-center gap-0">
              {ports.map((port, i) => (
                <div key={`${port}-${i}`} className="flex items-center">
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 hover:bg-white/20 transition-colors cursor-default mb-1.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: i === 0 || i === ports.length - 1 ? "#60b8ff" : "rgba(255,255,255,0.5)" }}
                    />
                    <span className="text-white text-xs font-medium whitespace-nowrap">{port}</span>
                    {i === 0 && (
                      <span className="text-[9px] text-blue-300 font-bold bg-blue-500/20 px-1.5 py-0.5 rounded-full">START</span>
                    )}
                    {i === ports.length - 1 && i !== 0 && (
                      <span className="text-[9px] text-blue-300 font-bold bg-blue-500/20 px-1.5 py-0.5 rounded-full">FINAL</span>
                    )}
                  </div>
                  {i < ports.length - 1 && (
                    <div className="flex items-center px-1 mb-1.5">
                      <div className="w-3 h-px bg-white/25" />
                      <div className="w-1.5 h-1.5 border-t border-r border-white/25 rotate-45 -ml-0.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}