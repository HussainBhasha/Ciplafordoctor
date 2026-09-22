import React, { useEffect, useState, useMemo } from "react";
import {
  Download,
  RefreshCw,
  Search,
  Mail,
  Calendar,
  Trash2,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  X,
  ShieldCheck,
  SortDesc,
  SortAsc,
  Filter,
  Clock,
  Users,
  FileText,
  Phone,
  MapPin,
  FileCheck2
} from "lucide-react";
import Container from "@/components/ui/Container";
import brandLogo from "@/assets/Cipla_logo.svg.png";

interface Contact {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}

interface DoctorUser {
  id: number;
  mci_code: string;
  email?: string;
  city?: string;
  phone?: string;
  is_verified: boolean | number;
  created_at: string;
}

type DateFilterKey = "all" | "today" | "7days" | "30days" | "thisMonth" | "custom";
type TabKey = "login" | "contact";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabKey>("contact");

  // Contact state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactLoading, setContactLoading] = useState<boolean>(true);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSearch, setContactSearch] = useState<string>("");
  const [contactSortOrder, setContactSortOrder] = useState<"desc" | "asc">("desc");
  const [contactDateFilter, setContactDateFilter] = useState<DateFilterKey>("all");
  const [contactFromDate, setContactFromDate] = useState<string>("");
  const [contactToDate, setContactToDate] = useState<string>("");
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  // Doctor (login) state
  const [users, setUsers] = useState<DoctorUser[]>([]);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState<string>("");
  const [userSortOrder, setUserSortOrder] = useState<"desc" | "asc">("desc");
  const [userDateFilter, setUserDateFilter] = useState<DateFilterKey>("all");
  const [userFromDate, setUserFromDate] = useState<string>("");
  const [userToDate, setUserToDate] = useState<string>("");
  const [userToDelete, setUserToDelete] = useState<DoctorUser | null>(null);

  // Shared state
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Auto-dismiss errors after 4 seconds
  useEffect(() => {
    if (!contactError) return;
    const t = setTimeout(() => setContactError(null), 4000);
    return () => clearTimeout(t);
  }, [contactError]);

  useEffect(() => {
    if (!userError) return;
    const t = setTimeout(() => setUserError(null), 4000);
    return () => clearTimeout(t);
  }, [userError]);

  // ========== FETCHES ==========
  const fetchContacts = async () => {
    setContactLoading(true);
    setContactError(null);
    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("fetchContacts:", err);
      setContactError(err.message || "Server unreachable");
    } finally {
      setContactLoading(false);
    }
  };

  const fetchUsers = async () => {
    setUserLoading(true);
    setUserError(null);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("fetchUsers:", err);
      setUserError(err.message || "Server unreachable");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchUsers();
  }, []);

  // ========== DELETE ==========
  const handleDeleteContact = async () => {
    if (!contactToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/contacts/${contactToDelete.id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 404) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Delete failed");
      }
      setContacts((prev) => prev.filter((c) => c.id !== contactToDelete.id));
      showToast("Contact entry removed", "success");
      setContactToDelete(null);
    } catch (err: any) {
      showToast(err.message || "Failed to delete contact", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${userToDelete.id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 404) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Delete failed");
      }
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      showToast("Doctor registration removed", "success");
      setUserToDelete(null);
    } catch (err: any) {
      showToast(err.message || "Failed to delete doctor registration", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // ========== HELPERS ==========
  const formatDate = (iso: string) => {
    if (!iso) return "N/A";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  const isWithinDateRange = (
    created_at: string,
    filter: DateFilterKey,
    fromDate?: string,
    toDate?: string
  ): boolean => {
    const d = new Date(created_at).getTime();
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    switch (filter) {
      case "all":
        return true;
      case "today": {
        const s = new Date();
        s.setHours(0, 0, 0, 0);
        return d >= s.getTime();
      }
      case "7days":
        return now - d <= 7 * oneDay;
      case "30days":
        return now - d <= 30 * oneDay;
      case "thisMonth": {
        const s = new Date();
        s.setDate(1);
        s.setHours(0, 0, 0, 0);
        return d >= s.getTime();
      }
      case "custom": {
        if (fromDate) {
          const from = new Date(fromDate);
          from.setHours(0, 0, 0, 0);
          if (d < from.getTime()) return false;
        }
        if (toDate) {
          const to = new Date(toDate);
          to.setHours(23, 59, 59, 999);
          if (d > to.getTime()) return false;
        }
        return true;
      }
      default:
        return true;
    }
  };

  const handleQuickFilterClick = (
    key: DateFilterKey,
    setFilter: (k: DateFilterKey) => void,
    setFrom: (d: string) => void,
    setTo: (d: string) => void
  ) => {
    setFilter(key);
    if (key !== "custom") {
      setFrom("");
      setTo("");
    }
  };

  const handleFromDateChange = (
    value: string,
    setFrom: (d: string) => void,
    setFilter: (k: DateFilterKey) => void
  ) => {
    setFrom(value);
    setFilter("custom");
  };

  const handleToDateChange = (
    value: string,
    setTo: (d: string) => void,
    setFilter: (k: DateFilterKey) => void
  ) => {
    setTo(value);
    setFilter("custom");
  };

  const dateFilterOptions: { key: DateFilterKey; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "All", icon: <FileText className="h-3.5 w-3.5" /> },
    { key: "today", label: "Today", icon: <Clock className="h-3.5 w-3.5" /> },
    { key: "7days", label: "Last 7 Days", icon: <Calendar className="h-3.5 w-3.5" /> },
    { key: "30days", label: "Last 30 Days", icon: <Calendar className="h-3.5 w-3.5" /> },
    { key: "thisMonth", label: "This Month", icon: <Calendar className="h-3.5 w-3.5" /> },
    { key: "custom", label: "Custom", icon: <Calendar className="h-3.5 w-3.5" /> },
  ];

  // ========== FILTERED DATA ==========
  const filteredContacts = useMemo(() => {
    const q = contactSearch.toLowerCase().trim();
    let result = [...contacts];
    result = result.filter((c) =>
      isWithinDateRange(c.created_at, contactDateFilter, contactFromDate, contactToDate)
    );
    if (q) {
      result = result.filter((c) =>
        c.full_name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        (c.subject && c.subject.toLowerCase().includes(q)) ||
        (c.message && c.message.toLowerCase().includes(q))
      );
    }
    result.sort((a, b) => {
      const tA = new Date(a.created_at).getTime();
      const tB = new Date(b.created_at).getTime();
      return contactSortOrder === "desc" ? tB - tA : tA - tB;
    });
    return result;
  }, [contacts, contactSearch, contactSortOrder, contactDateFilter, contactFromDate, contactToDate]);

  const filteredUsers = useMemo(() => {
    const q = userSearch.toLowerCase().trim();
    let result = [...users];
    result = result.filter((u) =>
      isWithinDateRange(u.created_at, userDateFilter, userFromDate, userToDate)
    );
    if (q) {
      result = result.filter((u) =>
        u.email?.toLowerCase().includes(q) ||
        u.city?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q) ||
        u.mci_code?.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      const tA = new Date(a.created_at).getTime();
      const tB = new Date(b.created_at).getTime();
      return userSortOrder === "desc" ? tB - tA : tA - tB;
    });
    return result;
  }, [users, userSearch, userSortOrder, userDateFilter, userFromDate, userToDate]);

  const loading = activeTab === "contact" ? contactLoading : userLoading;
  const error = activeTab === "contact" ? contactError : userError;
  const refreshFn = activeTab === "contact" ? fetchContacts : fetchUsers;
  const downloadHref = activeTab === "contact"
    ? "/api/admin/contacts/download"
    : "/api/admin/users/download";
  const downloadFilename = activeTab === "contact" ? "contacts" : "registered_doctors";
  const totalCount = activeTab === "contact" ? filteredContacts.length : filteredUsers.length;
  const rawCount = activeTab === "contact" ? contacts.length : users.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 text-slate-800 antialiased">
      {/* ========== ADMIN NAVBAR ========== */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-sky-100 bg-white/95 backdrop-blur-md shadow-[0_4px_18px_rgb(2_8_23/0.06)]">
        <Container>
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            {/* LEFT: Secure Admin Dashboard with ShieldCheck Logo */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0b3a66] to-[#0e4a82] text-white shadow-md shrink-0">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#0b3a66] leading-tight">
                  Secure Admin Dashboard
                </h1>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500">
                  Manage registered doctors & contact inquiries
                </p>
              </div>
            </div>

            {/* RIGHT: Cipla Logo */}
            <div className="shrink-0">
              <img
                src={brandLogo}
                alt="Cipla"
                className="h-8 sm:h-10 w-auto object-contain contrast-125"
                decoding="async"
              />
            </div>
          </div>
        </Container>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="pt-24 pb-16">
        <Container>
          {/* ========== REFRESH + EXPORT BUTTONS (below navbar) ========== */}
          <div className="mb-6 flex flex-wrap items-center justify-end gap-2 sm:gap-2.5">
            <button
              onClick={refreshFn}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-[#0b3a66] disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-[#0b3a66]" : ""}`} />
              <span>Refresh</span>
            </button>

            <a
              href={downloadHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#0b3a66] to-[#0e4a82] px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:from-[#082947] hover:to-[#0b3a66] active:scale-95"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </a>
          </div>

          {/* ========== TAB BUTTONS (Login Details / Contact Details) ========== */}
          <div className="mb-6 inline-flex rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200 gap-1.5">
            <button
              onClick={() => setActiveTab("login")}
              className={`inline-flex items-center gap-2 rounded-xl px-5 sm:px-7 py-2.5 text-sm sm:text-base font-bold transition-all duration-200 ${
                activeTab === "login"
                  ? "bg-gradient-to-r from-[#0b3a66] to-[#0e4a82] text-white shadow-lg ring-2 ring-[#0b3a66]/20"
                  : "text-slate-500 hover:text-[#0b3a66] hover:bg-sky-50"
              }`}
            >
              <Users className={`h-4 w-4 sm:h-5 sm:w-5 ${activeTab === "login" ? "text-sky-200" : "text-slate-400"}`} />
              <span>Login Details</span>
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`inline-flex items-center gap-2 rounded-xl px-5 sm:px-7 py-2.5 text-sm sm:text-base font-bold transition-all duration-200 ${
                activeTab === "contact"
                  ? "bg-gradient-to-r from-[#0b3a66] to-[#0e4a82] text-white shadow-lg ring-2 ring-[#0b3a66]/20"
                  : "text-slate-500 hover:text-[#0b3a66] hover:bg-sky-50"
              }`}
            >
              <MessageSquare className={`h-4 w-4 sm:h-5 sm:w-5 ${activeTab === "contact" ? "text-sky-200" : "text-slate-400"}`} />
              <span>Contact Details</span>
            </button>
          </div>

          {/* ========== TOOLBAR: Date Filter + Search + Sort ========== */}
          <div className="mb-6 space-y-4">
            {/* Date filter quick buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 mr-2">
                <Filter className="h-3.5 w-3.5" />
                <span>DATE FILTER</span>
              </div>
              {dateFilterOptions.map((opt) => {
                const currentFilter = activeTab === "contact" ? contactDateFilter : userDateFilter;
                const setFilter = activeTab === "contact" ? setContactDateFilter : setUserDateFilter;
                const setFrom = activeTab === "contact" ? setContactFromDate : setUserFromDate;
                const setTo = activeTab === "contact" ? setContactToDate : setUserToDate;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleQuickFilterClick(opt.key, setFilter, setFrom, setTo)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                      currentFilter === opt.key
                        ? "bg-[#0b3a66] text-white shadow-md ring-2 ring-[#0b3a66]/30"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-[#0b3a66]"
                    }`}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Calendar date pickers (From / To) - shown when custom or dates filled */}
            {((activeTab === "contact" && (contactDateFilter === "custom" || contactFromDate || contactToDate)) ||
              (activeTab === "login" && (userDateFilter === "custom" || userFromDate || userToDate))) && (
              <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white border border-sky-200 p-3 sm:p-4 shadow-sm">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b3a66] mr-1">
                  <Calendar className="h-4 w-4" />
                  <span>SELECT DATE RANGE</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-medium text-slate-600 whitespace-nowrap">From:</label>
                    <input
                      type="date"
                      value={activeTab === "contact" ? contactFromDate : userFromDate}
                      onChange={(e) =>
                        activeTab === "contact"
                          ? handleFromDateChange(e.target.value, setContactFromDate, setContactDateFilter)
                          : handleFromDateChange(e.target.value, setUserFromDate, setUserDateFilter)
                      }
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 transition"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-medium text-slate-600 whitespace-nowrap">To:</label>
                    <input
                      type="date"
                      value={activeTab === "contact" ? contactToDate : userToDate}
                      onChange={(e) =>
                        activeTab === "contact"
                          ? handleToDateChange(e.target.value, setContactToDate, setContactDateFilter)
                          : handleToDateChange(e.target.value, setUserToDate, setUserDateFilter)
                      }
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 transition"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (activeTab === "contact") {
                        setContactDateFilter("all");
                        setContactFromDate("");
                        setContactToDate("");
                      } else {
                        setUserDateFilter("all");
                        setUserFromDate("");
                        setUserToDate("");
                      }
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-white hover:text-[#0b3a66] transition"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Search + Sort Row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={
                    activeTab === "contact"
                      ? "Search by name, email, subject, or message..."
                      : "Search by MCI code..."
                  }
                  value={activeTab === "contact" ? contactSearch : userSearch}
                  onChange={(e) =>
                    activeTab === "contact"
                      ? setContactSearch(e.target.value)
                      : setUserSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 transition"
                />
                {(activeTab === "contact" ? contactSearch : userSearch) && (
                  <button
                    onClick={() =>
                      activeTab === "contact" ? setContactSearch("") : setUserSearch("")
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 justify-between sm:justify-end">
                <button
                  onClick={() =>
                    activeTab === "contact"
                      ? setContactSortOrder(contactSortOrder === "desc" ? "asc" : "desc")
                      : setUserSortOrder(userSortOrder === "desc" ? "asc" : "desc")
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  {(activeTab === "contact" ? contactSortOrder : userSortOrder) === "desc" ? (
                    <>
                      <SortDesc className="h-4 w-4 text-slate-500" />
                      <span>Newest First</span>
                    </>
                  ) : (
                    <>
                      <SortAsc className="h-4 w-4 text-slate-500" />
                      <span>Oldest First</span>
                    </>
                  )}
                </button>
                <span className="text-xs font-medium text-slate-500">
                  Showing <strong className="text-slate-800">{totalCount}</strong> of{" "}
                  {rawCount}
                </span>
              </div>
            </div>
          </div>

          {/* ========== ERROR ========== */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-red-800 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <p className="font-semibold">Unable to load data</p>
                <p className="text-red-700 mt-0.5">{error}</p>
                <button
                  onClick={refreshFn}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-red-900 underline hover:no-underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* ========== LOADING ========== */}
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-[#0b3a66] animate-pulse">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-800">
                Loading {activeTab === "contact" ? "contact submissions" : "doctor registrations"}...
              </h3>
              <p className="text-xs text-slate-500 mt-1">Retrieving data from the database</p>
            </div>
          )}

          {/* ========== EMPTY ========== */}
          {!loading && totalCount === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#0b3a66]">
                {activeTab === "contact" ? (
                  <MessageSquare className="h-7 w-7 text-sky-600" />
                ) : (
                  <Users className="h-7 w-7 text-sky-600" />
                )}
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                {activeTab === "contact" ? "No contact inquiries" : "No registered doctors"}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                {activeTab === "contact"
                  ? "Submissions from the contact form will appear here."
                  : "Doctor registrations from the Sign Up form will appear here."}
              </p>
            </div>
          )}

          {/* ========== DOCTOR (LOGIN DETAILS) TABLE ========== */}
          {!loading && activeTab === "login" && totalCount > 0 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-3.5 pl-6 pr-3">#</th>
                      <th className="py-3.5 px-3">Access Date & Time</th>
                      <th className="py-3.5 px-3">MCI / Registration Code</th>
                      <th className="py-3.5 px-3">Status</th>
                      <th className="py-3.5 pl-3 pr-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredUsers.map((user, idx) => (
                      <tr
                        key={user.id}
                        className="transition hover:bg-sky-50/40"
                      >
                        <td className="py-4 pl-6 pr-3 font-bold text-slate-800 text-sm">
                          {idx + 1}
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap text-xs text-slate-500">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-inset ring-violet-200">
                            <FileCheck2 className="h-3.5 w-3.5" />
                            {user.mci_code}
                          </span>
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap">
                          {user.is_verified ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                              <CheckCircle2 className="h-3 w-3" /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
                              <AlertCircle className="h-3 w-3" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="py-4 pl-3 pr-6 text-right whitespace-nowrap">
                          <button
                            onClick={() => setUserToDelete(user)}
                            className="inline-flex items-center gap-1.5 rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete Doctor Access Record"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========== CONTACT DETAILS TABLE ========== */}
          {!loading && activeTab === "contact" && totalCount > 0 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-3.5 pl-6 pr-3">#</th>
                      <th className="py-3.5 px-3">Date & Time</th>
                      <th className="py-3.5 px-3">Full Name</th>
                      <th className="py-3.5 px-3">Email</th>
                      <th className="py-3.5 px-3">Subject</th>
                      <th className="py-3.5 px-3">Message Preview</th>
                      <th className="py-3.5 pl-3 pr-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredContacts.map((contact, idx) => (
                      <tr
                        key={contact.id}
                        className="transition hover:bg-sky-50/40"
                      >
                        <td className="py-4 pl-6 pr-3 font-bold text-slate-800 text-sm">
                          {idx + 1}
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap text-xs text-slate-500">
                          {formatDate(contact.created_at)}
                        </td>
                        <td className="py-4 px-3 font-semibold text-slate-900">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-[#0b3a66] font-bold text-xs uppercase shrink-0">
                              {contact.full_name ? contact.full_name.charAt(0) : "U"}
                            </div>
                            <span className="truncate max-w-[140px]">
                              {contact.full_name || "Anonymous"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span className="text-slate-800 font-medium truncate max-w-[180px]">
                              {contact.email}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          {contact.subject ? (
                            <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-[#0b3a66] ring-1 ring-inset ring-sky-200">
                              {contact.subject}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 italic">General</span>
                          )}
                        </td>
                        <td className="py-4 px-3 max-w-[220px]">
                          <p className="truncate text-xs text-slate-600" title={contact.message}>
                            {contact.message || "—"}
                          </p>
                        </td>
                        <td className="py-4 pl-3 pr-6 text-right whitespace-nowrap">
                          <button
                            onClick={() => setContactToDelete(contact)}
                            className="inline-flex items-center gap-1.5 rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete Contact"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Container>
      </main>

      {/* ========== DELETE CONTACT MODAL ========== */}
      {contactToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-red-100">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-center text-base font-bold text-slate-900">
              Delete Contact Entry?
            </h3>
            <p className="mt-1 text-center text-xs text-slate-500">
              Are you sure you want to permanently delete the inquiry from{" "}
              <strong className="text-slate-800">
                {contactToDelete.full_name || contactToDelete.email}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setContactToDelete(null)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteContact}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-red-700 transition disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== DELETE DOCTOR (USER) MODAL ========== */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-red-100">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-center text-base font-bold text-slate-900">
              Delete Doctor Record?
            </h3>
            <p className="mt-1 text-center text-xs text-slate-500">
              Are you sure you want to permanently delete the entry for MCI code{" "}
              <strong className="text-slate-800">
                {userToDelete.mci_code}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-red-700 transition disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div
            className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-2xl border ${
              toast.type === "error"
                ? "bg-red-50 text-red-800 border-red-200 shadow-red-500/10"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 shadow-emerald-500/10"
            }`}
          >
            {toast.type === "error" ? (
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            )}
            <span className="text-xs font-semibold">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
