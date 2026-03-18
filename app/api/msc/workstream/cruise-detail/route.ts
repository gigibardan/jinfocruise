import { NextRequest, NextResponse } from "next/server";

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
  OR1: "Exterior Deluxe 1", OR2: "Exterior Deluxe 2",
  IS: "Interior Superior", VL1: "Vedere Laterală",
  BB: "Balcon Bella", BP: "Balcon Partial View",
  BL1: "Balcon Deluxe", BL2: "Balcon Premium",
  BL3: "Balcon Superior", BA: "Balcon Aurea",
  BR1: "Balcon Deluxe 1", BR2: "Balcon Deluxe 2",
  BR3: "Balcon Deluxe 3", BR4: "Balcon Deluxe 4",
  PR1: "Balcon Premium 1", PR2: "Balcon Premium 2",
  PR3: "Balcon Premium 3", PV: "Balcon Panoramic",
  VLA: "Vedere Laterală Aurea", OS: "Exterior Superior",
  BGA: "Balcon Grand Aurea",
  SRS: "Suite Royal", SLS: "Suite Deluxe",
  SL1: "Suite Premium", SX: "Suite Exclusive",
  SRP: "Suite Royal Plus", SLP: "Suite Loft Premium",
  SXT: "Suite Exclusive Top", SXJ: "Suite Exclusive Junior",
  YIN: "YC Interior", YC1: "YC Interior",
  YCP: "YC Premium", YC2: "YC Deluxe",
  YCT: "YC Top", YCD: "YC Deluxe",
  YJD: "YC Junior Deluxe", YC3: "YC Suite 3",
  YC4: "YC Suite 4",
};

const PRICE_TYPE_PRIORITY: Record<string, number> = {
  WAVEPREM: 1, WAVE: 2, WAVESOFT: 3,
  EARLYBKG: 4, EBDRINK: 5,
  HBDRINK: 6, HBSOFT: 7,
  BROKEN: 8, STANDARD: 9, LASTMIN: 10,
};

const PRICE_DESC_TO_TYPE: Record<string, string> = {
  "BASIC FARE":           "WAVE",
  "HAPPY DRINK SOFT":     "HBSOFT",
  "HAPPY DRINK PREMIUM":  "HBDRINK",
  "EARLY BOOKING":        "EARLYBKG",
  "EARLY BOOKING DRINK":  "EBDRINK",
  "WAVE PREMIUM":         "WAVEPREM",
  "WAVE SOFT":            "WAVESOFT",
  "STANDARD":             "STANDARD",
  "LAST MINUTE":          "LASTMIN",
  "BROKEN":               "BROKEN",
};

function decodeXml(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function getVal(xml: string, tag: string): string {
  return xml.match(new RegExp(`<${tag}>([^<]*)<\\/${tag}>`))?.[1]?.trim() ?? "";
}

function getNum(xml: string, tag: string): number {
  return parseFloat(getVal(xml, tag)) || 0;
}

function getInt(xml: string, tag: string): number {
  return parseInt(getVal(xml, tag)) || 0;
}

function parseXml(xmlResponse: string): WorkstreamCruiseDetail | null {
  const itineraryBlock = xmlResponse.match(/<Itinerary>([\s\S]*?)<\/Itinerary>/)?.[1];
  if (!itineraryBlock) return null;

  const cruisesBlocks = [...itineraryBlock.matchAll(/<Cruises>([\s\S]*?)<\/Cruises>/g)]
    .map(m => m[1]);
  if (cruisesBlocks.length === 0) return null;

  const first = cruisesBlocks[0];

  const cruiseDetail: WorkstreamCruiseDetail = {
    cruiseId: getVal(first, "CruiseId"),
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

  // Service Charges
  const scBlocks = [...first.matchAll(
    /<ServiceChargeItemDetails>([\s\S]*?)<\/ServiceChargeItemDetails>/g
  )];
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

  // Categorii
  const categoryMap = new Map<string, WorkstreamCategory>();

  for (const block of cruisesBlocks) {
    const category = getVal(block, "Category");
    if (!category) continue;

    const firstPaxPrice = getNum(block, "FirstPaxPrice");
    if (firstPaxPrice === 0) continue;

    const priceDesc = getVal(block, "PriceDesc");
    const priceType = PRICE_DESC_TO_TYPE[priceDesc] ?? priceDesc;

    const occStr = getVal(block, "AllowedOccupancies");
    const allowedOccupancies = occStr
      ? occStr.split(",").map(Number).filter(Boolean)
      : [];

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
      categoryName: decodeXml(CATEGORY_NAMES[category] ?? category),
      priceCode: getVal(block, "PriceCode"),
      priceDesc,
      priceType,
      packageCode,
      experienceCode,
      experienceName: decodeXml(experienceName),
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
      const newPrio = PRICE_TYPE_PRIORITY[priceType] ?? 99;
      const oldPrio = PRICE_TYPE_PRIORITY[existing.priceType] ?? 99;
      if (newPrio < oldPrio || (newPrio === oldPrio && firstPaxPrice < existing.firstPaxPrice)) {
        categoryMap.set(category, newCat);
      }
    }
  }

  cruiseDetail.categories = Array.from(categoryMap.values())
    .sort((a, b) => a.firstPaxPrice - b.firstPaxPrice);

  return cruiseDetail;
}

export async function POST(req: NextRequest) {
  try {
    const { cruiseId } = await req.json();
    if (!cruiseId) {
      return NextResponse.json({ error: "cruiseId este obligatoriu" }, { status: 400 });
    }

    const baseUrl = req.headers.get("host")?.includes("localhost")
      ? "http://localhost:3000"
      : `https://${req.headers.get("host")}`;

    const searchRes = await fetch(
      `${baseUrl}/api/msc/workstream/search?cruiseId=${cruiseId}`,
      { headers: { "Content-Type": "application/json" } }
    );

    const searchData = await searchRes.json();
    const xmlResponse: string = searchData.response ?? "";

    if (!xmlResponse) {
      return NextResponse.json(
        { error: "Nu s-au găsit date pentru această croazieră" },
        { status: 404 }
      );
    }

    const cruise = parseXml(xmlResponse);

    if (!cruise) {
      return NextResponse.json(
        {
          success: false,
          notAvailableInWorkstream: true,
          error: "Această croazieră nu este disponibilă momentan pentru rezervare online.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      cruise,
      totalCategories: cruise.categories.length,
      availableCategories: cruise.categories.filter(c => c.cabinsAvailable > 0).length,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}