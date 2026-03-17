import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const AGENCY_EMAIL = "office@jinfocruise.ro";
const AGENCY_NAME = "J'INFO TOURS";

function formatPrice(n: number) {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " €";
}

export async function POST(req: NextRequest) {
  try {
    const {
      bookingNoMsc,
      cruiseId,
      shipName,
      sailingDate,
      categoryName,
      categoryCode,
      cabinNo,
      noAdults,
      grossAmount,
      portCharges,
      depositDue,
      leadFirstName,
      leadLastName,
      leadEmail,
    } = await req.json();

    if (!bookingNoMsc || !leadEmail) {
      return NextResponse.json(
        { error: "bookingNoMsc și leadEmail sunt obligatorii" },
        { status: 400 }
      );
    }

    const cabinTotal = grossAmount - portCharges;

    // ─── Email client ─────────────────────────────────────────────────────────
    const clientEmail = await resend.emails.send({
      from: `J'INFO TOURS <office@jinfotours.ro>`,
      to: leadEmail,
      subject: `Rezervare confirmată #${bookingNoMsc} — ${shipName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
    .header { background: #1e40af; color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 8px 0 0; opacity: 0.8; font-size: 14px; }
    .body { padding: 30px; }
    .booking-no { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 24px; }
    .booking-no p { margin: 0; color: #6b7280; font-size: 13px; }
    .booking-no h2 { margin: 4px 0 0; color: #1e40af; font-size: 28px; font-weight: bold; }
    .section { margin-bottom: 24px; }
    .section h3 { font-size: 14px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 12px; }
    .row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
    .row .label { color: #6b7280; }
    .row .value { font-weight: 500; color: #111827; }
    .total-row { border-top: 2px solid #e5e7eb; margin-top: 8px; padding-top: 12px; }
    .total-row .label { font-weight: bold; color: #111827; }
    .total-row .value { font-size: 20px; font-weight: bold; color: #1e40af; }
    .alert { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin-bottom: 24px; font-size: 13px; color: #92400e; }
    .footer { background: #f9fafb; padding: 20px 30px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚢 Rezervare creată cu succes!</h1>
      <p>J'INFO TOURS — Specialist croaziere MSC în România</p>
    </div>
    <div class="body">
      <p>Bună ziua, <strong>${leadFirstName} ${leadLastName}</strong>,</p>
      <p style="color: #6b7280; font-size: 14px;">Rezervarea dvs. a fost înregistrată în sistemul MSC Cruises. Un consultant va lua legătura cu dvs. în cel mai scurt timp pentru confirmarea plății.</p>

      <div class="booking-no">
        <p>Număr rezervare MSC</p>
        <h2>#${bookingNoMsc}</h2>
      </div>

      <div class="section">
        <h3>Detalii croazieră</h3>
        <div class="row"><span class="label">Navă</span><span class="value">${shipName}</span></div>
        <div class="row"><span class="label">Data plecării</span><span class="value">${sailingDate}</span></div>
        <div class="row"><span class="label">Categoria</span><span class="value">${categoryName} (${categoryCode})</span></div>
        <div class="row"><span class="label">Cabina</span><span class="value">Nr. ${cabinNo}</span></div>
        <div class="row"><span class="label">Pasageri</span><span class="value">${noAdults} adulți</span></div>
      </div>

      <div class="section">
        <h3>Detalii preț</h3>
        <div class="row"><span class="label">Tarif cabină</span><span class="value">${formatPrice(cabinTotal)}</span></div>
        <div class="row"><span class="label">Taxe portuare</span><span class="value">${formatPrice(portCharges)}</span></div>
        <div class="row total-row"><span class="label">Total de plată</span><span class="value">${formatPrice(grossAmount)}</span></div>
        ${depositDue > 0 ? `<div class="row" style="margin-top:8px"><span class="label" style="color:#059669">Depozit acum</span><span class="value" style="color:#059669">${formatPrice(depositDue)}</span></div>` : ""}
      </div>

      <div class="alert">
        ⚠️ <strong>Important:</strong> Taxa de serviciu la bord (~€72/adult/noapte) se plătește separat direct pe navă și nu este inclusă în suma de mai sus.
      </div>

      <p style="font-size: 14px; color: #374151;">Pentru orice întrebări, ne puteți contacta la:<br>
        📧 <a href="mailto:office@jinfocruise.ro" style="color: #1e40af;">office@jinfocruise.ro</a><br>
        📞 <a href="tel:+40700000000" style="color: #1e40af;">+40 700 000 000</a>
      </p>
    </div>
    <div class="footer">
      <p>J'INFO TOURS SRL — Agenție de turism autorizată</p>
      <p>jinfocruise.ro | office@jinfocruise.ro</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    // ─── Email intern (agenție) ───────────────────────────────────────────────
    const agencyEmail = await resend.emails.send({
      from: `J'INFO TOURS <office@jinfotours.ro>`,
      to: AGENCY_EMAIL,
      subject: `🔔 Rezervare nouă #${bookingNoMsc} — ${leadFirstName} ${leadLastName}`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1e40af;">Rezervare nouă primită</h2>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr><td style="padding: 8px; color: #6b7280; width: 40%;">Booking MSC</td><td style="padding: 8px; font-weight: bold; color: #1e40af;">#${bookingNoMsc}</td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; color: #6b7280;">Client</td><td style="padding: 8px;">${leadFirstName} ${leadLastName}</td></tr>
    <tr><td style="padding: 8px; color: #6b7280;">Email</td><td style="padding: 8px;"><a href="mailto:${leadEmail}">${leadEmail}</a></td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; color: #6b7280;">Navă</td><td style="padding: 8px;">${shipName}</td></tr>
    <tr><td style="padding: 8px; color: #6b7280;">Croazieră</td><td style="padding: 8px;">${cruiseId}</td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; color: #6b7280;">Categorie</td><td style="padding: 8px;">${categoryName} (${categoryCode})</td></tr>
    <tr><td style="padding: 8px; color: #6b7280;">Cabina</td><td style="padding: 8px;">${cabinNo}</td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; color: #6b7280;">Pasageri</td><td style="padding: 8px;">${noAdults} adulți</td></tr>
    <tr><td style="padding: 8px; color: #6b7280;">Data plecării</td><td style="padding: 8px;">${sailingDate}</td></tr>
    <tr style="background: #f9fafb; border-top: 2px solid #e5e7eb;"><td style="padding: 8px; font-weight: bold;">Total brut</td><td style="padding: 8px; font-weight: bold; color: #1e40af;">${formatPrice(grossAmount)}</td></tr>
    <tr><td style="padding: 8px; color: #6b7280;">Net MSC</td><td style="padding: 8px;">${formatPrice(grossAmount - (grossAmount - portCharges) * 0.16)}</td></tr>
    <tr style="background: #f0fdf4;"><td style="padding: 8px; color: #059669; font-weight: bold;">Comision agenție</td><td style="padding: 8px; color: #059669; font-weight: bold;">${formatPrice((grossAmount - portCharges) * 0.16)}</td></tr>
    <tr><td style="padding: 8px; color: #6b7280;">Depozit</td><td style="padding: 8px;">${formatPrice(depositDue)}</td></tr>
  </table>
  <p style="margin-top: 20px; font-size: 13px; color: #6b7280;">Status: <strong>Quote — necesită confirmare</strong></p>
</div>
      `,
    });

    return NextResponse.json({
      success: true,
      clientEmailId: clientEmail.data?.id,
      agencyEmailId: agencyEmail.data?.id,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare email";
    console.error("Email error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}