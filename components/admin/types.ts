export interface CruiseRequest {
  id: string;
  created_at: string;
  client_name: string;
  client_phone: string;
  client_email: string | null;
  message: string | null;
  cruise_id: string;
  ship_name: string | null;
  sailing_date: string | null;
  sailing_port: string | null;
  nights: number | null;
  category: string | null;
  cabin_name: string | null;
  fare_desc: string | null;
  price_type: string | null;
  occupancy: string | null;
  price: number | null;
  itin_desc: string | null;
  source: string;
  status: "new" | "contacted" | "offer_sent" | "confirmed" | "cancelled";
  admin_notes: string | null;
  assigned_to: string | null;
}

export interface Booking {
  id: string;
  created_at: string;
  booking_no_msc: string;
  cruise_id: string;
  ship_code: string | null;
  ship_name: string | null;
  sailing_date: string | null;
  category_code: string | null;
  category_name: string | null;
  cabin_no: string | null;
  is_quote: boolean;
  no_adults: number | null;
  gross_amount: number | null;
  net_amount: number | null;
  commission: number | null;
  port_charges: number | null;
  service_charge_total: number | null;
  deposit_due: number | null;
  pay_method: string | null;
  lead_first_name: string | null;
  lead_last_name: string | null;
  lead_email: string | null;
  lead_phone: string | null;
  lead_dob: string | null;
  status: string;
}