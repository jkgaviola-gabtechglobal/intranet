import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ConfirmationModal from "../../components/ConfirmationModal";
import EditTime from "./EditTime";
import AddTime from "./AddTime";
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiPlus,
  FiChevronDown,
  FiClock,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_RECORDS = [
  {
    id: 1,
    date: "2026-02-24",
    employee: "Sarah Johnson",
    client: "Accenture",
    projectManager: "Michael Torres",
    hourType: "Regular",
    startTime: "08:00",
    endTime: "17:00",
    totalHours: 9,
    notes: "Frontend development sprint",
    status: "Approved",
  },
  {
    id: 2,
    date: "2026-02-24",
    employee: "James Reyes",
    client: "Deloitte",
    projectManager: "Anna Cruz",
    hourType: "OT",
    startTime: "17:00",
    endTime: "21:00",
    totalHours: 4,
    notes: "Emergency deployment support",
    status: "Pending",
  },
  {
    id: 3,
    date: "2026-02-23",
    employee: "Clara Mendoza",
    client: "IBM",
    projectManager: "Michael Torres",
    hourType: "Regular",
    startTime: "09:00",
    endTime: "18:00",
    totalHours: 9,
    notes: "QA testing & bug fixes",
    status: "Approved",
  },
  {
    id: 4,
    date: "2026-02-23",
    employee: "David Santos",
    client: "Accenture",
    projectManager: "Lisa Park",
    hourType: "Regular",
    startTime: "08:30",
    endTime: "17:30",
    totalHours: 9,
    notes: "API integration",
    status: "Pending",
  },
  {
    id: 5,
    date: "2026-02-22",
    employee: "Sarah Johnson",
    client: "Deloitte",
    projectManager: "Anna Cruz",
    hourType: "OT",
    startTime: "18:00",
    endTime: "22:00",
    totalHours: 4,
    notes: "Client presentation prep",
    status: "Approved",
  },
  {
    id: 6,
    date: "2026-02-21",
    employee: "Mark Villanueva",
    client: "IBM",
    projectManager: "Lisa Park",
    hourType: "Regular",
    startTime: "08:00",
    endTime: "17:00",
    totalHours: 9,
    notes: "Database migration",
    status: "Pending",
  },
  {
    id: 7,
    date: "2026-02-21",
    employee: "James Reyes",
    client: "Accenture",
    projectManager: "Michael Torres",
    hourType: "Regular",
    startTime: "08:00",
    endTime: "17:00",
    totalHours: 9,
    notes: "Code review & refactor",
    status: "Approved",
  },
  {
    id: 8,
    date: "2026-02-20",
    employee: "Clara Mendoza",
    client: "Deloitte",
    projectManager: "Lisa Park",
    hourType: "OT",
    startTime: "17:00",
    endTime: "20:00",
    totalHours: 3,
    notes: "Hotfix deployment",
    status: "Approved",
  },
  {
    id: 9,
    date: "2026-02-20",
    employee: "David Santos",
    client: "IBM",
    projectManager: "Anna Cruz",
    hourType: "Regular",
    startTime: "09:00",
    endTime: "18:00",
    totalHours: 9,
    notes: "Performance optimization",
    status: "Pending",
  },
  {
    id: 10,
    date: "2026-02-19",
    employee: "Mark Villanueva",
    client: "Accenture",
    projectManager: "Michael Torres",
    hourType: "Regular",
    startTime: "08:00",
    endTime: "17:00",
    totalHours: 9,
    notes: "Infrastructure setup",
    status: "Approved",
  },
  {
    id: 11,
    date: "2026-02-19",
    employee: "Sarah Johnson",
    client: "IBM",
    projectManager: "Lisa Park",
    hourType: "OT",
    startTime: "18:00",
    endTime: "21:00",
    totalHours: 3,
    notes: "Sprint retrospective prep",
    status: "Pending",
  },
  {
    id: 12,
    date: "2026-02-18",
    employee: "James Reyes",
    client: "Deloitte",
    projectManager: "Anna Cruz",
    hourType: "Regular",
    startTime: "08:30",
    endTime: "17:30",
    totalHours: 9,
    notes: "Security audit support",
    status: "Approved",
  },
  {
    id: 13,
    date: "2026-02-18",
    employee: "Clara Mendoza",
    client: "Accenture",
    projectManager: "Michael Torres",
    hourType: "Regular",
    startTime: "09:00",
    endTime: "18:00",
    totalHours: 9,
    notes: "User acceptance testing",
    status: "Pending",
  },
  {
    id: 14,
    date: "2026-02-17",
    employee: "David Santos",
    client: "Deloitte",
    projectManager: "Lisa Park",
    hourType: "OT",
    startTime: "17:00",
    endTime: "22:00",
    totalHours: 5,
    notes: "Go-live monitoring",
    status: "Approved",
  },
  {
    id: 15,
    date: "2026-02-17",
    employee: "Mark Villanueva",
    client: "IBM",
    projectManager: "Anna Cruz",
    hourType: "Regular",
    startTime: "08:00",
    endTime: "17:00",
    totalHours: 9,
    notes: "Deployment pipeline setup",
    status: "Pending",
  },
  {
    id: 16,
    date: "2026-02-17",
    employee: "Sarah Johnson",
    client: "Accenture",
    projectManager: "Michael Torres",
    hourType: "Regular",
    startTime: "08:00",
    endTime: "17:00",
    totalHours: 9,
    notes: "Stakeholder sync",
    status: "Approved",
  },
  {
    id: 17,
    date: "2026-02-16",
    employee: "James Reyes",
    client: "IBM",
    projectManager: "Lisa Park",
    hourType: "Regular",
    startTime: "09:00",
    endTime: "18:00",
    totalHours: 9,
    notes: "Integration testing",
    status: "Approved",
  },
  {
    id: 18,
    date: "2026-02-16",
    employee: "Clara Mendoza",
    client: "Deloitte",
    projectManager: "Anna Cruz",
    hourType: "OT",
    startTime: "17:00",
    endTime: "20:00",
    totalHours: 3,
    notes: "Documentation update",
    status: "Pending",
  },
  {
    id: 19,
    date: "2026-02-15",
    employee: "David Santos",
    client: "Accenture",
    projectManager: "Michael Torres",
    hourType: "Regular",
    startTime: "08:30",
    endTime: "17:30",
    totalHours: 9,
    notes: "Architecture review",
    status: "Approved",
  },
  {
    id: 20,
    date: "2026-02-15",
    employee: "Mark Villanueva",
    client: "Deloitte",
    projectManager: "Lisa Park",
    hourType: "Regular",
    startTime: "08:00",
    endTime: "17:00",
    totalHours: 9,
    notes: "Regression testing",
    status: "Pending",
  },
  {
    id: 21,
    date: "2026-02-14",
    employee: "Sarah Johnson",
    client: "IBM",
    projectManager: "Anna Cruz",
    hourType: "OT",
    startTime: "18:00",
    endTime: "22:00",
    totalHours: 4,
    notes: "Release candidate validation",
    status: "Approved",
  },
  {
    id: 22,
    date: "2026-02-14",
    employee: "James Reyes",
    client: "Accenture",
    projectManager: "Michael Torres",
    hourType: "Regular",
    startTime: "08:00",
    endTime: "17:00",
    totalHours: 9,
    notes: "Feature flagging setup",
    status: "Pending",
  },
];

