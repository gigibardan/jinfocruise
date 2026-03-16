import { NextRequest, NextResponse } from "next/server";
import { wsPost, checkWsError } from "@/lib/msc-workstream";

export async function POST(req: NextRequest) {
  try {
    const { cruiseId, cabinNo } = await req.json();

    if (!cruiseId || !cabinNo) {
      return NextResponse.json(
        { error: "cruiseId și cabinNo sunt obligatorii" },
        { status: 400 }
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DtsCruiseCabinLockRequestMessage xmlns="DTS">
  <CruiseId>${cruiseId}</CruiseId>
  <CabinsToBook>
    <CabinNo>${cabinNo}</CabinNo>
  </CabinsToBook>
  <BookingContext>
    <BookingChannel>BEE</BookingChannel>
  </BookingContext>
</DtsCruiseCabinLockRequestMessage>`;

    const xmlResponse = await wsPost("cabin/getcabinlock", xml);

    const error = checkWsError(xmlResponse);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const lockId = xmlResponse.match(/<LockID>(.*?)<\/LockID>/)?.[1] ?? null;
    const lockedCabin = xmlResponse.match(/<CabinNo>(.*?)<\/CabinNo>/)?.[1] ?? cabinNo;

    if (!lockId) {
      return NextResponse.json(
        { error: "LockID negăsit în răspuns", rawXml: xmlResponse },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      cruiseId,
      cabinNo: lockedCabin,
      lockId,
      lockedAt: new Date().toISOString(),
      // Lock expiră în ~15 min — afișează countdown în UI
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}