"use client";

import { useEffect, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortImages {
    desktop?: { optimisedImage?: string; image?: string };
}

interface ItineraryPort {
    code: string;
    name: string;
    images?: PortImages;
}

interface ItineraryDay {
    date: string;
    dayOfWeek: string;
    arrivalTime?: string;
    departureTime?: string;
    port?: ItineraryPort;
    atSea?: boolean;
}

interface ItineraryData {
    code: string;
    description: string;
    mapImage?: string;
    departureDate: string;
    cruiseDuration: number;
    days: ItineraryDay[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DOW_MAP: Record<string, string> = {
    MONDAY: "Lun", TUESDAY: "Mar", WEDNESDAY: "Mie",
    THURSDAY: "Joi", FRIDAY: "Vin", SATURDAY: "Sâm", SUNDAY: "Dum",
};

const DOW_EN: Record<number, string> = {
    0: "SUNDAY", 1: "MONDAY", 2: "TUESDAY", 3: "WEDNESDAY",
    4: "THURSDAY", 5: "FRIDAY", 6: "SATURDAY",
};

function formatDay(dateStr: string, dayOfWeek: string): string {
    const d = new Date(dateStr);
    const day = d.toLocaleDateString("ro-RO", { day: "2-digit", month: "short" });
    return `${day} · ${DOW_MAP[dayOfWeek] ?? dayOfWeek}`;
}

function formatTime(time?: string): string {
    if (!time) return "";
    return time.slice(0, 5);
}

function getPortImage(port: ItineraryPort): string | null {
    const raw = port.images?.desktop?.optimisedImage;
    if (!raw) return null;
    return `${raw}?wid=400&hei=240&fit=crop`;
}

function getMapImageUrl(mapImage?: string): string | null {
    if (!mapImage) return null;
    if (mapImage.startsWith("http")) return mapImage;
    return `https://www.msccruises.com${mapImage}`;
}

function fillMissingDays(days: ItineraryDay[], duration: number, startDate: string): ItineraryDay[] {
    const filled: ItineraryDay[] = [];
    const start = new Date(startDate);
    for (let i = 0; i < duration; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const dateStr = d.toISOString().split("T")[0];
        const existing = days.find((day) => day.date === dateStr);
        if (existing) {
            filled.push(existing);
        } else {
            filled.push({
                date: dateStr,
                dayOfWeek: DOW_EN[d.getDay()] ?? "MONDAY",
                atSea: true,
            });
        }
    }
    return filled;
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function MapLightbox({ src, onClose }: { src: string; onClose: () => void }) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors z-10"
            >
                ✕
            </button>
            <div
                className="w-full rounded-2xl overflow-hidden shadow-2xl"
                style={{ maxWidth: 760 }}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={src}
                    alt="Harta itinerariu"
                    className="w-full h-auto block"
                    style={{ maxHeight: "82vh", objectFit: "contain" }}
                />
                <div className="bg-black/60 text-white text-xs text-center py-2">
                    Apasă Esc sau click în afară pentru a închide
                </div>
            </div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ItinerarySection({ cruiseId }: { cruiseId: string }) {
    const [data, setData] = useState<ItineraryData | null>(null);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);

    useEffect(() => {
        if (!cruiseId) return;
        let cancelled = false;
        async function fetchItinerary() {
            try {
                const res = await fetch("/api/msc/itinerary", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ cruiseId }),
                });
                if (!res.ok) return;
                const json = await res.json();
                if (cancelled) return;
                setData({
                    ...json,
                    days: fillMissingDays(json.days ?? [], json.cruiseDuration, json.departureDate),
                });
            } catch {
                // silently fail
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchItinerary();
        return () => { cancelled = true; };
    }, [cruiseId]);

    const openMap = useCallback(() => setMapOpen(true), []);
    const closeMap = useCallback(() => setMapOpen(false), []);

    if (loading) return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
            <p className="text-sm text-gray-400">Se încarcă itinerariul...</p>
        </div>
    );

    if (!data) return null;

    const mapUrl = getMapImageUrl(data.mapImage);
    const visibleDays = expanded ? data.days : data.days.slice(0, 5);
    const hasMore = data.days.length > 5;
    const portImages = data.days.filter((d) => d.port && getPortImage(d.port));

    return (
        <>
            {mapOpen && mapUrl && <MapLightbox src={mapUrl} onClose={closeMap} />}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">

                {/* ── Header cu hartă ────────────────────────────────────────────── */}
                <div className="border-b border-gray-100">

                    {/* Harta — vizibilă pe toate device-urile, deasupra tabelului */}
                    {mapUrl && (
                        <button
                            onClick={openMap}
                            className="w-full group relative block overflow-hidden"
                            style={{ height: 160 }}
                            title="Click pentru a mări harta"
                        >
                            <img
                                src={mapUrl}
                                alt="Harta itinerariu"
                                className="w-full h-full object-cover"
                                style={{ width: "100%", height: 160 }}
                            />
                            {/* Gradient overlay */}
                            <div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5))" }}
                            />
                            {/* Info jos */}
                            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between">
                                <div>
                                    <p className="text-white font-bold text-sm">{data.description}</p>
                                    <p className="text-white/70 text-xs">{data.cruiseDuration} zile · {data.days.filter(d => !d.atSea && d.port).length} porturi</p>
                                </div>
                                <div className="bg-white/20 hover:bg-white/30 group-hover:bg-white/30 transition-colors rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                                    <span className="text-white text-xs font-medium">🔍 Mărește</span>
                                </div>
                            </div>
                        </button>
                    )}

                    {/* Titlu */}
                    <div className="px-4 py-3">
                        <h2 className="text-base font-bold text-gray-800">Itinerariu zi cu zi</h2>
                    </div>
                </div>

                {/* ── Zile — layout card pe mobil, tabel pe desktop ──────────────── */}

                {/* MOBIL — cards */}
                <div className="md:hidden divide-y divide-gray-50">
                    {visibleDays.map((day, i) => {
                        const isAtSea = day.atSea || !day.port;
                        const portImg = day.port ? getPortImage(day.port) : null;
                        const arrival = formatTime(day.arrivalTime);
                        const departure = formatTime(day.departureTime);

                        return (
                            <div
                                key={`mob-${day.date}-${i}`}
                                className={`flex items-center gap-3 px-4 py-3 ${isAtSea ? "opacity-50" : ""}`}
                            >
                                {/* Nr zi */}
                                <div className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 ${isAtSea ? "bg-gray-300 text-gray-600" : "bg-blue-600 text-white"
                                    }`}>
                                    {i + 1}
                                </div>

                                {/* Port thumbnail */}
                                {portImg && !isAtSea && (
                                    <img
                                        src={portImg}
                                        alt={day.port!.name}
                                        className="rounded-lg object-cover flex-shrink-0"
                                        style={{ width: 48, height: 36 }}
                                    />
                                )}

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    {isAtSea ? (
                                        <p className="text-sm text-gray-400 italic">🌊 În larg</p>
                                    ) : (
                                        <p className="text-sm font-semibold text-gray-800 truncate">{day.port!.name}</p>
                                    )}
                                    <p className="text-xs text-gray-400">{formatDay(day.date, day.dayOfWeek)}</p>
                                </div>

                                {/* Ore */}
                                {!isAtSea && (arrival || departure) && (
                                    <div className="text-right flex-shrink-0">
                                        {arrival && (
                                            <p className="text-xs text-gray-500">
                                                <span className="text-gray-400">↓</span> {arrival}
                                            </p>
                                        )}
                                        {departure && (
                                            <p className="text-xs text-gray-500">
                                                <span className="text-gray-400">↑</span> {departure}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* DESKTOP — tabel */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">Zi</th>
                                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Dată</th>
                                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Port</th>
                                <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">Sosire</th>
                                <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">Plecare</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleDays.map((day, i) => {
                                const isAtSea = day.atSea || !day.port;
                                const portImg = day.port ? getPortImage(day.port) : null;

                                return (
                                    <tr
                                        key={`desk-${day.date}-${i}`}
                                        className={`border-b border-gray-50 ${isAtSea ? "opacity-50" : "hover:bg-gray-50"}`}
                                    >
                                        <td className="px-4 py-3">
                                            <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${isAtSea ? "bg-gray-300 text-gray-600" : "bg-blue-600 text-white"
                                                }`}>
                                                {i + 1}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">
                                            {formatDay(day.date, day.dayOfWeek)}
                                        </td>
                                        <td className="px-3 py-3">
                                            {isAtSea ? (
                                                <span className="text-sm text-gray-400 italic flex items-center gap-1.5">
                                                    <span>🌊</span> În larg
                                                </span>
                                            ) : (
                                                <div className="flex items-center gap-2.5">
                                                    {portImg && (
                                                        <img
                                                            src={portImg}
                                                            alt={day.port!.name}
                                                            className="rounded object-cover flex-shrink-0"
                                                            style={{ width: 40, height: 32 }}
                                                        />
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">{day.port!.name}</p>
                                                        <p className="text-xs text-gray-400 font-mono">{day.port!.code}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-3 py-3 text-center text-sm font-medium text-gray-700">
                                            {formatTime(day.arrivalTime) || <span className="text-gray-300">—</span>}
                                        </td>
                                        <td className="px-3 py-3 text-center text-sm font-medium text-gray-700">
                                            {formatTime(day.departureTime) || <span className="text-gray-300">—</span>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Show more */}
                {hasMore && (
                    <div className="px-4 py-3 border-t border-gray-100 text-center">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                            {expanded
                                ? "▲ Afișează mai puțin"
                                : `▼ Afișează toate ${data.days.length} zilele`}
                        </button>
                    </div>
                )}

                {/* Grid imagini porturi */}
                {portImages.length > 0 && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Porturi vizitate
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {portImages.map((d, i) => {
                                const img = getPortImage(d.port!);
                                return (
                                    <div
                                        key={`port-img-${i}`}
                                        className="rounded-xl overflow-hidden relative"
                                        style={{ height: 90 }}
                                    >
                                        <img
                                            src={img!}
                                            alt={d.port!.name}
                                            className="block object-cover"
                                            style={{ width: "100%", height: 90 }}
                                        />
                                        <div
                                            className="absolute inset-0 flex items-end p-2"
                                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
                                        >
                                            <p className="text-white text-xs font-semibold leading-tight">
                                                {d.port!.name}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}