const EMPLOYEES = [
  "All Consultants",
  "Sarah Johnson",
  "James Reyes",
  "Clara Mendoza",
  "David Santos",
  "Mark Villanueva",
];
const CLIENTS = ["All Clients", "Accenture", "Deloitte", "IBM"];
const MANAGERS = ["All Managers", "Michael Torres", "Anna Cruz", "Lisa Park"];
const STATUSES = ["All Status", "Pending", "Approved"];

// ─── Sub-components ───────────────────────────────────────────────────────────
function FilterSelect({ icon: Icon, value, onChange, options }) {
  return (
    <div className="relative">
      {Icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a0bfcc]">
          <Icon className="w-3.5 h-3.5" />
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none h-9 rounded-lg border border-[#ccdde6] bg-white text-sm text-[#1d4e6e] pr-8 outline-none focus:border-[#5b9ab5] focus:ring-1 focus:ring-[#5b9ab5]/25 transition-all cursor-pointer ${Icon ? "pl-8" : "pl-3"}`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <FiChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#a0bfcc]" />
    </div>
  );
}

function DateInput({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <FiCalendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a0bfcc]" />
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 pl-8 pr-3 rounded-lg border border-[#ccdde6] bg-white text-sm text-[#1d4e6e] outline-none focus:border-[#5b9ab5] focus:ring-1 focus:ring-[#5b9ab5]/25 transition-all"
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const isApproved = status === "Approved";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isApproved
          ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
          : "bg-amber-50 text-amber-600 ring-1 ring-amber-200"
      }`}
    >
      {isApproved ? (
        <FiCheckCircle className="w-3 h-3" />
      ) : (
        <FiAlertCircle className="w-3 h-3" />
      )}
      {status}
    </span>
  );
}

function to12h(time) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function HourTypeBadge({ type }) {
  const isOT = type === "OT";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold tracking-wide ${
        isOT
          ? "bg-[#e0eef5] text-[#1d4e6e]"
          : "bg-[#f4f9fc] text-[#5b9ab5] ring-1 ring-[#ccdde6]"
      }`}
    >
      {type}
    </span>
  );
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  if (totalPages <= 1 && totalItems <= pageSize) return null;

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);
  const progress =
    totalPages > 1 ? ((currentPage - 1) / (totalPages - 1)) * 100 : 100;

  // Build page number list with ellipsis
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("…");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div className="px-5 py-3 border-t border-[#eaf3f8] flex items-center justify-between gap-4 flex-wrap">
      {/* Left: range label + page size */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-[#a0bfcc]">
          <span className="font-semibold text-[#4a7a95]">
            {from}–{to}
          </span>{" "}
          of <span className="font-semibold text-[#4a7a95]">{totalItems}</span>{" "}
          records
        </span>
        <div className="w-px h-4 bg-[#e0eef5]" />
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-7 px-2 pr-6 text-xs rounded-lg border border-[#ccdde6] bg-white text-[#4a7a95] outline-none focus:border-[#5b9ab5] appearance-none cursor-pointer"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23a0bfcc'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 6px center",
          }}
        >
          {[5, 10, 15, 20].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
      </div>

      {/* Center: pill page buttons */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#5b9ab5] hover:bg-[#e0eef5] hover:text-[#1d4e6e] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <FiChevronLeft className="w-3.5 h-3.5" />
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className="w-7 h-7 flex items-center justify-center text-xs text-[#a0bfcc]"
            >
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                p === currentPage
                  ? "bg-[#1d4e6e] text-white shadow-sm shadow-[#1d4e6e]/20"
                  : "text-[#4a7a95] hover:bg-[#eaf3f8] hover:text-[#1d4e6e]"
              }`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#5b9ab5] hover:bg-[#e0eef5] hover:text-[#1d4e6e] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <FiChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: thin progress track */}
      <div className="flex items-center gap-2 min-w-20">
        <div className="flex-1 h-1 rounded-full bg-[#e0eef5] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#5b9ab5] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-[#a0bfcc] font-medium whitespace-nowrap">
          p.{currentPage}/{totalPages}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TimeTracking() {
  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("All Consultants");
  const [filterClient, setFilterClient] = useState("All Clients");
  const [filterManager, setFilterManager] = useState("All Managers");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selection
  const [selected, setSelected] = useState(new Set());

  const filtered = MOCK_RECORDS.filter((r) => {
    if (startDate && r.date < startDate) return false;
    if (endDate && r.date > endDate) return false;
    if (filterEmployee !== "All Consultants" && r.employee !== filterEmployee)
      return false;
    if (filterClient !== "All Clients" && r.client !== filterClient)
      return false;
    if (filterManager !== "All Managers" && r.projectManager !== filterManager)
      return false;
    if (filterStatus !== "All Status" && r.status !== filterStatus)
      return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.employee.toLowerCase().includes(q) ||
        r.client.toLowerCase().includes(q) ||
        r.notes.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalHours = filtered.reduce((s, r) => s + r.totalHours, 0);
  const pendingCount = filtered.filter((r) => r.status === "Pending").length;
  const approvedCount = filtered.filter((r) => r.status === "Approved").length;

  // Pagination derived values
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilterEmployee("All Consultants");
    setFilterClient("All Clients");
    setFilterManager("All Managers");
    setFilterStatus("All Status");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setCurrentPage(1);
  };

  // Bulk selection helpers
  const allFilteredIds = filtered.map((r) => r.id);
  const allSelected =
    allFilteredIds.length > 0 && allFilteredIds.every((id) => selected.has(id));
  const someSelected =
    allFilteredIds.some((id) => selected.has(id)) && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        allFilteredIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      setSelected((prev) => new Set([...prev, ...allFilteredIds]));
    }
  };

  const toggleRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedCount = allFilteredIds.filter((id) => selected.has(id)).length;
  const clearSelection = () => setSelected(new Set());

  // Add modal
  const [addOpen, setAddOpen] = useState(false);
  const [addKey, setAddKey] = useState(0);
  const openAdd = () => {
    setAddKey((k) => k + 1);
    setAddOpen(true);
  };
  const closeAdd = () => setAddOpen(false);
  const handleAdd = () => {
    // TODO: persist new record
    closeAdd();
  };

  // Edit modal
  const [editRecord, setEditRecord] = useState(null);
  const openEdit = (row) => setEditRecord(row);
  const closeEdit = () => setEditRecord(null);
  const handleSave = () => {
    // TODO: persist updated record
    closeEdit();
  };

  // Confirmation modal
  const [modal, setModal] = useState({ open: false, variant: "approve" });
  const openModal = (variant) => setModal({ open: true, variant });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));
  const handleConfirm = () => {
    // TODO: apply action to selected records
    closeModal();
    clearSelection();
  };

  return (
    <div className="min-h-screen bg-[#eaf3f8]">
      <Header />
      <Sidebar />

      <main className="pt-16 pl-16">
        <div className="p-6 space-y-5">
          {/* ── Page Header ── */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#1d4e6e] flex items-center gap-2">
                <FiClock className="w-5 h-5 text-[#5b9ab5]" />
                Time Tracking
              </h1>
              <p className="mt-0.5 text-sm text-[#5b9ab5]">
                All consultant time logs
              </p>
            </div>
            <button
              onClick={openAdd}
              className="h-9 px-4 flex items-center gap-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-[#3d7a9a] to-[#1d4e6e] hover:from-[#2d6a8a] hover:to-[#163d57] shadow-md shadow-[#1d4e6e]/20 transition-all"
            >
              <FiPlus className="w-4 h-4" />
              Log Time
            </button>
          </div>

          {/* ── Summary Cards ── */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-[#ccdde6] px-5 py-4">
              <p className="text-xs font-medium text-[#a0bfcc] uppercase tracking-wider">
                Total Hours
              </p>
              <p className="mt-1 text-2xl font-bold text-[#1d4e6e]">
                {totalHours}
                <span className="text-sm font-medium text-[#a0bfcc] ml-1">
                  hrs
                </span>
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#ccdde6] px-5 py-4">
              <p className="text-xs font-medium text-[#a0bfcc] uppercase tracking-wider">
                Pending
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-500">
                {pendingCount}
                <span className="text-sm font-medium text-[#a0bfcc] ml-1">
                  logs
                </span>
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#ccdde6] px-5 py-4">
              <p className="text-xs font-medium text-[#a0bfcc] uppercase tracking-wider">
                Approved
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-500">
                {approvedCount}
                <span className="text-sm font-medium text-[#a0bfcc] ml-1">
                  logs
                </span>
              </p>
            </div>
          </div>

          {/* ── Filters Panel ── */}
          <div className="bg-white rounded-xl border border-[#ccdde6] p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <FiFilter className="w-3.5 h-3.5 text-[#5b9ab5]" />
              <span className="text-xs font-semibold text-[#5b9ab5] uppercase tracking-wider">
                Filters
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Date range */}
              <DateInput
                value={startDate}
                onChange={setStartDate}
                placeholder="Start date"
              />
              <span className="text-[#a0bfcc] text-sm">→</span>
              <DateInput
                value={endDate}
                onChange={setEndDate}
                placeholder="End date"
              />

              {/* Dropdowns */}
              <FilterSelect
                value={filterEmployee}
                onChange={handleFilterChange(setFilterEmployee)}
                options={EMPLOYEES}
              />
              <FilterSelect
                value={filterClient}
                onChange={handleFilterChange(setFilterClient)}
                options={CLIENTS}
              />
              <FilterSelect
                value={filterManager}
                onChange={handleFilterChange(setFilterManager)}
                options={MANAGERS}
              />
              <FilterSelect
                value={filterStatus}
                onChange={handleFilterChange(setFilterStatus)}
                options={STATUSES}
              />

              {/* Search */}
              <div className="relative ml-auto">
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a0bfcc]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 pl-8 pr-3 w-44 rounded-lg border border-[#ccdde6] bg-[#f4f9fc] text-sm text-[#1d4e6e] placeholder-[#a0bfcc] outline-none focus:border-[#5b9ab5] focus:ring-1 focus:ring-[#5b9ab5]/25 transition-all"
                />
              </div>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="h-9 px-3 text-xs font-medium text-[#5b9ab5] hover:text-[#1d4e6e] hover:bg-[#eaf3f8] rounded-lg transition-colors border border-transparent hover:border-[#ccdde6]"
              >
                Reset
              </button>
            </div>
          </div>

          {/* ── Table ── */}
          <div className="bg-white rounded-xl border border-[#ccdde6] overflow-hidden">
            {/* Table toolbar */}
            <div className="px-5 py-3 border-b border-[#eaf3f8] flex items-center justify-between min-h-11">
              {selectedCount > 0 ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#1d4e6e]">
                    {selectedCount} selected
                  </span>
                  <div className="w-px h-4 bg-[#ccdde6]" />
                  <button
                    onClick={() => openModal("approve")}
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => openModal("reject")}
                    className="text-xs font-medium text-amber-500 hover:text-amber-600 hover:bg-amber-50 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => openModal("delete")}
                    className="text-xs font-medium text-red-400 hover:text-red-500 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={clearSelection}
                    className="text-xs text-[#a0bfcc] hover:text-[#5b9ab5] px-2 py-1 rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <span className="text-xs text-[#a0bfcc]">
                  {filtered.length} record{filtered.length !== 1 ? "s" : ""}{" "}
                  found
                </span>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f4f9fc] border-b border-[#eaf3f8]">
                    <th className="pl-4 pr-2 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = someSelected;
                        }}
                        onChange={toggleAll}
                        className="w-4 h-4 rounded border-[#ccdde6] text-[#1d4e6e] accent-[#1d4e6e] cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      Consultant
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      Project Manager
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      Hour Type
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      Start
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      End
                    </th>
                    <th className="px-4 py-3 text-text-center text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      Total Hrs
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      Notes
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc] whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f7fb]">
                  {paginated.length === 0 ? (
                    <tr>
                      <td
                        colSpan={12}
                        className="px-4 py-12 text-center text-sm text-[#a0bfcc]"
                      >
                        No records match the current filters.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((row) => {
                      const isChecked = selected.has(row.id);
                      return (
                        <tr
                          key={row.id}
                          className={`transition-colors group ${
                            isChecked ? "bg-[#eaf3f8]" : "hover:bg-[#f4f9fc]"
                          }`}
                        >
                          <td className="pl-4 pr-2 py-3 w-10">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleRow(row.id)}
                              className="w-4 h-4 rounded border-[#ccdde6] accent-[#1d4e6e] cursor-pointer"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-[#4a7a95] font-medium">
                            {row.date}
                          </td>
                          <td
                            className="px-4 py-3 max-w-36 truncate font-medium text-[#1d4e6e] cursor-default"
                            title={row.employee}
                          >
                            {row.employee}
                          </td>
                          <td
                            className="px-4 py-3 max-w-28 truncate text-[#4a7a95] cursor-default"
                            title={row.client}
                          >
                            {row.client}
                          </td>
                          <td
                            className="px-4 py-3 max-w-36 truncate text-[#4a7a95] cursor-default"
                            title={row.projectManager}
                          >
                            {row.projectManager}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <HourTypeBadge type={row.hourType} />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-[#4a7a95] font-mono text-xs text-center">
                            {to12h(row.startTime)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-[#4a7a95] font-mono text-xs text-center">
                            {to12h(row.endTime)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <span className="font-bold text-[#1d4e6e]">
                              {row.totalHours}
                            </span>
                            <span className="text-[#a0bfcc] text-xs ml-0.5">
                              h
                            </span>
                          </td>
                          <td
                            className="px-4 py-3 max-w-45 truncate text-[#7aa5b8] text-xs cursor-default"
                            title={row.notes || undefined}
                          >
                            {row.notes || "—"}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <StatusBadge status={row.status} />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => openEdit(row)}
                                className="p-1.5 rounded-lg text-[#5b9ab5] hover:bg-[#e0eef5] hover:text-[#1d4e6e] transition-colors"
                                title="Edit"
                              >
                                <FiEdit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </main>

      <ConfirmationModal
        open={modal.open}
        variant={modal.variant}
        count={selectedCount}
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />

      <AddTime
        key={addKey}
        open={addOpen}
        onSave={handleAdd}
        onCancel={closeAdd}
      />

      <EditTime
        key={editRecord?.id}
        open={!!editRecord}
        record={editRecord}
        onSave={handleSave}
        onCancel={closeEdit}
      />
    </div>
  );
}
