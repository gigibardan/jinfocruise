import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, type CruiseRequest } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validare minimă
    if (!body.client_name || !body.client_phone || !body.cruise_id) {
      return NextResponse.json(
        { error: "Câmpurile obligatorii lipsesc: client_name, client_phone, cruise_id" },
        { status: 400 }
      );
    }

    const request: CruiseRequest = {
      client_name:  body.client_name.trim(),
      client_phone: body.client_phone.trim(),
      client_email: body.client_email?.trim() || null,
      message:      body.message?.trim() || null,

      cruise_id:    body.cruise_id,
      ship_cd:      body.ship_cd || null,
      ship_name:    body.ship_name || null,
      sailing_date: body.sailing_date || null,
      sailing_port: body.sailing_port || null,
      nights: body.nights ? Number(body.nights) : undefined,

      category:     body.category || null,
      cabin_name:   body.cabin_name || null,
      fare_code:    body.fare_code || null,
      fare_desc:    body.fare_desc || null,
      price_type:   body.price_type || null,
      occupancy:    body.occupancy || null,
      price: body.price ? Number(body.price) : undefined,

      itin_desc:    body.itin_desc || null,
      source:       body.source || "website",
      agency_id:    body.agency_id || null,
      status:       "new",
    };

    const { data, error } = await supabaseAdmin
      .from("cruise_requests")
      .insert(request)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Eroare la salvarea cererii" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });

  } catch (err) {
    console.error("Request API error:", err);
    return NextResponse.json(
      { error: "Eroare internă server" },
      { status: 500 }
    );
  }
}

// GET — pentru admin (lista cereri)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status  = searchParams.get("status");
    const limit   = Number(searchParams.get("limit") ?? "50");
    const offset  = Number(searchParams.get("offset") ?? "0");

    let query = supabaseAdmin
      .from("cruise_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) query = query.eq("status", status);

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ requests: data, total: count });

  } catch (err) {
    return NextResponse.json({ error: "Eroare internă" }, { status: 500 });
  }
}
