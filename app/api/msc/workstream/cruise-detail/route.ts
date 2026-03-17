import { NextRequest, NextResponse } from "next/server";

// cruise-detail reutilizează /workstream/search care deja funcționează
// și parsează XML-ul corect cu Itinerary > Cruises

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
  // Structura confirmată: <Itinerary><Cruises>...</Cruises></Itinerary>
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

    const priceType = getVal(block, "PriceType");
    const occStr = getVal(block, "AllowedOccupancies");
    const allowedOccupancies = occStr
      ? occStr.split(",").map(Number).filter(Boolean)
      : [];

    // PackageCode + ExperienceCode
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
      priceDesc: getVal(block, "PriceDesc"),
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

  return cruiseDetail;
}

export async function POST(req: NextRequest) {
  try {
    const { cruiseId } = await req.json();
    if (!cruiseId) {
      return NextResponse.json({ error: "cruiseId este obligatoriu" }, { status: 400 });
    }

    // Apelăm /workstream/search care deja funcționează
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
        { error: "Nu s-au putut parsa datele croazierei" },
        { status: 500 }
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