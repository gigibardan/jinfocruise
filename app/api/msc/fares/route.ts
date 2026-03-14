import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const MSC_ENDPOINT  = process.env.MSC_ENDPOINT!;
const USER_ID       = process.env.MSC_USER_ID!;
const AGENCY_ID     = process.env.MSC_AGENCY_ID!;
const PASSWORD      = process.env.MSC_PASSWORD!;
const MARKET_CODE   = process.env.MSC_MARKET_CODE ?? "ROM";
const AGENT_ID      = process.env.MSC_AGENT_ID ?? "STAR";

const CACHE_TTL_HOURS = 6; // cache valabil 6 ore
const MAX_PAGES       = 5;

// ─── Cache helpers ────────────────────────────────────────────────────────────

async function getCache(key: string) {
  const { data } = await supabaseAdmin
    .from("msc_cache")
    .select("data, expires_at, hit_count")
    .eq("cache_key", key)
    .single();

  if (!data) return null;
  if (new Date(data.expires_at) < new Date()) {
    // Expirat — șterge
    await supabaseAdmin.from("msc_cache").delete().eq("cache_key", key);
    return null;
  }

  // Incrementează hit_count
  await supabaseAdmin
    .from("msc_cache")
    .update({ hit_count: (data.hit_count ?? 0) + 1 })
    .eq("cache_key", key);

  return data.data;
}

async function setCache(key: string, data: unknown) {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + CACHE_TTL_HOURS);

  await supabaseAdmin.from("msc_cache").upsert({
    cache_key:  key,
    data,
    expires_at: expiresAt.toISOString(),
    hit_count:  0,
  }, { onConflict: "cache_key" });
}

// ─── MSC API fetch ────────────────────────────────────────────────────────────

async function fetchMscPage(payload: Record<string, string>) {
  const res = await fetch(MSC_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept:         "application/json",
      UserId:         USER_ID,
      AgencyId:       AGENCY_ID,
      Password:       PASSWORD,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MSC API ${res.status}: ${text.slice(0, 200)}`);
  }

  return res.json();
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dateFrom, dateTo, fetchAll = false } = body;

    if (!dateFrom || !dateTo) {
      return NextResponse.json(
        { error: "dateFrom și dateTo sunt obligatorii" },
        { status: 400 }
      );
    }

    // Validare interval max 60 zile
    const from = new Date(dateFrom);
    const to   = new Date(dateTo);
    const diffDays = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 60) {
      return NextResponse.json(
        { error: "Intervalul maxim este de 60 de zile" },
        { status: 400 }
      );
    }

    // Cache key
    const cacheKey = `fares:${dateFrom}:${dateTo}:${fetchAll ? "all" : "p1"}`;

    // Verifică cache
    const cached = await getCache(cacheKey);
    if (cached) {
      return NextResponse.json({ ...cached, fromCache: true });
    }

    // Fetch pagina 1
    const basePayload = {
      cruiseIds:        "",
      marketCode:       MARKET_CODE,
      agentId:          AGENT_ID,
      consortiumCode:   "",
      nights:           "",
      ship:             "",
      cruiseAndFlight:  "",
      itinCd:           "",
      arrivalPort:      "",
      departurePort:    "",
      departureDateFrom: dateFrom,
      departureDateTo:   dateTo,
      lastRetrievedId:  "",
    };

    const firstPage = await fetchMscPage(basePayload);
    let allResults  = [...(firstPage.results ?? [])];
    const totalPages = firstPage.totalPages ?? 1;

    // Fetch restul paginilor dacă fetchAll
    if (fetchAll && totalPages > 1) {
      let lastId = firstPage.lastRetrievedId ?? "";
      const pagesToFetch = Math.min(totalPages, MAX_PAGES);

      for (let page = 2; page <= pagesToFetch; page++) {
        if (!lastId) break;
        const nextPage = await fetchMscPage({ ...basePayload, lastRetrievedId: lastId });
        allResults = [...allResults, ...(nextPage.results ?? [])];
        lastId = nextPage.lastRetrievedId ?? "";
      }
    }

    const response = {
      results:      allResults,
      totalResults: allResults.length,
      totalPages,
      pagesLoaded:  fetchAll ? Math.min(totalPages, MAX_PAGES) : 1,
    };

    // Salvează în cache
    await setCache(cacheKey, response);

    return NextResponse.json(response);

  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare necunoscută";
    console.error("Fares API error:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}