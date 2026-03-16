import { NextRequest, NextResponse } from "next/server";
import { wsPost, checkWsError } from "@/lib/msc-workstream";

export async function POST(req: NextRequest) {
  try {
    const { cruiseId, categoryCode, noPassengers = 2 } = await req.json();

    if (!cruiseId || !categoryCode) {
      return NextResponse.json(
        { error: "cruiseId și categoryCode sunt obligatorii" },
        { status: 400 }
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DtsDiningResidualAvailabilityRequest xmlns="DTS">
  <CruiseId>${cruiseId}</CruiseId>
  <CategoryCode>${categoryCode}</CategoryCode>
  <BookingChannel>XML</BookingChannel>
  <NoPassengers>${noPassengers}</NoPassengers>
</DtsDiningResidualAvailabilityRequest>`;

    const xmlResponse = await wsPost(
      "dining/diningresidualavailability",
      xml
    );

    const error = checkWsError(xmlResponse);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const sittings: object[] = [];
    const diningMatches = xmlResponse.matchAll(
      /<DiningDetail>([\s\S]*?)<\/DiningDetail>/g
    );

    for (const match of diningMatches) {
      const block = match[1];
      const get = (tag: string) =>
        block.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`))?.[1] ?? "";

      sittings.push({
        room: get("DiningRoom"),
        description: get("DiningDescription"),
        availability: parseInt(get("Availability")) || 0,
        status: get("DiningStatus"),
        available: get("DiningStatus") === "AVL",
      });
    }

    return NextResponse.json({ cruiseId, sittings });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}