import { useState } from "react";
import {
  FiBell,
  FiSearch,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import ResumeLogo from "../assets/Resume_Logo.png";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#f4f9fc] border-b border-[#ccdde6] flex items-center px-4 gap-4">
      {/* Logo */}
      <div className="flex items-center shrink-0">
        <img
          src={ResumeLogo}
          alt="GabTech Global"
          className="h-8 w-auto object-contain"
        />
      </div>

      {/* Search */}
      <div
        className={`hidden sm:flex flex-1 max-w-sm items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
          searchFocused
            ? "border-[#5b9ab5] ring-1 ring-[#5b9ab5]/30 bg-white"
            : "border-[#ccdde6] bg-[#eaf3f8]"
        }`}
      >
        <FiSearch className="w-4 h-4 text-[#a0bfcc] shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="flex-1 bg-transparent text-sm text-[#1d4e6e] placeholder-[#a0bfcc] outline-none"
        />
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium text-[#a0bfcc] border border-[#ccdde6] bg-white">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-[#4a7a95] hover:bg-[#e0eef5] hover:text-[#1d4e6e] transition-colors">
          <FiBell className="w-5 h-5" />
          {/* Badge */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#5b9ab5] ring-2 ring-[#f4f9fc]" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[#ccdde6] mx-1" />

        {/* Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-[#e0eef5] transition-colors"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#5b9ab5] to-[#1d4e6e] flex items-center justify-center text-white text-xs font-bold shadow-sm">
              KG
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-[#1d4e6e] leading-tight">
                Kenneth G.
              </p>
              <p className="text-[10px] text-[#a0bfcc] leading-tight">Admin</p>
            </div>
            <FiChevronDown
              className={`w-3.5 h-3.5 text-[#a0bfcc] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-[#ccdde6] shadow-lg shadow-[#1d4e6e]/10 z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-[#eaf3f8]">
                  <p className="text-xs font-semibold text-[#1d4e6e]">
                    Kenneth Gaviola
                  </p>
                  <p className="text-[10px] text-[#a0bfcc] mt-0.5">
                    k.gaviola@gabtech.com
                  </p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#4a7a95] hover:bg-[#eaf3f8] hover:text-[#1d4e6e] transition-colors">
                    <FiUser className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#4a7a95] hover:bg-[#eaf3f8] hover:text-[#1d4e6e] transition-colors">
                    <FiSettings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-[#eaf3f8] py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <FiLogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
