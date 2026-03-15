import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const MSC_ITINERARY_BASE = "https://prod.api.msccruises.eu/dtt-b2cw-booking-funnel-eapi/v2/cruises";
const CACHE_TTL_HOURS = 24;

// ─── Cache helpers ────────────────────────────────────────────────────────────

async function getCache(key: string) {
    try {
        const { data } = await supabaseAdmin
            .from("msc_cache")
            .select("data, expires_at")
            .eq("cache_key", key)
            .single();

        if (!data) return null;
        if (new Date(data.expires_at) < new Date()) {
            await supabaseAdmin.from("msc_cache").delete().eq("cache_key", key);
            return null;
        }
        return data.data;
    } catch {
        return null;
    }
}

async function setCache(key: string, data: unknown) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + CACHE_TTL_HOURS);
    try {
        await supabaseAdmin.from("msc_cache").upsert({
            cache_key: key,
            data,
            expires_at: expiresAt.toISOString(),
            hit_count: 0,
        }, { onConflict: "cache_key" });
    } catch (e) {
        console.error("Cache set error:", e);
    }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        const { cruiseId } = await req.json();

        if (!cruiseId) {
            return NextResponse.json({ error: "cruiseId este obligatoriu" }, { status: 400 });
        }

        const cacheKey = `itinerary:${cruiseId}`;

        // Verifică cache
        const cached = await getCache(cacheKey);
        if (cached) {
            return NextResponse.json({ ...cached as object, fromCache: true });
        }

        // Fetch de la MSC public API
        const res = await fetch(`${MSC_ITINERARY_BASE}/${cruiseId}/itinerary`, {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.9",
                "msc-locale": "en_GB",
                "msc-language-code": "eng",
                "msc-country-code": "GB",
                "msc-currency-code": "EUR",
                "msc-conversation-id": crypto.randomUUID(),
                "Origin": "https://www.msccruises.eu",
                "Referer": "https://www.msccruises.eu/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: `MSC itinerary API ${res.status}` },
                { status: res.status }
            );
        }

        const data = await res.json();

        // Salvează în cache
        await setCache(cacheKey, data);

        return NextResponse.json(data);

    } catch (err) {
        const message = err instanceof Error ? err.message : "Network error";
        console.error("Itinerary API error:", message);
        return NextResponse.json({ error: message }, { status: 502 });
    }
}