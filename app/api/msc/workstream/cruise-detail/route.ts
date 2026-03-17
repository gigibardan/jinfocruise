import { NextRequest, NextResponse } from "next/server";
import { wsPost, checkWsError } from "@/lib/msc-workstream";

export interface WorkstreamCategory {
  category: string;
  categoryName: string;
  priceCode: string;
  priceDesc: string;
  priceType: string;
  packageCode: string;
  experienceCode: string;
  experienceName: string;
  cabinsAvailable: number;
  allowedOccupancies: number[];
  firstPaxPrice: number;
  totalCabinPrice: number;
  portCharges: number;
  commission: number;
  commissionPct: number;
}

export interface WorkstreamCruiseDetail {
  cruiseId: string;
  shipCode: string;
  shipName: string;
  sailingDate: string;
  endDate: string;
  nights: number;
  departurePort: string;
  departurePortDesc: string;
  arrivalPort: string;
  arrivalPortDesc: string;
  canvas: string;
  canvasDesc: string;
  categories: WorkstreamCategory[];
  serviceCharges: {
    code: string;
    adultAmount: number;
    standard: boolean;
  }[];
}

const CATEGORY_NAMES: Record<string, string> = {
  IB: "Interior Bella", SPL: "Super Family",
  IR1: "Interior Deluxe", IR2: "Interior Premium",
  OB: "Exterior Bella", OL1: "Exterior Deluxe",
  OL2: "Exterior Premium", OL3: "Exterior Superior",
  BB: "Balcon Bella", BP: "Balcon Partial View",
  BL1: "Balcon Deluxe", BL2: "Balcon Premium",
  BL3: "Balcon Superior", BA: "Balcon Aurea",
  SRS: "Suite Royal", SLS: "Suite Deluxe",
  SL1: "Suite Premium", SX: "Suite Exclusive",
  YC1: "YC Interior", YCP: "YC Premium",
  YC2: "YC Deluxe", YCT: "YC Top",
};

function getVal(xml: string, tag: string): string {
  return xml.match(new RegExp(`<${tag}>([^<]*)<\\/${tag}>`))?.[1]?.trim() ?? "";
}

function getNum(xml: string, tag: string): number {
  return parseFloat(getVal(xml, tag)) || 0;
}

function getInt(xml: string, tag: string): number {
  return parseInt(getVal(xml, tag)) || 0;
}

