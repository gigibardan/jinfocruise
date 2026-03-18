"use client";
import { useEffect, useState, useCallback } from "react";
import { LoginScreen } from "@/components/admin/LoginScreen";
import { RequestsTab } from "@/components/admin/RequestsTab";
import { BookingsTable } from "@/components/admin/BookingsTable";
import type { CruiseRequest, Booking } from "@/components/admin/types";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"requests" | "bookings">("requests");
  const [requests, setRequests] = useState<CruiseRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "1") {
      setAuthenticated(true);
    }
  }, []);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/requests?limit=200");
      const data = await res.json();
      setRequests(data.requests ?? []);
    } catch { }
    finally { setLoading(false); }
  }, []);

  const fetchBookings = useCallback(async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch("/api/bookings?limit=200");
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } catch { }
    finally { setLoadingBookings(false); }
  }, []);

  useEffect(() => { if (authenticated) fetchRequests(); }, [authenticated, fetchRequests]);
  useEffect(() => {
    if (authenticated && activeTab === "bookings") fetchBookings();
  }, [authenticated, activeTab, fetchBookings]);

  const handleUpdate = useCallback((id: string, updates: Partial<CruiseRequest>) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, ...updates } : r));
  }, []);

  if (!authenticated) return <LoginScreen onLogin={() => setAuthenticated(true)} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="font-bold text-gray-800">JinfoCruise Admin</span>
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("requests")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "requests" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Cereri ofertă
                <span className="ml-1.5 text-xs opacity-60">{requests.length}</span>
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "bookings" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Rezervări MSC
                <span className="ml-1.5 text-xs opacity-60">{bookings.length}</span>
              </button>
            </div>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthenticated(false); }}
            className="text-sm text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg"
          >
            Ieșire
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "requests" && (
          <RequestsTab
            requests={requests}
            loading={loading}
            onUpdate={handleUpdate}
            onRefresh={fetchRequests}
          />
        )}
        {activeTab === "bookings" && (
          <BookingsTable
            bookings={bookings}
            loading={loadingBookings}
            onRefresh={fetchBookings}
          />
        )}
      </div>
    </div>
  );
}