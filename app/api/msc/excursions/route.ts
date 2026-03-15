import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const MSC_BASE = "https://prod.api.msccruises.eu/dtt-b2cw-booking-funnel-eapi/v2/cruises";
const CACHE_TTL = 24; // ore

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
    } catch { return null; }
}

async function setCache(key: string, data: unknown) {
    const exp = new Date();
    exp.setHours(exp.getHours() + CACHE_TTL);
    try {
        await supabaseAdmin.from("msc_cache").upsert({
            cache_key: key, data, expires_at: exp.toISOString(), hit_count: 0,
        }, { onConflict: "cache_key" });
    } catch { }
}

const MSC_HEADERS = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "ro-RO,ro;q=0.9,en-GB;q=0.8",
    "msc-locale": "ro_RO",
    "msc-language-code": "ron",
    "msc-country-code": "RO",
    "msc-currency-code": "EUR",
    "msc-conversation-id": crypto.randomUUID(),
    "Origin": "https://www.msccruises.eu",
    "Referer": "https://www.msccruises.eu/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
};

export async function POST(req: NextRequest) {
    try {
        const { cruiseId } = await req.json();
        if (!cruiseId) return NextResponse.json({ error: "cruiseId obligatoriu" }, { status: 400 });

        const cacheKey = `excursions:${cruiseId}`;
        const cached = await getCache(cacheKey);
        if (cached) return NextResponse.json({ ...cached as object, fromCache: true });

        const res = await fetch(`${MSC_BASE}/${cruiseId}/excursions`, { headers: MSC_HEADERS });

        if (!res.ok) {
            const text = await res.text();
            return NextResponse.json({ error: `MSC ${res.status}`, detail: text }, { status: res.status });
        }

        const data = await res.json();
        await setCache(cacheKey, data);
        return NextResponse.json(data);

    } catch (err) {
        return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 502 });
    }
}