export async function POST(req: NextRequest) {
  try {
    const { cruiseId } = await req.json();
    if (!cruiseId) {
      return NextResponse.json({ error: "cruiseId este obligatoriu" }, { status: 400 });
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

    const xmlResponse = await wsPost("searchcruises/searchcruisesdetV1", xml);

    const wsError = checkWsError(xmlResponse);
    if (wsError) {
      return NextResponse.json({ error: wsError }, { status: 400 });
    }

    // ─── Extragem blocul Itinerary ────────────────────────────────────────────
    const itineraryBlock = xmlResponse.match(/<Itinerary>([\s\S]*?)<\/Itinerary>/)?.[1];
    if (!itineraryBlock) {
      return NextResponse.json({ error: "Nu s-au găsit date pentru această croazieră" }, { status: 404 });
    }

    // ─── Toate blocurile Cruises din Itinerary ────────────────────────────────
    const cruisesBlocks = [...itineraryBlock.matchAll(/<Cruises>([\s\S]*?)<\/Cruises>/g)]
      .map(m => m[1]);

    if (cruisesBlocks.length === 0) {
      return NextResponse.json({ error: "Nu s-au găsit categorii" }, { status: 404 });
    }

    // ─── Header din primul bloc ───────────────────────────────────────────────
    const first = cruisesBlocks[0];

    const cruiseDetail: WorkstreamCruiseDetail = {
      cruiseId: getVal(first, "CruiseId") || cruiseId,
      shipCode: getVal(first, "ShipCd"),
      shipName: getVal(first, "ShipName"),
      sailingDate: getVal(first, "DepartureDate").slice(0, 10),
      endDate: getVal(first, "ArrivalDate"),
      nights: getInt(first, "CruiseLen"),
      departurePort: getVal(first, "EmbkPort"),
      departurePortDesc: getVal(first, "EmbkPortDesc"),
      arrivalPort: getVal(first, "DisembkPort"),
      arrivalPortDesc: getVal(first, "DisembkPortDesc"),
      canvas: getVal(first, "Canvas"),
      canvasDesc: getVal(first, "CanvasDesc"),
      categories: [],
      serviceCharges: [],
    };

    // ─── Service Charges din primul bloc ─────────────────────────────────────
    const scBlocks = [...first.matchAll(/<ServiceChargeItemDetails>([\s\S]*?)<\/ServiceChargeItemDetails>/g)];
    const scSeen = new Set<string>();
    for (const scMatch of scBlocks) {
      const sc = scMatch[1];
      const code = getVal(sc, "ServiceChargeCode");
      if (!code || scSeen.has(code)) continue;
      scSeen.add(code);
      const adultAmt = getNum(sc, "ServiceChargeAdult");
      if (adultAmt > 0) {
        cruiseDetail.serviceCharges.push({
          code,
          adultAmount: adultAmt,
          standard: getVal(sc, "Standard") === "true",
        });
      }
    }

    // ─── Parsează fiecare bloc Cruises ───────────────────────────────────────
    const categoryMap = new Map<string, WorkstreamCategory>();

    for (const block of cruisesBlocks) {
      const category = getVal(block, "Category");
      if (!category) continue;

      const firstPaxPrice = getNum(block, "FirstPaxPrice");
      if (firstPaxPrice === 0) continue;

      const priceType = getVal(block, "PriceType");

      // AllowedOccupancies
      const occStr = getVal(block, "AllowedOccupancies");
      const allowedOccupancies = occStr
        ? occStr.split(",").map(Number).filter(Boolean)
        : [];

      // PackageCode + ExperienceCode din ItemDetails
      let packageCode = "";
      let experienceCode = "";
      let experienceName = "";

      const itemBlocks = [...block.matchAll(/<ItemDetails>([\s\S]*?)<\/ItemDetails>/g)];
      for (const itemMatch of itemBlocks) {
        const item = itemMatch[1];
        const appl = getVal(item, "ItemApplicability");
        const code = getVal(item, "ItemCode");
        const pkg = getVal(item, "PackageCode");
        const desc = getVal(item, "ItemDescription");

        if (appl === "M" && code.startsWith("EXP") && pkg) {
          packageCode = pkg;
          experienceCode = code;
          experienceName = desc;
          break;
        }
      }

      const newCat: WorkstreamCategory = {
        category,
        categoryName: CATEGORY_NAMES[category] ?? category,
        priceCode: getVal(block, "PriceCode"),
        priceDesc: getVal(block, "PriceDesc"),
        priceType,
        packageCode,
        experienceCode,
        experienceName,
        cabinsAvailable: getInt(block, "CabinsAvailable"),
        allowedOccupancies,
        firstPaxPrice,
        totalCabinPrice: getNum(block, "TotalCabinPrice"),
        portCharges: getNum(block, "PortChargesAmt"),
        commission: getNum(block, "AllInclStdCommTotal"),
        commissionPct: getNum(block, "CommissionValue"),
      };

      const existing = categoryMap.get(category);
      if (!existing) {
        categoryMap.set(category, newCat);
      } else {
        const newIsPromo = priceType === "EARLYBKG" || priceType === "EBDRINK";
        const oldIsPromo = existing.priceType === "EARLYBKG" || existing.priceType === "EBDRINK";
        if (oldIsPromo && !newIsPromo) {
          categoryMap.set(category, newCat);
        } else if (newIsPromo === oldIsPromo && firstPaxPrice < existing.firstPaxPrice) {
          categoryMap.set(category, newCat);
        }
      }
    }

    cruiseDetail.categories = Array.from(categoryMap.values())
      .sort((a, b) => a.firstPaxPrice - b.firstPaxPrice);

    return NextResponse.json({
      success: true,
      cruise: cruiseDetail,
      totalCategories: cruiseDetail.categories.length,
      availableCategories: cruiseDetail.categories.filter(c => c.cabinsAvailable > 0).length,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}