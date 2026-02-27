import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiHeadphones,
} from "react-icons/fi";
import Design1 from "../../assets/Design1.svg";
import ResumeLogo from "../../assets/Resume_Logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "jk.gaviola@gabtechglobal.com",
    password: "Gabtech32",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#eaf3f8] flex items-center justify-center p-4">
      {/* Card */}
      <div className="flex w-full max-w-5xl min-h-140 rounded-2xl overflow-hidden shadow-xl shadow-[#1d4e6e]/20 border border-[#ccdde6]">
        {/* Left — Branding */}
        <div className="relative hidden md:flex flex-col justify-between w-1/2 bg-linear-to-br from-[#e8f2f8] to-[#d4e8f2] p-10 overflow-hidden">
          {/* Glow orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#5b9ab5]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-10 w-56 h-56 rounded-full bg-[#1d4e6e]/15 blur-3xl pointer-events-none" />

          {/* Logo */}
          <div className="relative z-10">
            <img
              src={ResumeLogo}
              alt="GabTech Global logo"
              className="h-20 w-auto object-contain object-left -ml-8"
            />
          </div>

          {/* Illustration */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-6">
            <img
              src={Design1}
              alt="Intranet illustration"
              className="w-full max-w-sm object-contain drop-shadow-sm"
            />
          </div>

          {/* Bottom copy */}
          <div className="relative z-10">
            <h2 className="text-[#1d4e6e] text-xl font-bold leading-tight tracking-tight">
              Your workspace,{" "}
              <span className="text-[#5b9ab5]">all in one place.</span>
            </h2>
            <p className="mt-1.5 text-[#4a7a95] text-xs leading-relaxed">
              Internal tools, documents, and your team — unified and always
              within reach.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-[#ccdde6]" />

        {/* Right — Form */}
        <div className="flex flex-col justify-center w-full md:w-1/2 bg-[#f4f9fc] p-12">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[#1d4e6e] text-2xl font-bold tracking-tight">
              Welcome back
            </h2>
            <p className="mt-1 text-[#5b9ab5] text-sm">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[#4a7a95] text-xs font-medium uppercase tracking-widest">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0bfcc] pointer-events-none" />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="yourname"
                  autoComplete="username"
                  required
                  className="w-full bg-white border border-[#ccdde6] rounded-lg pl-10 pr-4 py-2.5 text-[#1d4e6e] text-sm placeholder-[#a0bfcc] outline-none transition focus:border-[#5b9ab5] focus:ring-1 focus:ring-[#5b9ab5]/40"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[#4a7a95] text-xs font-medium uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0bfcc] pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full bg-white border border-[#ccdde6] rounded-lg pl-10 pr-10 py-2.5 text-[#1d4e6e] text-sm placeholder-[#a0bfcc] outline-none transition focus:border-[#5b9ab5] focus:ring-1 focus:ring-[#5b9ab5]/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0bfcc] hover:text-[#5b9ab5] transition"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 bg-[#1d4e6e] hover:bg-[#5b9ab5] active:scale-[0.98] text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-200"
            >
              <FiLogIn className="w-4 h-4" />
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-[#a0bfcc] text-xs">
            Having trouble?{" "}
            <a
              href="#"
              className="inline-flex items-center gap-1 text-[#5b9ab5] hover:text-[#1d4e6e] transition"
            >
              <FiHeadphones className="w-3 h-3" />
              Contact IT support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
