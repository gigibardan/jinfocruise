import { NextRequest, NextResponse } from "next/server";
import { wsPost, checkWsError } from "@/lib/msc-workstream";

export async function POST(req: NextRequest) {
  try {
    const {
      cruiseId,
      categoryCode,
      promotionCode,
      noAdults = 2,
      noChildren = 0,
      childAges = "",
      physChallenged = "",
    } = await req.json();

    if (!cruiseId || !categoryCode || !promotionCode) {
      return NextResponse.json(
        { error: "cruiseId, categoryCode și promotionCode sunt obligatorii" },
        { status: 400 }
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DtsCruiseCabinAvailabilityRequest xmlns="DTS">
  <BookingContext>
    <AdvertisingSource/>
    <BookingContactName>1</BookingContactName>
    <LoyalityCardMemberLevel/>
    <GroupID/>
    <PaxType/>
    <NoAdults>${noAdults}</NoAdults>
    ${noChildren > 0 ? `<NoChildren>${noChildren}</NoChildren><ChildAge>${childAges}</ChildAge>` : ""}
    <BookingChannel>BEE</BookingChannel>
  </BookingContext>
  <CruiseComponent>
    <CruiseID>${cruiseId}</CruiseID>
    <ConnectedCabins/>
    <PhysicallyChallenged>${physChallenged}</PhysicallyChallenged>
    <CategoryCode>${categoryCode}</CategoryCode>
    <PromotionCode>${promotionCode}</PromotionCode>
  </CruiseComponent>
</DtsCruiseCabinAvailabilityRequest>`;

    const xmlResponse = await wsPost("cabin/getcabins", xml);

    const error = checkWsError(xmlResponse);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const cabins: object[] = [];
    const cabinMatches = xmlResponse.matchAll(
      /<AvailableCabin>([\s\S]*?)<\/AvailableCabin>/g
    );

    for (const match of cabinMatches) {
      const block = match[1];
      const get = (tag: string) =>
        block.match(new RegExp(`<${tag}>(.*?)<\\/${tag}>`))?.[1]?.trim() ?? "";

      cabins.push({
        cabinNo: get("CabinNo"),
        deckCode: get("DeckCode"),
        deckName: get("DeckName"),
        deckNumber: parseInt(get("DeckNumber")) || 0,
        physChallenged: get("PhysicallyChallenged") === "true",
        bedArrangement: get("BedArrangement"),
        location: get("ShipLocationDesc"),
        obview: get("Obview"),
        allocated: get("Allocated") === "Y",
      });
    }

    return NextResponse.json({
      cruiseId,
      categoryCode,
      cabins,
      total: cabins.length,
      rawXml: process.env.NODE_ENV === "development" ? xmlResponse : undefined,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}