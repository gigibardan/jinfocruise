import { NextRequest, NextResponse } from "next/server";
import { wsPost } from "@/lib/msc-workstream";

// Returnează packageCode și experienceCode pentru o categorie dintr-o croazieră
// Apelat o singură dată când userul click pe "Rezervă" — nu la load pagină

export async function POST(req: NextRequest) {
  try {
    const { cruiseId, categoryCode } = await req.json();

    if (!cruiseId || !categoryCode) {
      return NextResponse.json(
        { error: "cruiseId și categoryCode sunt obligatorii" },
        { status: 400 }
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DtsSearchCruisesRequestV1 xmlns="DTS">
  <BookingContext>
    <AgencyID>RO000043</AgencyID>
    <AgentID>RO000043</AgentID>
    <BookingChannel>BEE</BookingChannel>
    <MarketCode>ROM</MarketCode>
    <OfficeCode>ROM</OfficeCode>
    <LanguageCode>ENG</LanguageCode>
    <CurrencyCode>EUR</CurrencyCode>
  </BookingContext>
  <SearchDetails>
    <CruiseID>${cruiseId}</CruiseID>
  </SearchDetails>
</DtsSearchCruisesRequestV1>`;

    const xmlResponse = await wsPost(
      "searchcruises/searchcruisesdetV1",
      xml
    );

    // Găsim blocul pentru categoria cerută
    const cruisesBlocks = [...xmlResponse.matchAll(/<Cruises>([\s\S]*?)<\/Cruises>/g)];

    let packageCode: string | null = null;
    let experienceCode: string | null = null;

    for (const match of cruisesBlocks) {
      const block = match[1];
      const catMatch = block.match(/<Category>(.*?)<\/Category>/);
      if (catMatch?.[1] !== categoryCode) continue;

      // Găsim item-ul Mandatory (M) de tip EXP
      const itemMatches = [...block.matchAll(/<ItemDetails>([\s\S]*?)<\/ItemDetails>/g)];
      for (const itemMatch of itemMatches) {
        const item = itemMatch[1];
        const appl = item.match(/<ItemApplicability>(.*?)<\/ItemApplicability>/)?.[1];
        const code = item.match(/<ItemCode>(.*?)<\/ItemCode>/)?.[1];
        const pkg = item.match(/<PackageCode>(.*?)<\/PackageCode>/)?.[1];

        if (appl === "M" && code?.startsWith("EXP") && pkg) {
          packageCode = pkg;
          experienceCode = code;
          break;
        }
      }
      if (packageCode) break;
    }

    if (!packageCode || !experienceCode) {
      return NextResponse.json(
        { error: "PackageCode negăsit pentru categoria " + categoryCode },
        { status: 404 }
      );
    }

    return NextResponse.json({ packageCode, experienceCode, categoryCode, cruiseId });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}