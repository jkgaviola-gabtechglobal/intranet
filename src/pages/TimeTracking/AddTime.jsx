import { useEffect, useState } from "react";
import {
  FiX,
  FiClock,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiPlus,
} from "react-icons/fi";

const EMPLOYEES = [
  "Sarah Johnson",
  "James Reyes",
  "Clara Mendoza",
  "David Santos",
  "Mark Villanueva",
];
const CLIENTS = ["Accenture", "Deloitte", "IBM"];
const MANAGERS = ["Michael Torres", "Anna Cruz", "Lisa Park"];
const HOUR_TYPES = ["Regular", "OT"];

const DEFAULT_FORM = {
  date: new Date().toISOString().slice(0, 10),
  employee: EMPLOYEES[0],
  client: CLIENTS[0],
  projectManager: MANAGERS[0],
  hourType: "Regular",
  startTime: "",
  endTime: "",
  notes: "",
};

function Field({ label, icon: Icon, children }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#a0bfcc]">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </label>
      {children}
    </div>
  );
}

function StyledInput({ type = "text", value, onChange, ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-9 px-3 rounded-xl border border-[#ccdde6] bg-[#f4f9fc] text-sm text-[#1d4e6e] placeholder-[#a0bfcc] outline-none focus:border-[#5b9ab5] focus:ring-2 focus:ring-[#5b9ab5]/15 transition-all"
      {...props}
    />
  );
}

function StyledSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 px-3 pr-8 rounded-xl border border-[#ccdde6] bg-[#f4f9fc] text-sm text-[#1d4e6e] appearance-none outline-none focus:border-[#5b9ab5] focus:ring-2 focus:ring-[#5b9ab5]/15 transition-all cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a0bfcc]"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

function HourTypeToggle({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {HOUR_TYPES.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`flex-1 h-9 rounded-xl text-sm font-semibold transition-all border ${
            value === type
              ? type === "OT"
                ? "bg-[#1d4e6e] text-white border-[#1d4e6e] shadow-md shadow-[#1d4e6e]/20"
                : "bg-[#eaf3f8] text-[#1d4e6e] border-[#5b9ab5]"
              : "bg-[#f4f9fc] text-[#a0bfcc] border-[#ccdde6] hover:border-[#5b9ab5] hover:text-[#5b9ab5]"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

function computeHours(start, end) {
  if (!start || !end) return null;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const totalMinutes = eh * 60 + em - (sh * 60 + sm);
  if (totalMinutes <= 0) return null;
  return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 };
}

export default function AddTime({ open, onSave, onCancel }) {
  const [form, setForm] = useState({ ...DEFAULT_FORM });

  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onCancel?.();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const computedHours = computeHours(form.startTime, form.endTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!computedHours) return;
    const totalHours = +(
      (computedHours.hours * 60 + computedHours.minutes) /
      60
    ).toFixed(2);
    onSave?.({ ...form, totalHours, status: "Pending" });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel?.()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0d2d42]/40 backdrop-blur-sm" />

      {/* Sheet */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl shadow-[#1d4e6e]/15 overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-1 w-full bg-linear-to-r from-[#5b9ab5] via-[#3d7a9a] to-[#1d4e6e]" />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-[#eaf3f8]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#eaf3f8] flex items-center justify-center">
              <FiPlus className="w-4 h-4 text-[#5b9ab5]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1d4e6e] leading-tight">
                Log Time Entry
              </h2>
              <p className="text-[11px] text-[#a0bfcc]">
                New time log · defaults to today
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-xl text-[#a0bfcc] hover:text-[#1d4e6e] hover:bg-[#eaf3f8] transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-5 max-h-[calc(100vh-14rem)] overflow-y-auto">
            {/* Row 1: Date + Consultant */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Date" icon={FiCalendar}>
                <StyledInput
                  type="date"
                  value={form.date}
                  onChange={set("date")}
                  required
                />
              </Field>
              <Field label="Consultant" icon={FiUser}>
                <StyledSelect
                  value={form.employee}
                  onChange={set("employee")}
                  options={EMPLOYEES}
                />
              </Field>
            </div>

            {/* Row 2: Client + Project Manager */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Client" icon={FiBriefcase}>
                <StyledSelect
                  value={form.client}
                  onChange={set("client")}
                  options={CLIENTS}
                />
              </Field>
              <Field label="Project Manager" icon={FiUsers}>
                <StyledSelect
                  value={form.projectManager}
                  onChange={set("projectManager")}
                  options={MANAGERS}
                />
              </Field>
            </div>

            {/* Row 3: Hour type toggle */}
            <Field label="Hour Type" icon={FiClock}>
              <HourTypeToggle
                value={form.hourType}
                onChange={set("hourType")}
              />
            </Field>

            {/* Row 4: Start / End time + computed total */}
            <div className="grid grid-cols-3 gap-4">
              <Field label="Start Time" icon={FiClock}>
                <StyledInput
                  type="time"
                  value={form.startTime}
                  onChange={set("startTime")}
                  required
                />
              </Field>
              <Field label="End Time" icon={FiClock}>
                <StyledInput
                  type="time"
                  value={form.endTime}
                  onChange={set("endTime")}
                  required
                />
              </Field>
              {/* Live total hours pill */}
              <Field label="Total Hours">
                <div
                  className={`h-9 flex items-center justify-center rounded-xl border font-bold text-sm transition-all ${
                    computedHours
                      ? "border-[#5b9ab5] bg-[#eaf3f8] text-[#1d4e6e]"
                      : "border-[#ccdde6] bg-[#f4f9fc] text-[#a0bfcc]"
                  }`}
                >
                  {computedHours ? (
                    <>
                      {computedHours.hours > 0 && (
                        <>
                          {computedHours.hours}
                          <span className="text-[10px] font-normal text-[#a0bfcc] ml-0.5 mr-1.5">
                            h
                          </span>
                        </>
                      )}
                      {computedHours.minutes > 0 && (
                        <>
                          {computedHours.minutes}
                          <span className="text-[10px] font-normal text-[#a0bfcc] ml-0.5">
                            m
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    <span className="text-xs font-normal">—</span>
                  )}
                </div>
              </Field>
            </div>

            {/* Row 5: Notes */}
            <Field label="Notes" icon={FiFileText}>
              <textarea
                value={form.notes}
                onChange={(e) => set("notes")(e.target.value)}
                rows={3}
                placeholder="Add notes..."
                className="w-full px-3 py-2 rounded-xl border border-[#ccdde6] bg-[#f4f9fc] text-sm text-[#1d4e6e] placeholder-[#a0bfcc] outline-none focus:border-[#5b9ab5] focus:ring-2 focus:ring-[#5b9ab5]/15 transition-all resize-none"
              />
            </Field>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#eaf3f8] flex items-center gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 h-9 rounded-xl text-sm font-medium text-[#5b9ab5] bg-[#f4f9fc] hover:bg-[#eaf3f8] border border-[#e0eef5] hover:border-[#ccdde6] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!computedHours}
              className="flex-2 h-9 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-[#3d7a9a] to-[#1d4e6e] hover:from-[#2d6a8a] hover:to-[#163d57] shadow-lg shadow-[#1d4e6e]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <FiPlus className="w-3.5 h-3.5" />
              Log Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
