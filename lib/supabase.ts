import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseService = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client pentru browser (anon key)
export const supabase = createClient(supabaseUrl, supabaseAnon);

// Client pentru server/API routes (service role — mai multe permisiuni)
export const supabaseAdmin = createClient(supabaseUrl, supabaseService, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── Types din schema ─────────────────────────────────────────────────────────

export interface CruiseRequest {
  id?: string;
  created_at?: string;
  updated_at?: string;

  client_name: string;
  client_phone: string;
  client_email?: string;
  message?: string;

  cruise_id: string;
  ship_cd?: string;
  ship_name?: string;
  sailing_date?: string;
  sailing_port?: string;
  nights?: number;

  category?: string;
  cabin_name?: string;
  fare_code?: string;
  fare_desc?: string;
  price_type?: string;
  occupancy?: string;
  price?: number;

  itin_desc?: string;

  source?: string;
  agency_id?: string;

  status?: "new" | "contacted" | "offer_sent" | "confirmed" | "cancelled";
  admin_notes?: string;
  assigned_to?: string;
}

export interface Agency {
  id?: string;
  created_at?: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  city?: string;
  commission_pct?: number;
  is_active?: boolean;
}

export interface MscCache {
  id?: string;
  cache_key: string;
  data: unknown;
  created_at?: string;
  expires_at: string;
  hit_count?: number;
}
