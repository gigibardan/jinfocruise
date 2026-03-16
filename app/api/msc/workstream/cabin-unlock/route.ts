import { NextRequest, NextResponse } from "next/server";
import { wsPost, checkWsError } from "@/lib/msc-workstream";

export async function POST(req: NextRequest) {
  try {
    const { cruiseId, cabins } = await req.json();
    // cabins: Array<{ cabinNo: string; lockId: string }>

    if (!cruiseId || !cabins?.length) {
      return NextResponse.json(
        { error: "cruiseId și cabins[] sunt obligatorii" },
        { status: 400 }
      );
    }

    const cabinsXml = cabins
      .map(
        (c: { cabinNo: string; lockId: string }) => `
  <CabinsToUnLock>
    <CabinNo>${c.cabinNo}</CabinNo>
    <LockID>${c.lockId}</LockID>
  </CabinsToUnLock>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DtsCruiseCabinUnLockRequestMessage xmlns="DTS">
  <CruiseId>${cruiseId}</CruiseId>
  ${cabinsXml}
  <BookingContext>
    <BookingChannel>BEE</BookingChannel>
  </BookingContext>
</DtsCruiseCabinUnLockRequestMessage>`;

    const xmlResponse = await wsPost("cabin/getcabinunlock", xml);

    const error = checkWsError(xmlResponse);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const results: object[] = [];
    const unlockMatches = xmlResponse.matchAll(
      /<UnLockInfo>([\s\S]*?)<\/UnLockInfo>/g
    );

    for (const match of unlockMatches) {
      const block = match[1];
      const get = (tag: string) =>
        block.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`))?.[1] ?? "";
      results.push({
        cabinNo: get("CabinNo"),
        status: get("Status"),
      });
    }

    return NextResponse.json({ success: true, results });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}