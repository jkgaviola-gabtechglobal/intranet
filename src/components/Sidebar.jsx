import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiBarChart2,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiUsers,
  FiCreditCard,
  FiMessageSquare,
} from "react-icons/fi";

const NAV_GROUPS = [
  [
    { icon: FiGrid, label: "Dashboard", to: "/dashboard" },
    { icon: FiBarChart2, label: "Reports", to: "/reports" },
  ],
  [
    {
      icon: FiClock,
      label: "Time Tracking",
      submenu: [
        { label: "Consultants", to: "/time-tracking" },
        { label: "Management", to: "/time-tracking/management" },
      ],
    },
    { icon: FiDollarSign, label: "Payroll", to: "/payroll" },
    {
      icon: FiFileText,
      label: "Consultant Invoice",
      to: "/consultant-invoice",
    },
  ],
  [
    { icon: FiUsers, label: "Client Management", to: "/client-management" },
    { icon: FiCreditCard, label: "Invoice", to: "/invoice" },
  ],
  [{ icon: FiMessageSquare, label: "Message Center", to: "/messages" }],
];

function NavItemSubmenu({ icon, label, submenu }) {
  const Icon = icon;
  const ref = useRef(null);
  const menuRef = useRef(null);
  const hideTimer = useRef(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const location = useLocation();

  const isActive = submenu.some((s) => location.pathname === s.to);

  const updatePos = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ top: rect.top + rect.height / 2, left: rect.right + 10 });
    }
  }, []);

  const show = () => {
    clearTimeout(hideTimer.current);
    updatePos();
    setOpen(true);
  };

  const hide = () => {
    hideTimer.current = setTimeout(() => setOpen(false), 100);
  };

  return (
    <>
      <button
        ref={ref}
        onMouseEnter={show}
        onMouseLeave={hide}
        className={`group relative flex items-center justify-center w-10 h-10 mx-auto rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-[#1d4e6e] shadow-md shadow-[#1d4e6e]/30"
            : "hover:bg-[#ddeef6] hover:ring-2 hover:ring-[#5b9ab5]/25"
        }`}
      >
        <Icon
          className={`w-4 h-4 shrink-0 transition-all duration-200 group-hover:scale-110 ${
            isActive
              ? "text-white"
              : "text-[#5b9ab5] group-hover:text-[#1d4e6e]"
          }`}
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            onMouseEnter={() => clearTimeout(hideTimer.current)}
            onMouseLeave={hide}
            className="fixed z-9999 flex items-center gap-1"
            style={{
              top: pos.top,
              left: pos.left,
              transform: "translateY(-50%)",
            }}
          >
            <span className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-[#1d4e6e]" />
            <div className="rounded-xl bg-white border border-[#ccdde6] shadow-lg shadow-[#1d4e6e]/10 overflow-hidden min-w-36">
              <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-[#a0bfcc] border-b border-[#eaf3f8]">
                {label}
              </div>
              {submenu.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-[#1d4e6e] text-white"
                        : "text-[#4a7a95] hover:bg-[#eaf3f8] hover:text-[#1d4e6e]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function NavItem({ icon, label, to, badge }) {
  const Icon = icon;
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (hovered && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ top: rect.top + rect.height / 2, left: rect.right + 10 });
    }
  }, [hovered]);

  return (
    <>
      <NavLink
        ref={ref}
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={({ isActive }) =>
          `group relative flex items-center justify-center w-10 h-10 mx-auto rounded-xl transition-all duration-200 ${
            isActive
              ? "bg-[#1d4e6e] shadow-md shadow-[#1d4e6e]/30"
              : "hover:bg-[#ddeef6] hover:ring-2 hover:ring-[#5b9ab5]/25"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              className={`w-4 h-4 shrink-0 transition-all duration-200 group-hover:scale-110 ${
                isActive
                  ? "text-white"
                  : "text-[#5b9ab5] group-hover:text-[#1d4e6e]"
              }`}
            />
            {badge && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#5b9ab5] ring-2 ring-[#f4f9fc]" />
            )}
          </>
        )}
      </NavLink>

      {hovered &&
        createPortal(
          <div
            className="pointer-events-none fixed z-9999 flex items-center gap-1"
            style={{
              top: pos.top,
              left: pos.left,
              transform: "translateY(-50%)",
            }}
          >
            <span className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-[#1d4e6e]" />
            <span className="px-2.5 py-1 rounded-lg bg-[#1d4e6e] text-white text-xs font-medium whitespace-nowrap shadow-lg shadow-[#1d4e6e]/20">
              {label}
              {badge && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#5b9ab5] text-[9px] font-bold">
                  {badge}
                </span>
              )}
            </span>
          </div>,
          document.body,
        )}
    </>
  );
}

export default function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 bottom-0 z-40 w-16 flex flex-col bg-[#f4f9fc] border-r border-[#ccdde6]">
      <div className="h-0.5 bg-linear-to-r from-[#5b9ab5]/40 via-[#1d4e6e]/60 to-transparent" />
      <nav
        className="flex-1 overflow-y-auto py-4 space-y-0.5"
        style={{ scrollbarWidth: "none" }}
      >
        {NAV_GROUPS.map((group, i) => (
          <div key={i}>
            {group.map((item) =>
              item.submenu ? (
                <NavItemSubmenu key={item.label} {...item} />
              ) : (
                <NavItem key={item.to} {...item} />
              ),
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
