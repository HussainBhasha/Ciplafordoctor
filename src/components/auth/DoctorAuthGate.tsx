import React, { useState, useEffect, useRef } from "react";
import {
  FileCheck2,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Stethoscope,
  ShieldCheck,
  Lock,
} from "lucide-react";
import brandLogo from "@/assets/Cipla_logo.svg.png";
import ciplostemLogo from "@/assets/logo.png";
import { useDoctorAuth } from "@/context/DoctorAuthContext";
import { validateMciCode } from "@/data/allowedMciCodes";

interface Props {
  onSuccess?: () => void;
}

export default function DoctorAuthGate({ onSuccess }: Props) {
  const { login } = useDoctorAuth();

  const [mciCode, setMciCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-dismiss alert banners after 4 seconds
  useEffect(() => {
    if (!errorMsg) return;
    const t = setTimeout(() => setErrorMsg(null), 4000);
    return () => clearTimeout(t);
  }, [errorMsg]);

  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(null), 3500);
    return () => clearTimeout(t);
  }, [successMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const validation = validateMciCode(mciCode);
    if (!validation.valid) {
      setErrorMsg(validation.error || "Please enter a valid MCI / Medical Council Registration Number.");
      return;
    }

    setLoading(true);

    try {
      // Send verification to backend (if available) for audit / registration record
      try {
        await fetch("/api/auth/verify-mci", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mci_code: mciCode.trim() }),
        });
      } catch {
        // Continue even if backend is offline - frontend validation already passed
      }

      setVerifiedSuccess(true);
      setSuccessMsg("MCI Code verified! Opening portal...");

      login({
        mci_code: mciCode.trim().toUpperCase(),
        is_verified: true,
      });

      // Quick smooth transition to authenticated portal
      setTimeout(() => {
        onSuccess?.();
      }, 200);
    } catch (err: any) {
      setErrorMsg(err.message || "Could not verify MCI code. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-100 via-sky-50 to-cyan-50 overflow-y-auto animate-fadeIn">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[55%] w-[45%] rounded-full bg-sky-200/60 blur-3xl animate-floaty" />
        <div
          className="absolute bottom-[-15%] right-[-5%] h-[55%] w-[45%] rounded-full bg-cyan-200/50 blur-3xl animate-floaty"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative w-full max-w-7xl px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Left Side - Welcome Branding */}
          <div className="hidden lg:flex flex-col justify-center items-start">
            <div>
              <div
                className="text-[28px] sm:text-[32px] font-bold tracking-[0.18em] text-sky-500 uppercase opacity-0 animate-slide-up"
                style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
              >
                Welcome to
              </div>

              <div
                className="my-3 opacity-0 animate-slide-up"
                style={{ animationDelay: "0.18s", animationFillMode: "forwards" }}
              >
                <img
                  src={ciplostemLogo}
                  alt="CiploStem™"
                  className="h-16 sm:h-20 lg:h-24 xl:h-28 w-auto object-contain -ml-1 sm:-ml-2 max-w-[90vw]"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div
                className="mt-3 opacity-0 animate-slide-up"
                style={{ animationDelay: "0.32s", animationFillMode: "forwards" }}
              >
                <p className="text-[24px] sm:text-[28px] font-semibold text-slate-800 tracking-tight">
                  Doctor Portal
                </p>
              </div>

              <div
                className="mt-5 opacity-0 animate-slide-up"
                style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
              >
                <div className="relative w-[180px]">
                  <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-blue-900 animate-underline-grow" />
                </div>
              </div>

              <p
                className="mt-6 max-w-md text-sm leading-relaxed text-slate-600 opacity-0 animate-slide-up"
                style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
              >
                Access specialized clinical research, mechanism of action, and therapeutic protocols on allogeneic adult human bone marrow-derived mesenchymal stem cells.
              </p>
            </div>
          </div>

          {/* Right Side - MCI Verification Card */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-md opacity-0 animate-slide-up"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              <div className="rounded-2xl bg-white border border-slate-100 shadow-[0_4px_40px_-12px_rgba(14,116,144,0.18)] p-7 sm:p-9">
                {/* Logo + Medical Badge */}
                <div className="flex flex-col items-center text-center mb-6">
                  <img
                    src={brandLogo}
                    alt="Cipla"
                    className="h-12 sm:h-14 w-auto object-contain mb-4"
                  />
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-[11px] font-semibold text-sky-700 tracking-wide">
                    <Stethoscope className="h-3.5 w-3.5 text-sky-600" />
                    HEALTHCARE PROFESSIONAL ACCESS
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-slate-900 tracking-tight">
                    Doctor Verification
                  </h2>
                  <p className="mt-1.5 text-xs text-slate-500 max-w-xs leading-normal">
                    Please enter your MCI or State Medical Council Registration Number to proceed.
                  </p>
                </div>

                {/* Alerts */}
                {errorMsg && (
                  <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 p-3 mb-4 text-[13px] text-red-700 animate-fadeIn">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-3 mb-4 text-[13px] text-emerald-700 animate-fadeIn">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Verification Form */}
                <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 tracking-wide">
                      MCI / MEDICAL COUNCIL CODE
                    </label>
                    <div className="relative">
                      <FileCheck2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        ref={inputRef}
                        type="text"
                        required
                        value={mciCode}
                        onChange={(e) => {
                          setMciCode(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        placeholder="e.g. MCI-12345 or 45892"
                        className="w-full rounded-lg border border-sky-100 bg-sky-50/40 pl-9 pr-3 py-2.5 text-[14px] font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition uppercase tracking-wider"
                      />
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Enter your Medical Council of India or State Council registration number.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || verifiedSuccess}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-2.5 text-[14px] font-semibold shadow-md shadow-blue-900/20 transition-all hover:shadow-lg hover:shadow-blue-900/25 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                  >
                    {verifiedSuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Verified! Opening portal...</span>
                      </>
                    ) : loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Verifying credentials...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        <span>Verify & Enter Portal</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer security note */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
                  <Lock className="h-3 w-3 text-slate-400 shrink-0" />
                  <span>Confidential & intended exclusively for medical practitioners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
