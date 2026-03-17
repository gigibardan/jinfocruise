import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      bookingNoMsc,
      cruiseId,
      shipCode,
      shipName,
      sailingDate,
      categoryCode,
      categoryName,
      cabinNo,
      isQuote = true,
      noAdults,
      grossAmount,
      netAmount,
      commission,
      portCharges,
      depositDue,
      payMethod,
      leadFirstName,
      leadLastName,
      leadEmail,
      leadPhone,
      leadDob,
    } = body;

    if (!bookingNoMsc || !cruiseId) {
      return NextResponse.json(
        { error: "bookingNoMsc și cruiseId sunt obligatorii" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        booking_no_msc: bookingNoMsc,
        cruise_id: cruiseId,
        ship_code: shipCode,
        ship_name: shipName,
        sailing_date: sailingDate || null,
        category_code: categoryCode,
        category_name: categoryName,
        cabin_no: cabinNo,
        is_quote: isQuote,
        no_adults: noAdults,
        gross_amount: grossAmount,
        net_amount: netAmount,
        commission: commission,
        port_charges: portCharges,
        deposit_due: depositDue,
        pay_method: payMethod,
        lead_first_name: leadFirstName,
        lead_last_name: leadLastName,
        lead_email: leadEmail,
        lead_phone: leadPhone,
        lead_dob: leadDob || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, booking: data });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare internă";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") ?? "50");

    let query = supabaseAdmin
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ bookings: data, total: data.length });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare internă";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}