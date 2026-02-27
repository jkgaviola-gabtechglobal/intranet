import { useEffect } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

const VARIANTS = {
  approve: {
    icon: FiCheckCircle,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    accent: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200",
    accentShadow: "shadow-emerald-100",
    label: "Approve",
    bar: "bg-emerald-400",
  },
  reject: {
    icon: FiXCircle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    accent: "bg-amber-500 hover:bg-amber-600 shadow-amber-200",
    accentShadow: "shadow-amber-100",
    label: "Reject",
    bar: "bg-amber-400",
  },
  delete: {
    icon: FiTrash2,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    accent: "bg-red-500 hover:bg-red-600 shadow-red-200",
    accentShadow: "shadow-red-100",
    label: "Delete",
    bar: "bg-red-400",
  },
};

export default function ConfirmationModal({
  open,
  variant = "approve",
  title,
  description,
  count,
  onConfirm,
  onCancel,
}) {
  const v = VARIANTS[variant] ?? VARIANTS.approve;
  const Icon = v.icon;

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onCancel?.();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  const defaultTitle =
    variant === "approve"
      ? "Approve records?"
      : variant === "reject"
        ? "Reject records?"
        : "Delete records?";

  const defaultDescription =
    variant === "approve"
      ? "Selected records will be marked as Approved."
      : variant === "reject"
        ? "Selected records will be marked as Rejected."
        : "This action cannot be undone. Selected records will be permanently removed.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel?.()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0d2d42]/40 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl shadow-[#1d4e6e]/10 overflow-hidden">
        {/* Top accent bar */}
        <div className={`h-1 w-full ${v.bar}`} />

        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-lg text-[#a0bfcc] hover:text-[#1d4e6e] hover:bg-[#eaf3f8] transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>

        <div className="px-6 pt-6 pb-7 space-y-5">
          {/* Icon + heading */}
          <div className="flex items-start gap-4">
            <div
              className={`shrink-0 w-11 h-11 rounded-xl ${v.iconBg} flex items-center justify-center`}
            >
              <Icon className={`w-5 h-5 ${v.iconColor}`} />
            </div>
            <div className="pt-0.5 space-y-1">
              <h2 className="text-base font-bold text-[#1d4e6e] leading-snug">
                {title ?? defaultTitle}
              </h2>
              <p className="text-sm text-[#7aa5b8] leading-relaxed">
                {description ?? defaultDescription}
              </p>
            </div>
          </div>

          {/* Count chip */}
          {count != null && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f4f9fc] border border-[#e0eef5]">
              <FiAlertTriangle className="w-3.5 h-3.5 text-[#a0bfcc] shrink-0" />
              <span className="text-xs text-[#4a7a95]">
                <span className="font-semibold text-[#1d4e6e]">{count}</span>{" "}
                {count === 1 ? "record" : "records"} will be affected
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onCancel}
              className="flex-1 h-9 rounded-xl text-sm font-medium text-[#5b9ab5] bg-[#f4f9fc] hover:bg-[#eaf3f8] border border-[#e0eef5] hover:border-[#ccdde6] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 h-9 rounded-xl text-sm font-semibold text-white shadow-lg transition-all ${v.accent}`}
            >
              {v.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
